import { createStore, produce } from 'solid-js/store';
import { createMemo } from 'solid-js';
import type { Brand, CreateBrandInput, UpdateBrandInput, BrandScoreBreakdown } from '~/lib/types/brand';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export interface BrandState {
  brands: Brand[];
  selectedBrandId: string | null;
  loading: boolean;
  error: string | null;

  // UI flags
  creating: boolean;
  deleting: boolean;
  formDirty: boolean;

  // Brand form – used during create / edit flow
  form: {
    name: string;
    description: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    headingFont: string;
    bodyFont: string;
    brandVoice: string;
    brandTagline: string;
    brandBio: string;
    logoPreview: string | null;
  };

  // Active brand detail (full object cached for detail page)
  activeBrand: Brand | null;
  activeBrandLoading: boolean;

  // AI generation
  generating: boolean;
  generationPrompt: string;
  generationProgress: string | null;
}

const initialState: BrandState = {
  brands: [],
  selectedBrandId: null,
  loading: false,
  error: null,
  creating: false,
  deleting: false,
  formDirty: false,
  form: {
    name: '',
    description: '',
    primaryColor: '#000000',
    secondaryColor: '#FFFFFF',
    accentColor: '#3B82F6',
    headingFont: 'Inter',
    bodyFont: 'Inter',
    brandVoice: '',
    brandTagline: '',
    brandBio: '',
    logoPreview: null,
  },
  activeBrand: null,
  activeBrandLoading: false,
  generating: false,
  generationPrompt: '',
  generationProgress: null,
};

// ---------------------------------------------------------------------------
// Store factory
// ---------------------------------------------------------------------------

function createBrandStore() {
  const [state, setState] = createStore<BrandState>(initialState);

  // --- Derived ---

  const selectedBrand = createMemo(() =>
    state.brands.find((b) => b.id === state.selectedBrandId) ?? null,
  );

  const brandsCount = createMemo(() => state.brands.length);

  const hasReachedLimit = (limit: number) => state.brands.length >= limit;

  const sortedBrands = createMemo(() =>
    [...state.brands].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
  );

  const defaultBrand = createMemo(
    () => state.brands.find((b) => b.isDefault) ?? state.brands[0] ?? null,
  );

  // --- Internal helpers ---

  function resetForm() {
    setState('form', {
      name: '',
      description: '',
      primaryColor: '#000000',
      secondaryColor: '#FFFFFF',
      accentColor: '#3B82F6',
      headingFont: 'Inter',
      bodyFont: 'Inter',
      brandVoice: '',
      brandTagline: '',
      brandBio: '',
      logoPreview: null,
    });
  }

  function populateFormFromBrand(brand: Brand) {
    setState('form', {
      name: brand.name,
      description: brand.description ?? '',
      primaryColor: brand.primaryColor,
      secondaryColor: brand.secondaryColor,
      accentColor: brand.accentColor ?? '#3B82F6',
      headingFont: brand.headingFont,
      bodyFont: brand.bodyFont,
      brandVoice: brand.brandVoice ?? '',
      brandTagline: brand.brandTagline ?? '',
      brandBio: brand.brandBio ?? '',
      logoPreview: brand.logoUrl,
    });
  }

  // --- Actions ---

  async function fetchBrands() {
    setState('loading', true);
    setState('error', null);
    try {
      const { listBrands } = await import('~/lib/api/brands');
      const brands = await listBrands();
      setState(
        produce((s) => {
          s.brands = brands;
          s.loading = false;
        }),
      );
    } catch (e) {
      setState({ loading: false, error: (e as Error).message });
    }
  }

  async function fetchBrand(id: string) {
    setState('activeBrandLoading', true);
    setState('error', null);
    try {
      const { getBrand } = await import('~/lib/api/brands');
      const brand = await getBrand(id);
      setState({ activeBrand: brand, activeBrandLoading: false });
      return brand;
    } catch (e) {
      setState({ activeBrandLoading: false, error: (e as Error).message });
      return null;
    }
  }

  function selectBrand(id: string | null) {
    setState('selectedBrandId', id);
  }

  async function createBrand(data: CreateBrandInput): Promise<Brand | null> {
    setState('creating', true);
    setState('error', null);
    try {
      const { createBrand: apiCreate } = await import('~/lib/api/brands');
      const brand = await apiCreate(data);
      setState(
        produce((s) => {
          s.brands.push(brand);
          s.selectedBrandId = brand.id;
          s.creating = false;
          s.formDirty = false;
          s.form = { ...initialState.form };
        }),
      );
      return brand;
    } catch (e) {
      setState({ creating: false, error: (e as Error).message });
      return null;
    }
  }

  async function updateBrand(id: string, data: UpdateBrandInput): Promise<Brand | null> {
    setState('error', null);
    try {
      const { updateBrand: apiUpdate } = await import('~/lib/api/brands');
      const brand = await apiUpdate(id, data);
      setState(
        produce((s) => {
          const idx = s.brands.findIndex((b) => b.id === id);
          if (idx !== -1) s.brands[idx] = brand;
          if (s.activeBrand?.id === id) s.activeBrand = brand;
          s.formDirty = false;
        }),
      );
      return brand;
    } catch (e) {
      setState({ error: (e as Error).message });
      return null;
    }
  }

  async function deleteBrand(id: string): Promise<boolean> {
    setState('deleting', true);
    setState('error', null);
    try {
      const { deleteBrand: apiDelete } = await import('~/lib/api/brands');
      await apiDelete(id);
      setState(
        produce((s) => {
          s.brands = s.brands.filter((b) => b.id !== id);
          if (s.selectedBrandId === id) s.selectedBrandId = null;
          if (s.activeBrand?.id === id) s.activeBrand = null;
          s.deleting = false;
        }),
      );
      return true;
    } catch (e) {
      setState({ deleting: false, error: (e as Error).message });
      return false;
    }
  }

  async function duplicateBrand(id: string): Promise<Brand | null> {
    setState('creating', true);
    setState('error', null);
    try {
      const { duplicateBrand: apiDuplicate } = await import('~/lib/api/brands');
      const brand = await apiDuplicate(id);
      setState(
        produce((s) => {
          s.brands.push(brand);
          s.creating = false;
        }),
      );
      return brand;
    } catch (e) {
      setState({ creating: false, error: (e as Error).message });
      return null;
    }
  }

  async function generateBrand(prompt: string): Promise<Brand | null> {
    setState('generating', true);
    setState('generationPrompt', prompt);
    setState('generationProgress', 'Analyzing your brand description…');
    setState('error', null);
    try {
      const { generateBrandFromPrompt } = await import('~/lib/api/brands');
      const brand = await generateBrandFromPrompt(prompt);
      setState(
        produce((s) => {
          s.brands.push(brand);
          s.selectedBrandId = brand.id;
          s.generating = false;
          s.generationProgress = null;
          s.generationPrompt = '';
        }),
      );
      return brand;
    } catch (e) {
      setState({
        generating: false,
        generationProgress: null,
        error: (e as Error).message,
      });
      return null;
    }
  }

  async function fetchBrandScore(id: string): Promise<BrandScoreBreakdown | null> {
    try {
      const { getBrandScore } = await import('~/lib/api/brands');
      const score = await getBrandScore(id);
      setState(
        produce((s) => {
          const idx = s.brands.findIndex((b) => b.id === id);
          if (idx !== -1) s.brands[idx].brandScore = score.overall;
        }),
      );
      return score;
    } catch {
      return null;
    }
  }

  // --- Form helpers (for input bindings) ---

  function updateFormField<K extends keyof BrandState['form']>(
    field: K,
    value: BrandState['form'][K],
  ) {
    setState('form', field, value);
    setState('formDirty', true);
  }

  function setField<K extends keyof BrandState['form']>(
    field: K,
    value: BrandState['form'][K],
  ) {
    setState('form', field, value);
    setState('formDirty', true);
  }

  return {
    // Reactive state
    state,
    setState,

    // Derived
    selectedBrand,
    brandsCount,
    sortedBrands,
    defaultBrand,
    hasReachedLimit,

    // Actions
    fetchBrands,
    fetchBrand,
    selectBrand,
    createBrand,
    updateBrand,
    deleteBrand,
    duplicateBrand,
    generateBrand,
    fetchBrandScore,

    // Form helpers
    resetForm,
    populateFormFromBrand,
    updateFormField,
    setField,
  };
}

// Singleton store
export const brandStore = createBrandStore();
