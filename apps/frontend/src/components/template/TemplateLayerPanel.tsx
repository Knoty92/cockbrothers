import { type Component, For, Show, createSignal } from 'solid-js';
import type { TemplateLayer } from '~/lib/types';

interface TemplateLayerPanelProps {
  layers: TemplateLayer[];
  selectedLayerId: string | null;
  onSelectLayer: (id: string | null) => void;
  onAddLayer?: (type: TemplateLayer['type']) => void;
  onRemoveLayer?: (id: string) => void;
  onMoveLayerUp?: (id: string) => void;
  onMoveLayerDown?: (id: string) => void;
  onToggleVisibility?: (id: string) => void;
  onToggleLock?: (id: string) => void;
  onUpdateLayer?: (id: string, updates: Partial<TemplateLayer>) => void;
  editable?: boolean;
}

type NewLayerType = TemplateLayer['type'];

const layerTypeIcons: Record<NewLayerType, string> = {
  text: 'T',
  image: '🖼',
  shape: '◻',
  logo: '©',
  brand_color: '🎨',
};

const layerTypeLabels: Record<NewLayerType, string> = {
  text: 'Text',
  image: 'Image',
  shape: 'Shape',
  logo: 'Logo',
  brand_color: 'Brand Color',
};

export const TemplateLayerPanel: Component<TemplateLayerPanelProps> = (props) => {
  const [editingLayerId, setEditingLayerId] = createSignal<string | null>(null);

  const selectedLayer = () =>
    props.layers.find((l) => l.id === props.selectedLayerId) ?? null;

  // Layer icon by type
  const layerIcon = (type: NewLayerType) => {
    if (type === 'text') {
      return (
        <span class="text-xs font-bold w-5 h-5 flex items-center justify-center rounded bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300">
          T
        </span>
      );
    }
    if (type === 'image') {
      return (
        <span class="text-xs w-5 h-5 flex items-center justify-center rounded bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300">
          🖼
        </span>
      );
    }
    if (type === 'shape') {
      return (
        <span class="text-xs w-5 h-5 flex items-center justify-center rounded bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300">
          ◻
        </span>
      );
    }
    if (type === 'logo') {
      return (
        <span class="text-xs w-5 h-5 flex items-center justify-center rounded bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-300">
          ©
        </span>
      );
    }
    return null;
  };

  // Properties for selected layer
  const LayerProperties = () => {
    const layer = selectedLayer();
    if (!layer) return (
      <div class="text-sm text-gray-400 dark:text-gray-500 text-center py-8">
        Select a layer to edit its properties
      </div>
    );

    return (
      <div class="space-y-3 p-3">
        <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Layer Properties
        </h4>

        {/* Name */}
        <div>
          <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Name</label>
          <input
            type="text"
            value={layer.name}
            onInput={(e) => props.onUpdateLayer?.(layer.id, { name: e.currentTarget.value })}
            class="w-full px-2 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Position & Size */}
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">X</label>
            <input
              type="number"
              value={layer.x}
              onInput={(e) => props.onUpdateLayer?.(layer.id, { x: Number(e.currentTarget.value) })}
              class="w-full px-2 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Y</label>
            <input
              type="number"
              value={layer.y}
              onInput={(e) => props.onUpdateLayer?.(layer.id, { y: Number(e.currentTarget.value) })}
              class="w-full px-2 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Width</label>
            <input
              type="number"
              value={layer.width}
              onInput={(e) => props.onUpdateLayer?.(layer.id, { width: Number(e.currentTarget.value) })}
              class="w-full px-2 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Height</label>
            <input
              type="number"
              value={layer.height}
              onInput={(e) => props.onUpdateLayer?.(layer.id, { height: Number(e.currentTarget.value) })}
              class="w-full px-2 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Opacity */}
        <div>
          <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">
            Opacity: {Math.round(layer.opacity * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={layer.opacity}
            onInput={(e) => props.onUpdateLayer?.(layer.id, { opacity: Number(e.currentTarget.value) })}
            class="w-full accent-indigo-500"
          />
        </div>

        {/* Rotation */}
        <div>
          <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">
            Rotation: {layer.rotation}°
          </label>
          <input
            type="range"
            min="-180"
            max="180"
            step="1"
            value={layer.rotation}
            onInput={(e) => props.onUpdateLayer?.(layer.id, { rotation: Number(e.currentTarget.value) })}
            class="w-full accent-indigo-500"
          />
        </div>

        {/* Text-specific properties */}
        <Show when={layer.type === 'text'}>
          <div>
            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Content</label>
            <textarea
              value={layer.content ?? ''}
              onInput={(e) => props.onUpdateLayer?.(layer.id, { content: e.currentTarget.value })}
              rows={2}
              class="w-full px-2 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
            />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Font Size</label>
              <input
                type="number"
                value={layer.fontSize ?? 16}
                onInput={(e) => props.onUpdateLayer?.(layer.id, { fontSize: Number(e.currentTarget.value) })}
                class="w-full px-2 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Font Weight</label>
              <select
                value={layer.fontWeight ?? 400}
                onChange={(e) => props.onUpdateLayer?.(layer.id, { fontWeight: Number(e.currentTarget.value) })}
                class="w-full px-2 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="300">Light</option>
                <option value="400">Regular</option>
                <option value="500">Medium</option>
                <option value="600">Semi Bold</option>
                <option value="700">Bold</option>
                <option value="800">Extra Bold</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Color</label>
            <div class="flex items-center gap-2">
              <input
                type="color"
                value={layer.color ?? '#000000'}
                onInput={(e) => props.onUpdateLayer?.(layer.id, { color: e.currentTarget.value })}
                class="w-8 h-8 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                value={layer.color ?? '#000000'}
                onInput={(e) => props.onUpdateLayer?.(layer.id, { color: e.currentTarget.value })}
                class="flex-1 px-2 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Text Align</label>
            <div class="flex gap-1">
              {(['left', 'center', 'right'] as const).map((align) => (
                <button
                  onClick={() => props.onUpdateLayer?.(layer.id, { textAlign: align })}
                  class={`px-3 py-1 text-xs rounded border transition-colors ${
                    layer.textAlign === align
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 text-indigo-700 dark:text-indigo-300'
                      : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {align === 'left' ? '⫷' : align === 'center' ? '⫿' : '⫸'}
                </button>
              ))}
            </div>
          </div>
        </Show>

        {/* Brand binding */}
        <div>
          <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Brand Binding</label>
          <select
            value={layer.brandBinding ?? ''}
            onChange={(e) => props.onUpdateLayer?.(layer.id, {
              brandBinding: (e.currentTarget.value || null) as TemplateLayer['brandBinding']
            })}
            class="w-full px-2 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">None (static)</option>
            <option value="logo">Logo</option>
            <option value="primary_color">Primary Color</option>
            <option value="secondary_color">Secondary Color</option>
            <option value="accent_color">Accent Color</option>
            <option value="heading_font">Heading Font</option>
            <option value="body_font">Body Font</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div class="flex flex-col h-full bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div class="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100">Layers</h3>
        <Show when={props.editable}>
          <div class="flex gap-1">
            <button
              onClick={() => props.onAddLayer?.('text')}
              class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-bold"
              title="Add text layer"
            >
              T
            </button>
            <button
              onClick={() => props.onAddLayer?.('image')}
              class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs"
              title="Add image layer"
            >
              🖼
            </button>
            <button
              onClick={() => props.onAddLayer?.('shape')}
              class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs"
              title="Add shape layer"
            >
              ◻
            </button>
            <button
              onClick={() => props.onAddLayer?.('logo')}
              class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs"
              title="Add logo placeholder"
            >
              ©
            </button>
            <button
              onClick={() => props.onAddLayer?.('brand_color')}
              class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs"
              title="Add brand color block"
            >
              🎨
            </button>
          </div>
        </Show>
      </div>

      {/* Layer list */}
      <Show when={props.layers.length > 0} fallback={
        <div class="flex-1 flex items-center justify-center text-sm text-gray-400 dark:text-gray-500">
          <Show when={props.editable} fallback="No layers">
            Click + to add layers
          </Show>
        </div>
      }>
        <div class="flex-1 overflow-y-auto max-h-64">
          <For each={[...props.layers].sort((a, b) => b.zIndex - a.zIndex)}>
            {(layer) => (
              <div
                onClick={() => props.onSelectLayer(layer.id)}
                class={`flex items-center gap-2 px-3 py-2 cursor-pointer border-b border-gray-100 dark:border-gray-800 transition-colors ${
                  props.selectedLayerId === layer.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/30'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {/* Type icon */}
                {layerIcon(layer.type)}

                {/* Name */}
                <span class="flex-1 text-sm text-gray-700 dark:text-gray-300 truncate">
                  {layer.name}
                </span>

                {/* Z-index */}
                <span class="text-[10px] text-gray-400 dark:text-gray-500 w-4 text-center">
                  {layer.zIndex}
                </span>

                {/* Actions */}
                <Show when={props.editable}>
                  <button
                    onClick={(e) => { e.stopPropagation(); props.onToggleVisibility?.(layer.id); }}
                    class={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                      layer.visible ? 'text-gray-500 dark:text-gray-400' : 'text-gray-300 dark:text-gray-600'
                    }`}
                    title={layer.visible ? 'Hide layer' : 'Show layer'}
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {layer.visible ? (
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      ) : (
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      )}
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); props.onToggleLock?.(layer.id); }}
                    class={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                      layer.locked ? 'text-amber-500' : 'text-gray-400 dark:text-gray-500'
                    }`}
                    title={layer.locked ? 'Unlock layer' : 'Lock layer'}
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {layer.locked ? (
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      ) : (
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8 11V7a4 4 0 118 0m-4-8v2m-6 4h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2z" />
                      )}
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); props.onRemoveLayer?.(layer.id); }}
                    class="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-400 dark:text-gray-500 hover:text-red-500"
                    title="Remove layer"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </Show>
              </div>
            )}
          </For>
        </div>
      </Show>

      {/* Selected layer properties */}
      <div class="border-t border-gray-200 dark:border-gray-700 overflow-y-auto flex-1">
        <LayerProperties />
      </div>
    </div>
  );
};
