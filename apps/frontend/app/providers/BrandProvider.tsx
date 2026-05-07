import {
  createContext,
  useContext,
  onMount,
  type JSX,
  type Accessor,
} from "solid-js";
import { createStore, produce } from "solid-js/store";

// ==========================================
// Types
// ==========================================

export interface Brand {
  id: string;
  userId: string;
  name: string;
  slug: string;
  description: string | null;

  // Brand Identity
  logoUrl: string | null;
  logoThumbnail: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string | null;
  colors: string[];
  headingFont: string;
  bodyFont: string;
  fontWeights: Record<string, unknown>;

  // Brand Voice
  brandVoice: string | null;
  brandTagline: string | null;
  brandBio: string | null;

  // AI Metadata
  aiGenerated: boolean;
  generationPrompt: string | null;
  generationModel: string | null;

  // Stats
  brandScore: number;
  productsCount: number;
  mockupsCount: number;

  // Meta
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateBrandInput = {
  name: string;
  slug?: string;
  description?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  headingFont?: string;
  bodyFont?: string;
  logoUrl?: string;
};

export type UpdateBrandInput = Partial<Omit<Brand, "id" | "userId" | "createdAt" | "updatedAt">>;

export interface BrandState {
  brands: Brand[];
  selectedBrandId: string | null;
  loading: boolean;
  error: string | null;
  creating: boolean;
  editing: boolean;
  dirty: boolean;
}

export interface BrandContextValue {
  state: BrandState;
  selectedBrand: Accessor<Brand | null>;
  brandsCount: Accessor<number>;
  hasReachedLimit: (limit: number) => boolean;
  fetchBrands: () => Promise<void>;
  selectBrand: (id: string) => void;
  createBrand: (data: CreateBrandInput) => Promise<Brand>;
  updateBrand: (id: string, data: UpdateBrandInput) => Promise<Brand>;
  deleteBrand: (id: string) => Promise<void>;
  generateBrand: (prompt: string) => Promise<Brand>;
  duplicateBrand: (id: string) => Promise<Brand>;
}

// ==========================================
// Context
// ==========================================

const BrandContext = createContext<BrandContextValue>();

// ==========================================
// Provider
// ==========================================

export function BrandProvider(props: { children: JSX.Element }) {
  const [state, setState] = createStore<BrandState>({
    brands: [],
    selectedBrandId: null,
    loading: false,
    error: null,
    creating: false,
    editing: false,
    dirty: false,
  });

  // Derived signals
  const selectedBrand: Accessor<Brand | null> = () =>
    state.brands.find((b) => b.id === state.selectedBrandId) ?? null;

  const brandsCount: Accessor<number> = () => state.brands.length;

  const hasReachedLimit = (limit: number): boolean => state.brands.length >= limit;

  // ==========================================
  // API helpers
  // ==========================================

  async function apiRequest<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    const res = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
      },
      ...options,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({
        error: { code: "UNKNOWN", message: res.statusText },
      }));
      throw err;
    }

    const json = await res.json();
    return json.data as T;
  }

  // ==========================================
  // Actions
  // ==========================================

  async function fetchBrands() {
    setState("loading", true);
    try {
      const brands = await apiRequest<Brand[]>("/api/brands");
      setState(
        produce((s) => {
          s.brands = brands;
          s.loading = false;
          s.error = null;
        }),
      );
    } catch (e) {
      setState({ loading: false, error: (e as Error).message });
    }
  }

  function selectBrand(id: string) {
    setState("selectedBrandId", id);
  }

  async function createBrand(data: CreateBrandInput): Promise<Brand> {
    setState("creating", true);
    try {
      const brand = await apiRequest<Brand>("/api/brands", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setState(
        produce((s) => {
          s.brands.push(brand);
          s.selectedBrandId = brand.id;
          s.creating = false;
          s.dirty = false;
          s.error = null;
        }),
      );
      return brand;
    } catch (e) {
      setState({ creating: false, error: (e as Error).message });
      throw e;
    }
  }

  async function updateBrand(id: string, data: UpdateBrandInput): Promise<Brand> {
    setState("editing", true);
    try {
      const brand = await apiRequest<Brand>(`/api/brands/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      setState(
        produce((s) => {
          const idx = s.brands.findIndex((b) => b.id === id);
          if (idx !== -1) s.brands[idx] = brand;
          s.editing = false;
          s.dirty = false;
          s.error = null;
        }),
      );
      return brand;
    } catch (e) {
      setState({ editing: false, error: (e as Error).message });
      throw e;
    }
  }

  async function deleteBrand(id: string) {
    // Optimistic update with rollback
    const previousBrands = [...state.brands];
    const previousSelectedId = state.selectedBrandId;

    setState(
      produce((s) => {
        s.brands = s.brands.filter((b) => b.id !== id);
        if (s.selectedBrandId === id) s.selectedBrandId = s.brands[0]?.id ?? null;
      }),
    );

    try {
      await apiRequest(`/api/brands/${id}`, { method: "DELETE" });
    } catch (e) {
      // Rollback
      setState(
        produce((s) => {
          s.brands = previousBrands;
          s.selectedBrandId = previousSelectedId;
          s.error = `Failed to delete: ${(e as Error).message}`;
        }),
      );
      throw e;
    }
  }

  async function generateBrand(prompt: string): Promise<Brand> {
    setState("creating", true);
    try {
      const brand = await apiRequest<Brand>("/api/brands/generate-from-prompt", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      setState(
        produce((s) => {
          s.brands.push(brand);
          s.selectedBrandId = brand.id;
          s.creating = false;
          s.error = null;
        }),
      );
      return brand;
    } catch (e) {
      setState({ creating: false, error: (e as Error).message });
      throw e;
    }
  }

  async function duplicateBrand(id: string): Promise<Brand> {
    setState("creating", true);
    try {
      const brand = await apiRequest<Brand>(`/api/brands/${id}/duplicate`, {
        method: "POST",
      });
      setState(
        produce((s) => {
          s.brands.push(brand);
          s.selectedBrandId = brand.id;
          s.creating = false;
          s.error = null;
        }),
      );
      return brand;
    } catch (e) {
      setState({ creating: false, error: (e as Error).message });
      throw e;
    }
  }

  // Pre-fetch brands on mount
  onMount(() => {
    fetchBrands();
  });

  const value: BrandContextValue = {
    state,
    selectedBrand,
    brandsCount,
    hasReachedLimit,
    fetchBrands,
    selectBrand,
    createBrand,
    updateBrand,
    deleteBrand,
    generateBrand,
    duplicateBrand,
  };

  return (
    <BrandContext.Provider value={value}>
      {props.children}
    </BrandContext.Provider>
  );
}

// ==========================================
// Hook
// ==========================================

export function useBrands(): BrandContextValue {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    throw new Error("useBrands must be used within a BrandProvider");
  }
  return ctx;
}
