import { createStore, produce } from 'solid-js/store';
import { createResource } from 'solid-js';
import { templatesApi } from '~/lib/api/templates';
import type { Template, CreateTemplateInput, UpdateTemplateInput } from '~/lib/types';

interface TemplateFilter {
  productType: string | null;
  search: string;
}

interface TemplateEditorState {
  selectedLayerId: string | null;
  zoom: number;
  panX: number;
  panY: number;
  dirty: boolean;
  undoStack: unknown[];
  redoStack: unknown[];
}

interface TemplateStoreState {
  templates: Template[];
  systemTemplates: Template[];
  userTemplates: Template[];
  selectedTemplateId: string | null;
  filter: TemplateFilter;
  loading: boolean;
  error: string | null;
  editor: TemplateEditorState;
  total: number;
  page: number;
  hasMore: boolean;
}

function createTemplateStore() {
  const [state, setState] = createStore<TemplateStoreState>({
    templates: [],
    systemTemplates: [],
    userTemplates: [],
    selectedTemplateId: null,
    filter: {
      productType: null,
      search: '',
    },
    loading: false,
    error: null,
    editor: {
      selectedLayerId: null,
      zoom: 1,
      panX: 0,
      panY: 0,
      dirty: false,
      undoStack: [],
      redoStack: [],
    },
    total: 0,
    page: 1,
    hasMore: false,
  });

  // ── Derive ──

  const selectedTemplate = () =>
    state.templates.find((t) => t.id === state.selectedTemplateId) ?? null;

  const filteredTemplates = () => {
    let list = state.templates;
    if (state.filter.productType) {
      list = list.filter((t) => t.productType === state.filter.productType);
    }
    if (state.filter.search) {
      const q = state.filter.search.toLowerCase();
      list = list.filter((t) => t.name.toLowerCase().includes(q));
    }
    return list;
  };

  // ── Actions ──

  const fetchTemplates = async (params?: {
    productType?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    setState('loading', true);
    setState('error', null);
    try {
      const res = await templatesApi.list(params);
      setState(
        produce((s) => {
          s.templates = res.data;
          s.systemTemplates = res.data.filter((t) => t.isSystem);
          s.userTemplates = res.data.filter((t) => !t.isSystem);
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

  const selectTemplate = (id: string | null) => {
    setState('selectedTemplateId', id);
  };

  const createTemplate = async (data: CreateTemplateInput): Promise<Template> => {
    setState('loading', true);
    setState('error', null);
    try {
      const res = await templatesApi.create(data);
      const template = res.data;
      setState(
        produce((s) => {
          s.templates.push(template);
          if (!template.isSystem) s.userTemplates.push(template);
          s.selectedTemplateId = template.id;
          s.editor.dirty = false;
          s.loading = false;
        })
      );
      return template;
    } catch (e) {
      setState({ loading: false, error: (e as Error).message });
      throw e;
    }
  };

  const updateTemplate = async (id: string, data: UpdateTemplateInput): Promise<Template> => {
    setState('error', null);
    try {
      const res = await templatesApi.update(id, data);
      const updated = res.data;
      setState(
        produce((s) => {
          const idx = s.templates.findIndex((t) => t.id === id);
          if (idx !== -1) s.templates[idx] = updated;
          const sysIdx = s.systemTemplates.findIndex((t) => t.id === id);
          if (sysIdx !== -1) s.systemTemplates[sysIdx] = updated;
          const userIdx = s.userTemplates.findIndex((t) => t.id === id);
          if (userIdx !== -1) s.userTemplates[userIdx] = updated;
          s.editor.dirty = false;
        })
      );
      return updated;
    } catch (e) {
      setState({ error: (e as Error).message });
      throw e;
    }
  };

  const deleteTemplate = async (id: string): Promise<void> => {
    const previous = [...state.templates];
    setState(
      produce((s) => {
        s.templates = s.templates.filter((t) => t.id !== id);
        s.systemTemplates = s.systemTemplates.filter((t) => t.id !== id);
        s.userTemplates = s.userTemplates.filter((t) => t.id !== id);
        if (s.selectedTemplateId === id) s.selectedTemplateId = null;
      })
    );
    try {
      await templatesApi.delete(id);
    } catch (e) {
      // Rollback
      setState(
        produce((s) => {
          s.templates = previous;
          s.systemTemplates = previous.filter((t) => t.isSystem);
          s.userTemplates = previous.filter((t) => !t.isSystem);
          s.error = (e as Error).message;
        })
      );
      throw e;
    }
  };

  const setFilter = (filter: Partial<TemplateFilter>) => {
    setState('filter', filter);
  };

  const clearFilter = () => {
    setState('filter', { productType: null, search: '' });
  };

  // ── Editor actions ──

  const selectLayer = (layerId: string | null) => {
    setState('editor', 'selectedLayerId', layerId);
  };

  const setZoom = (zoom: number) => {
    setState('editor', 'zoom', Math.max(0.1, Math.min(5, zoom)));
  };

  const markDirty = () => {
    setState('editor', 'dirty', true);
  };

  const saveSnapshot = () => {
    setState(
      produce((s) => {
        s.editor.undoStack.push({ zoom: s.editor.zoom, panX: s.editor.panX, panY: s.editor.panY });
        if (s.editor.undoStack.length > 50) s.editor.undoStack.shift();
        s.editor.redoStack = [];
      })
    );
  };

  return {
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
  };
}

export const templateStore = createTemplateStore();
