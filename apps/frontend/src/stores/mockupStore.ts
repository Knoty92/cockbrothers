import { createStore, produce } from 'solid-js/store';
import { mockupsApi } from '~/lib/api/mockups';
import type {
  Mockup,
  Product,
  GenerationJob,
  CreateProductInput,
  BatchCreateInput,
} from '~/lib/types';

interface MockupFilter {
  brandId: string | null;
  productId: string | null;
  dateFrom: string | null;
  dateTo: string | null;
}

interface MockupStoreState {
  mockups: Mockup[];
  products: Product[];
  selectedMockupId: string | null;
  selectedProductId: string | null;
  generationQueue: GenerationJob[];
  filter: MockupFilter;
  loading: boolean;
  generating: boolean;
  error: string | null;
  total: number;
  page: number;
  hasMore: boolean;
}

function createMockupStore() {
  const [state, setState] = createStore<MockupStoreState>({
    mockups: [],
    products: [],
    selectedMockupId: null,
    selectedProductId: null,
    generationQueue: [],
    filter: {
      brandId: null,
      productId: null,
      dateFrom: null,
      dateTo: null,
    },
    loading: false,
    generating: false,
    error: null,
    total: 0,
    page: 1,
    hasMore: false,
  });

  // ── Derive ──

  const selectedMockup = () =>
    state.mockups.find((m) => m.id === state.selectedMockupId) ?? null;

  const selectedProduct = () =>
    state.products.find((p) => p.id === state.selectedProductId) ?? null;

  const activeJobs = () =>
    state.generationQueue.filter((j) => j.status === 'pending' || j.status === 'processing');

  const completedJobs = () =>
    state.generationQueue.filter((j) => j.status === 'completed');

  const generationProgress = () => {
    const total = state.generationQueue.length;
    const done = completedJobs().length;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  const hasErrors = () =>
    state.generationQueue.some((j) => j.status === 'failed');

  // ── Mockup Actions ──

  const fetchMockups = async (params?: {
    brandId?: string;
    productId?: string;
    page?: number;
    limit?: number;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    setState('loading', true);
    setState('error', null);
    try {
      const res = await mockupsApi.list(params);
      setState(
        produce((s) => {
          s.mockups = res.data;
          s.total = res.meta?.total ?? res.data.length;
          s.page = res.meta?.page ?? 1;
          s.hasMore = res.meta?.hasMore ?? false;
          s.loading = false;
        })
      );
    } catch (e) {
      setState({ loading: false, error: (e as Error).message });
    }
  };

  const selectMockup = (id: string | null) => {
    setState('selectedMockupId', id);
  };

  const deleteMockup = async (id: string): Promise<void> => {
    const previous = [...state.mockups];
    setState(
      produce((s) => {
        s.mockups = s.mockups.filter((m) => m.id !== id);
        if (s.selectedMockupId === id) s.selectedMockupId = null;
      })
    );
    try {
      await mockupsApi.delete(id);
    } catch (e) {
      setState(
        produce((s) => {
          s.mockups = previous;
          s.error = (e as Error).message;
        })
      );
      throw e;
    }
  };

  const regenerateMockup = async (id: string): Promise<Mockup> => {
    setState('error', null);
    try {
      const res = await mockupsApi.regenerate(id);
      const mockup = res.data;
      setState(
        produce((s) => {
          const idx = s.mockups.findIndex((m) => m.id === id);
          if (idx !== -1) s.mockups[idx] = mockup;
        })
      );
      return mockup;
    } catch (e) {
      setState({ error: (e as Error).message });
      throw e;
    }
  };

  const aiEnhanceMockup = async (id: string): Promise<Mockup> => {
    setState('error', null);
    try {
      const res = await mockupsApi.aiEnhance(id);
      const mockup = res.data;
      setState(
        produce((s) => {
          const idx = s.mockups.findIndex((m) => m.id === id);
          if (idx !== -1) s.mockups[idx] = mockup;
        })
      );
      return mockup;
    } catch (e) {
      setState({ error: (e as Error).message });
      throw e;
    }
  };

  // ── Product Actions ──

  const fetchProducts = async (params?: {
    brandId?: string;
    page?: number;
    limit?: number;
    archived?: boolean;
  }) => {
    setState('loading', true);
    setState('error', null);
    try {
      const res = await mockupsApi.listProducts(params);
      setState(
        produce((s) => {
          s.products = res.data;
          s.total = res.meta?.total ?? res.data.length;
          s.page = res.meta?.page ?? 1;
          s.hasMore = res.meta?.hasMore ?? false;
          s.loading = false;
        })
      );
    } catch (e) {
      setState({ loading: false, error: (e as Error).message });
    }
  };

  const selectProduct = (id: string | null) => {
    setState('selectedProductId', id);
  };

  const createProduct = async (data: CreateProductInput): Promise<Product> => {
    setState('loading', true);
    setState('error', null);
    try {
      const res = await mockupsApi.createProduct(data);
      const product = res.data;
      setState(
        produce((s) => {
          s.products.push(product);
          s.selectedProductId = product.id;
          s.loading = false;
        })
      );
      return product;
    } catch (e) {
      setState({ loading: false, error: (e as Error).message });
      throw e;
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    const previous = [...state.products];
    setState(
      produce((s) => {
        s.products = s.products.filter((p) => p.id !== id);
        if (s.selectedProductId === id) s.selectedProductId = null;
      })
    );
    try {
      await mockupsApi.deleteProduct(id);
    } catch (e) {
      setState(
        produce((s) => {
          s.products = previous;
          s.error = (e as Error).message;
        })
      );
      throw e;
    }
  };

  // ── Generation Actions ──

  const generateMockups = async (productId: string) => {
    setState('generating', true);
    setState('error', null);
    try {
      const res = await mockupsApi.generateMockups(productId);
      const { jobs } = res.data;
      setState(
        produce((s) => {
          s.generationQueue = [...s.generationQueue, ...jobs];
          s.generating = false;
        })
      );
      return jobs;
    } catch (e) {
      setState({ generating: false, error: (e as Error).message });
      throw e;
    }
  };

  const batchCreate = async (data: BatchCreateInput): Promise<Product[]> => {
    setState('generating', true);
    setState('error', null);
    try {
      const res = await mockupsApi.batchCreate(data);
      const products = res.data;
      setState(
        produce((s) => {
          s.products = [...s.products, ...products];
          s.generating = false;
        })
      );
      return products;
    } catch (e) {
      setState({ generating: false, error: (e as Error).message });
      throw e;
    }
  };

  const batchGenerate = async (productIds: string[]) => {
    setState('generating', true);
    setState('error', null);
    try {
      const res = await mockupsApi.batchGenerate(productIds);
      const { jobs } = res.data;
      setState(
        produce((s) => {
          s.generationQueue = [...s.generationQueue, ...jobs];
          s.generating = false;
        })
      );
      return jobs;
    } catch (e) {
      setState({ generating: false, error: (e as Error).message });
      throw e;
    }
  };

  const updateJobStatus = (jobId: string, status: GenerationJob['status'], progress?: number) => {
    setState(
      produce((s) => {
        const job = s.generationQueue.find((j) => j.id === jobId);
        if (job) {
          job.status = status;
          if (progress !== undefined) job.progress = progress;
        }
      })
    );
  };

  const clearQueue = () => {
    setState('generationQueue', []);
  };

  // ── Filter ──

  const setFilter = (filter: Partial<MockupFilter>) => {
    setState('filter', filter);
  };

  const clearFilter = () => {
    setState('filter', { brandId: null, productId: null, dateFrom: null, dateTo: null });
  };

  return {
    state,
    selectedMockup,
    selectedProduct,
    activeJobs,
    completedJobs,
    generationProgress,
    hasErrors,
    generating: () => state.generating,
    fetchMockups,
    selectMockup,
    deleteMockup,
    regenerateMockup,
    aiEnhanceMockup,
    fetchProducts,
    selectProduct,
    createProduct,
    deleteProduct,
    generateMockups,
    batchCreate,
    batchGenerate,
    updateJobStatus,
    clearQueue,
    setFilter,
    clearFilter,
  };
}

export const mockupStore = createMockupStore();
