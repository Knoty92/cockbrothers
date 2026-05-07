import { createEffect, onCleanup } from 'solid-js';
import { brandStore } from '~/stores/brandStore';
import type {
  Brand,
  CreateBrandInput,
  UpdateBrandInput,
  BrandScoreBreakdown,
} from '~/lib/types/brand';

/**
 * Primary hook for brand operations.
 *
 * Exposes the reactive brand store + convenience methods
 * so components can stay clean.
 *
 * @example
 * ```tsx
 * const brand = useBrand();
 * brand.create({ name: 'Acme' });
 * ```
 */
export function useBrand() {
  const {
    state,
    selectedBrand,
    brandsCount,
    sortedBrands,
    defaultBrand,
    hasReachedLimit,
    fetchBrands,
    fetchBrand,
    selectBrand,
    createBrand,
    updateBrand,
    deleteBrand,
    duplicateBrand,
    generateBrand,
    fetchBrandScore,
    resetForm,
    populateFormFromBrand,
    updateFormField,
    setField,
  } = brandStore;

  // Auto-clear errors after 8 seconds
  createEffect(() => {
    if (state.error) {
      const t = setTimeout(() => brandStore.setState('error', null), 8000);
      onCleanup(() => clearTimeout(t));
    }
  });

  return {
    // Reactive
    brands: () => state.brands,
    selectedBrand,
    brandsCount,
    sortedBrands,
    defaultBrand,
    loading: () => state.loading,
    creating: () => state.creating,
    deleting: () => state.deleting,
    error: () => state.error,
    formDirty: () => state.formDirty,
    form: () => state.form,
    activeBrand: () => state.activeBrand,
    activeBrandLoading: () => state.activeBrandLoading,
    generating: () => state.generating,
    generationProgress: () => state.generationProgress,

    // Derived helpers
    hasReachedLimit,
    isSelected: (id: string) => state.selectedBrandId === id,

    // Mutations
    fetchBrands,
    fetchBrand,
    selectBrand,
    createBrand: (data: CreateBrandInput): Promise<Brand | null> =>
      createBrand(data),
    updateBrand: (id: string, data: UpdateBrandInput): Promise<Brand | null> =>
      updateBrand(id, data),
    deleteBrand: (id: string): Promise<boolean> => deleteBrand(id),
    duplicateBrand: (id: string): Promise<Brand | null> => duplicateBrand(id),
    generateBrand: (prompt: string): Promise<Brand | null> =>
      generateBrand(prompt),
    fetchBrandScore: (id: string): Promise<BrandScoreBreakdown | null> =>
      fetchBrandScore(id),

    // Form helpers
    resetForm,
    populateFormFromBrand,
    updateFormField,
    setField,
  };
}
