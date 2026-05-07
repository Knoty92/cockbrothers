import { type Component, createSignal, Show } from 'solid-js';
import { TemplateCanvas } from './TemplateCanvas';
import { TemplateLayerPanel } from './TemplateLayerPanel';
import { templateStore } from '~/stores/templateStore';
import type { Template, TemplateData, TemplateLayer } from '~/lib/types';

interface TemplateEditorProps {
  template: Template;
  readonly?: boolean;
  onSave?: (data: TemplateData) => void;
  onExport?: () => void;
  brandColors?: Record<string, string>;
  brandFonts?: Record<string, string>;
}

export const TemplateEditor: Component<TemplateEditorProps> = (props) => {
  const [showGrid, setShowGrid] = createSignal(false);
  const [applyBrandPreview, setApplyBrandPreview] = createSignal(false);
  const [templateData, setTemplateData] = createSignal<TemplateData>(
    props.template.templateData
  );
  const [selectedLayerId, setSelectedLayerId] = createSignal<string | null>(null);
  const { setZoom: storeZoom, selectLayer: storeSelectLayer } = templateStore;

  const isDirty = () => templateStore.state.editor.dirty;
  const zoom = () => templateStore.state.editor.zoom;

  const handleCanvasClick = () => {
    setSelectedLayerId(null);
    storeSelectLayer(null);
  };

  const handleLayerSelect = (id: string | null) => {
    setSelectedLayerId(id);
    storeSelectLayer(id);
  };

  const handleLayerMove = (id: string, x: number, y: number) => {
    setTemplateData((prev) => ({
      ...prev,
      layers: prev.layers.map((l) => (l.id === id ? { ...l, x, y } : l)),
    }));
    templateStore.markDirty();
  };

  const handleLayerResize = (id: string, width: number, height: number) => {
    setTemplateData((prev) => ({
      ...prev,
      layers: prev.layers.map((l) => (l.id === id ? { ...l, width, height } : l)),
    }));
    templateStore.markDirty();
  };

  const handleAddLayer = (type: TemplateLayer['type']) => {
    const newLayer: TemplateLayer = {
      id: `layer-${Date.now()}`,
      type,
      name: `New ${type}`,
      visible: true,
      locked: false,
      opacity: 1,
      x: 50,
      y: 50,
      width: type === 'text' ? 200 : 100,
      height: type === 'text' ? 40 : 100,
      rotation: 0,
      zIndex: templateData().layers.length + 1,
      content: type === 'text' ? 'Double click to edit' : undefined,
      fontSize: type === 'text' ? 24 : undefined,
      fontFamily: type === 'text' ? 'Inter' : undefined,
      color: type === 'text' ? '#000000' : undefined,
      textAlign: type === 'text' ? 'left' : undefined,
      fillColor: type === 'shape' ? '#e5e7eb' : undefined,
      shapeType: type === 'shape' ? 'rect' : undefined,
    };
    setTemplateData((prev) => ({
      ...prev,
      layers: [...prev.layers, newLayer],
    }));
    setSelectedLayerId(newLayer.id);
    templateStore.markDirty();
  };

  const handleRemoveLayer = (id: string) => {
    setTemplateData((prev) => ({
      ...prev,
      layers: prev.layers.filter((l) => l.id !== id),
    }));
    if (selectedLayerId() === id) setSelectedLayerId(null);
    templateStore.markDirty();
  };

  const handleToggleVisibility = (id: string) => {
    setTemplateData((prev) => ({
      ...prev,
      layers: prev.layers.map((l) =>
        l.id === id ? { ...l, visible: !l.visible } : l
      ),
    }));
    templateStore.markDirty();
  };

  const handleToggleLock = (id: string) => {
    setTemplateData((prev) => ({
      ...prev,
      layers: prev.layers.map((l) =>
        l.id === id ? { ...l, locked: !l.locked } : l
      ),
    }));
    templateStore.markDirty();
  };

  const handleUpdateLayer = (id: string, updates: Partial<TemplateLayer>) => {
    setTemplateData((prev) => ({
      ...prev,
      layers: prev.layers.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    }));
    templateStore.markDirty();
  };

  const handleMoveLayerUp = (id: string) => {
    setTemplateData((prev) => {
      const layers = [...prev.layers];
      const idx = layers.findIndex((l) => l.id === id);
      if (idx < layers.length - 1) {
        const temp = layers[idx].zIndex;
        layers[idx] = { ...layers[idx], zIndex: layers[idx + 1].zIndex };
        layers[idx + 1] = { ...layers[idx + 1], zIndex: temp };
      }
      return { ...prev, layers };
    });
    templateStore.markDirty();
  };

  const handleMoveLayerDown = (id: string) => {
    setTemplateData((prev) => {
      const layers = [...prev.layers];
      const idx = layers.findIndex((l) => l.id === id);
      if (idx > 0) {
        const temp = layers[idx].zIndex;
        layers[idx] = { ...layers[idx], zIndex: layers[idx - 1].zIndex };
        layers[idx - 1] = { ...layers[idx - 1], zIndex: temp };
      }
      return { ...prev, layers };
    });
    templateStore.markDirty();
  };

  const handleSave = () => {
    templateStore.saveSnapshot();
    props.onSave?.(templateData());
  };

  const handleZoomIn = () => storeZoom(zoom() + 0.1);
  const handleZoomOut = () => storeZoom(zoom() - 0.1);
  const handleZoomReset = () => storeZoom(1);

  return (
    <div class="flex flex-col h-full">
      {/* Toolbar */}
      <div class="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div class="flex items-center gap-2">
          <h2 class="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {props.template.name}
          </h2>
          <Show when={isDirty()}>
            <span class="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/50 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:text-amber-300">
              Unsaved
            </span>
          </Show>
        </div>

        <div class="flex items-center gap-2">
          {/* Grid toggle */}
          <button
            onClick={() => setShowGrid(!showGrid())}
            class={`p-1.5 rounded-lg transition-colors ${
              showGrid()
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title="Toggle grid"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>

          {/* Brand preview toggle */}
          <button
            onClick={() => setApplyBrandPreview(!applyBrandPreview())}
            class={`p-1.5 rounded-lg transition-colors ${
              applyBrandPreview()
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title="Preview with brand applied"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </button>

          {/* Zoom controls */}
          <div class="flex items-center gap-1 border-l border-gray-200 dark:border-gray-700 pl-2 ml-2">
            <button
              onClick={handleZoomOut}
              class="p-1 rounded text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Zoom out"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <button
              onClick={handleZoomReset}
              class="text-xs font-medium text-gray-600 dark:text-gray-300 min-w-[3rem] text-center hover:bg-gray-100 dark:hover:bg-gray-800 px-1.5 py-0.5 rounded"
            >
              {Math.round(zoom() * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              class="p-1 rounded text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Zoom in"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Save / Export */}
          <div class="flex items-center gap-2 border-l border-gray-200 dark:border-gray-700 pl-2 ml-2">
            <button
              onClick={handleSave}
              disabled={!isDirty()}
              class="px-3 py-1.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Save
            </button>
            <Show when={!props.readonly}>
              <button
                onClick={props.onExport}
                class="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Export
              </button>
            </Show>
          </div>
        </div>
      </div>

      {/* Editor body: Canvas + Layer Panel */}
      <div class="flex flex-1 overflow-hidden">
        {/* Canvas area */}
        <div class="flex-1 p-4 overflow-auto bg-gray-100 dark:bg-gray-800">
          <TemplateCanvas
            templateData={templateData()}
            selectedLayerId={selectedLayerId()}
            zoom={zoom()}
            showGrid={showGrid()}
            onLayerSelect={handleLayerSelect}
            onLayerMove={handleLayerMove}
            onLayerResize={handleLayerResize}
            onCanvasClick={handleCanvasClick}
            brandColors={props.brandColors}
            brandFonts={props.brandFonts}
            applyBrand={applyBrandPreview()}
          />
        </div>

        {/* Layer panel */}
        <div class="w-72 shrink-0 border-l border-gray-200 dark:border-gray-700">
          <TemplateLayerPanel
            layers={templateData().layers}
            selectedLayerId={selectedLayerId()}
            onSelectLayer={handleLayerSelect}
            onAddLayer={handleAddLayer}
            onRemoveLayer={handleRemoveLayer}
            onMoveLayerUp={handleMoveLayerUp}
            onMoveLayerDown={handleMoveLayerDown}
            onToggleVisibility={handleToggleVisibility}
            onToggleLock={handleToggleLock}
            onUpdateLayer={handleUpdateLayer}
            editable={!props.readonly}
          />
        </div>
      </div>
    </div>
  );
};
