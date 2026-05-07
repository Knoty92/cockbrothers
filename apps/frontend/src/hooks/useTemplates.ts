import { onMount } from 'solid-js';
import { templateStore } from '~/stores/templateStore';
import type { CreateTemplateInput, UpdateTemplateInput, ProductType } from '~/lib/types';

/**
 * Hook for template operations.
 * Provides access to template store state + actions.
 */
export function useTemplates() {
  const {
    state,
    selectedTemplate,
    filteredTemplates,
    fetchTemplates,
    selectTemplate,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    setFilter,
    clearFilter,
    selectLayer,
    setZoom,
    markDirty,
    saveSnapshot,
  } = templateStore;

  // Auto-fetch on first mount
  onMount(() => {
    if (state.templates.length === 0) {
      fetchTemplates();
    }
  });

  /** Search templates by query string */
  const search = (query: string) => {
    setFilter({ search: query });
  };

  /** Filter by product type */
  const filterByProductType = (productType: ProductType | null) => {
    setFilter({ productType });
  };

  return {
    // State
    templates: () => state.templates,
    systemTemplates: () => state.systemTemplates,
    userTemplates: () => state.userTemplates,
    selectedTemplate,
    filteredTemplates,
    filter: () => state.filter,
    loading: () => state.loading,
    error: () => state.error,
    editor: () => state.editor,
    total: () => state.total,

    // Actions
    fetchTemplates,
    selectTemplate,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    search,
    filterByProductType,
    clearFilter,
    selectLayer,
    setZoom,
    markDirty,
    saveSnapshot,
  };
}
