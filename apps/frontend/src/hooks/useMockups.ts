import { onMount } from 'solid-js';
import { mockupStore } from '~/stores/mockupStore';
import type { CreateProductInput, BatchCreateInput } from '~/lib/types';

/**
 * Hook for mockup and product operations.
 * Provides access to mockup store state + actions.
 */
export function useMockups() {
  const {
    state,
    selectedMockup,
    selectedProduct,
    activeJobs,
    completedJobs,
    generationProgress,
    hasErrors,
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
  } = mockupStore;

  // Auto-fetch on first mount
  onMount(() => {
    if (state.products.length === 0 && !state.loading) {
      fetchProducts();
    }
  });

  return {
    // State — mockups
    mockups: () => state.mockups,
    selectedMockup,
    loading: () => state.loading,
    generating: () => state.generating,
    error: () => state.error,
    filter: () => state.filter,

    // State — products
    products: () => state.products,
    selectedProduct,
    total: () => state.total,

    // State — generation queue
    activeJobs,
    completedJobs,
    generationProgress,
    hasErrors,
    queueSize: () => state.generationQueue.length,
    hasActiveJobs: () => activeJobs().length > 0,

    // Actions — mockups
    fetchMockups,
    selectMockup,
    deleteMockup,
    regenerateMockup,
    aiEnhanceMockup,

    // Actions — products
    fetchProducts,
    selectProduct,
    createProduct,
    deleteProduct,

    // Actions — generation
    generateMockups,
    batchCreate,
    batchGenerate,
    updateJobStatus,
    clearQueue,

    // Actions — filter
    setFilter,
    clearFilter,
  };
}
