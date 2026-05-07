import { type Component, For, Show, createSignal } from 'solid-js';
import type { Mockup } from '~/lib/types';

interface ProductMockupPreviewProps {
  mockups: Mockup[];
  selectedMockupId: string | null;
  loading: boolean;
  onSelect?: (id: string) => void;
  onDownload?: (id: string) => void;
  onRegenerate?: (id: string) => void;
  onAiEnhance?: (id: string) => void;
}

export const ProductMockupPreview: Component<ProductMockupPreviewProps> = (props) => {
  const [previewMode, setPreviewMode] = createSignal<'grid' | 'list'>('grid');

  const selectedMockup = () =>
    props.mockups.find((m) => m.id === props.selectedMockupId) ?? null;

  const MockupView = (mockup: Mockup) => (
    <div
      onClick={() => props.onSelect?.(mockup.id)}
      class={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
        props.selectedMockupId === mockup.id
          ? 'border-indigo-500 ring-2 ring-indigo-500/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
      }`}
    >
      <div class="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <img
          src={mockup.thumbnailUrl ?? mockup.imageUrl}
          alt={mockup.variantName}
          class="w-full h-full object-contain p-2"
          loading="lazy"
        />
      </div>

      <div class="p-2 bg-white dark:bg-gray-900">
        <p class="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
          {mockup.variantName}
        </p>
        <p class="text-[10px] text-gray-400 dark:text-gray-500">
          {mockup.productColor ?? mockup.format?.toUpperCase()}
        </p>
      </div>

      {/* Hover actions */}
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
        <button
          onClick={(e) => { e.stopPropagation(); props.onDownload?.(mockup.id); }}
          class="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          title="Download"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); props.onRegenerate?.(mockup.id); }}
          class="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          title="Regenerate"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); props.onAiEnhance?.(mockup.id); }}
          class="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          title="AI Enhance"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div class="space-y-4">
      {/* Header */}
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Mockup Preview
          <Show when={props.mockups.length > 0}>
            <span class="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
              ({props.mockups.length})
            </span>
          </Show>
        </h3>

        {/* View toggle */}
        <div class="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
          <button
            onClick={() => setPreviewMode('grid')}
            class={`p-1.5 rounded transition-colors ${
              previewMode() === 'grid'
                ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-700 dark:text-gray-200'
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
            title="Grid view"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setPreviewMode('list')}
            class={`p-1.5 rounded transition-colors ${
              previewMode() === 'list'
                ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-700 dark:text-gray-200'
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
            title="List view"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Loading */}
      <Show when={props.loading}>
        <div class="flex justify-center py-8">
          <svg class="animate-spin h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      </Show>

      {/* No mockups */}
      <Show when={!props.loading && props.mockups.length === 0}>
        <div class="text-center py-12">
          <svg class="mx-auto w-16 h-16 text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            No mockups generated yet. Click "Generate" to create mockups.
          </p>
        </div>
      </Show>

      {/* Mockup grid */}
      <Show when={!props.loading && props.mockups.length > 0}>
        <div
          class={
            previewMode() === 'grid'
              ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'
              : 'grid grid-cols-1 gap-2'
          }
        >
          <For each={props.mockups}>
            {(mockup) => <MockupView {...mockup} />}
          </For>
        </div>
      </Show>

      {/* Full-size preview of selected mockup */}
      <Show when={selectedMockup()}>
        <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">
              {selectedMockup()!.variantName}
            </h4>
            <div class="flex items-center gap-2">
              <Show when={selectedMockup()!.imageWidth}>
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  {selectedMockup()!.imageWidth} × {selectedMockup()!.imageHeight}
                </span>
              </Show>
              <Show when={selectedMockup()!.fileSize}>
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round(selectedMockup()!.fileSize! / 1024)} KB
                </span>
              </Show>
            </div>
          </div>
          <img
            src={selectedMockup()!.imageUrl}
            alt={selectedMockup()!.variantName}
            class="max-w-full max-h-96 object-contain mx-auto rounded-lg shadow-md"
          />
        </div>
      </Show>
    </div>
  );
};
