import { type Component, For, Show, createSignal, createMemo } from 'solid-js';
import type { Brand } from '~/lib/types/brand';
import type { Template, GenerationJob, ProductType } from '~/lib/types';

interface BatchProcessorProps {
  brands: () => Brand[];
  templates: () => Template[];
  generationQueue: () => GenerationJob[];
  generationProgress: () => number;
  hasActiveJobs: () => boolean;
  generating: boolean;
  onStartBatch: (brandId: string, templateIds: string[]) => void;
  onCancel?: () => void;
  onClearQueue?: () => void;
}

const productTypeLabels: Record<string, string> = {
  tshirt: 'T-shirt',
  hoodie: 'Hoodie',
  sweatshirt: 'Sweatshirt',
  tank_top: 'Tank Top',
  mug: 'Mug',
  poster: 'Poster',
  canvas: 'Canvas',
  tote_bag: 'Tote Bag',
  phone_case: 'Phone Case',
  hat: 'Hat',
  pin: 'Pin',
  sticker: 'Sticker',
  leggings: 'Leggings',
  pillow: 'Pillow',
  blanket: 'Blanket',
};

export const BatchProcessor: Component<BatchProcessorProps> = (props) => {
  const [step, setStep] = createSignal(1);
  const [selectedBrandId, setSelectedBrandId] = createSignal<string | null>(null);
  const [selectedTemplateIds, setSelectedTemplateIds] = createSignal<Set<string>>(new Set());
  const [namePattern, setNamePattern] = createSignal('{brand} - {template}');

  const selectedBrand = createMemo(() =>
    props.brands().find((b) => b.id === selectedBrandId()) ?? null
  );

  const toggleTemplate = (id: string) => {
    setSelectedTemplateIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAllTemplates = () => {
    setSelectedTemplateIds(new Set(props.templates().map((t) => t.id)));
  };

  const selectNoneTemplates = () => {
    setSelectedTemplateIds(new Set<string>());
  };

  const canStart = () => selectedBrandId() !== null && selectedTemplateIds().size > 0;

  const handleStart = () => {
    if (!canStart()) return;
    props.onStartBatch(selectedBrandId()!, Array.from(selectedTemplateIds()));
    setStep(4); // Move to progress
  };

  // Stats
  const totalJobs = () => props.generationQueue().length;
  const completedJobs = () => props.generationQueue().filter((j) => j.status === 'completed').length;
  const failedJobs = () => props.generationQueue().filter((j) => j.status === 'failed').length;
  const pendingJobs = () => props.generationQueue().filter((j) => j.status === 'pending').length;

  return (
    <div class="max-w-4xl mx-auto space-y-6">
      {/* Step indicator */}
      <div class="flex items-center gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div class="flex items-center gap-2">
            <div
              class={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                step() === s
                  ? 'bg-indigo-600 text-white'
                  : step() > s
                  ? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              }`}
            >
              {step() > s ? (
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                s
              )}
            </div>
            <span class={`text-sm ${step() === s ? 'font-medium text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
              {s === 1 ? 'Select Brand' : s === 2 ? 'Select Templates' : s === 3 ? 'Review' : 'Generating'}
            </span>
            {s < 4 && (
              <svg class="w-4 h-4 text-gray-300 dark:text-gray-600 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Brand */}
      <Show when={step() === 1}>
        <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Select Brand (Batch Source)
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Choose one brand to apply across multiple templates.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <For each={props.brands()}>
              {(brand) => (
                <button
                  onClick={() => setSelectedBrandId(brand.id)}
                  class={`flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all ${
                    selectedBrandId() === brand.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                  }`}
                >
                  <div
                    class="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0"
                    style={{ 'background-color': brand.primaryColor ?? '#6366f1' }}
                  >
                    {brand.name.charAt(0)}
                  </div>
                  <div class="min-w-0">
                    <p class="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">{brand.name}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{brand.productsCount ?? 0} existing products</p>
                  </div>
                </button>
              )}
            </For>
          </div>

          <Show when={props.brands().length === 0}>
            <p class="text-center py-8 text-gray-500 dark:text-gray-400">No brands available.</p>
          </Show>
        </div>
      </Show>

      {/* Step 2: Templates */}
      <Show when={step() === 2}>
        <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Select Templates
            </h3>
            <div class="flex gap-2">
              <button
                onClick={selectAllTemplates}
                class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
              >
                Select All
              </button>
              <button
                onClick={selectNoneTemplates}
                class="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700"
              >
                Clear
              </button>
            </div>
          </div>

          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {selectedTemplateIds().size} template{selectedTemplateIds().size !== 1 ? 's' : ''} selected
          </p>

          <Show
            when={props.templates().length > 0}
            fallback={<p class="text-center py-8 text-gray-500 dark:text-gray-400">No templates available.</p>}
          >
            <div class="space-y-1 max-h-96 overflow-y-auto">
              <For each={props.templates()}>
                {(template) => (
                  <label class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedTemplateIds().has(template.id)}
                      onChange={() => toggleTemplate(template.id)}
                      class="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div class="w-10 h-10 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
                      <Show
                        when={template.previewUrl}
                        fallback={<span class="text-lg">{productTypeLabels[template.productType]?.charAt(0) ?? 'T'}</span>}
                      >
                        <img src={template.previewUrl!} alt="" class="w-full h-full object-cover" />
                      </Show>
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{template.name}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {productTypeLabels[template.productType] ?? template.productType}
                      </p>
                    </div>
                    <Show when={template.isSystem}>
                      <span class="shrink-0 inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 px-2 py-0.5 text-[10px] font-medium text-indigo-700 dark:text-indigo-300">
                        System
                      </span>
                    </Show>
                  </label>
                )}
              </For>
            </div>
          </Show>
        </div>
      </Show>

      {/* Step 3: Review */}
      <Show when={step() === 3}>
        <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Review Batch</h3>

          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-500 dark:text-gray-400 w-32">Brand:</span>
              <Show when={selectedBrand()}>
                <div
                  class="w-5 h-5 rounded"
                  style={{ 'background-color': selectedBrand()?.primaryColor ?? '#6366f1' }}
                />
                <span class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {selectedBrand()?.name}
                </span>
              </Show>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-500 dark:text-gray-400 w-32">Templates:</span>
              <span class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {selectedTemplateIds().size}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-500 dark:text-gray-400 w-32">Products to create:</span>
              <span class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {selectedTemplateIds().size}
              </span>
            </div>
          </div>

          {/* Name pattern */}
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Name Pattern
            </label>
            <input
              type="text"
              value={namePattern()}
              onInput={(e) => setNamePattern(e.currentTarget.value)}
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Use {'{brand}'} and {'{template}'} as placeholders
            </p>
          </div>

          {/* Preview names */}
          <Show when={selectedTemplateIds().size > 0}>
            <div class="space-y-1">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400">Preview names:</p>
              <For each={props.templates().filter((t) => selectedTemplateIds().has(t.id))}>
                {(t) => (
                  <p class="text-xs text-gray-600 dark:text-gray-400 font-mono">
                    {namePattern()
                      .replace('{brand}', selectedBrand()?.name ?? 'Brand')
                      .replace('{template}', t.name)}
                  </p>
                )}
              </For>
            </div>
          </Show>
        </div>
      </Show>

      {/* Step 4: Generation progress */}
      <Show when={step() === 4}>
        <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {props.hasActiveJobs() ? 'Generating...' : 'Generation Complete'}
          </h3>

          {/* Progress bar */}
          <div class="space-y-2">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-700 dark:text-gray-300">
                {completedJobs()} of {totalJobs()} mockups
              </span>
              <span class="text-gray-500 dark:text-gray-400">{props.generationProgress()}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                class="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${props.generationProgress()}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div class="grid grid-cols-3 gap-4">
            <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{pendingJobs()}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Pending</p>
            </div>
            <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p class="text-2xl font-bold text-green-600 dark:text-green-400">{completedJobs()}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Completed</p>
            </div>
            <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p class={`text-2xl font-bold ${failedJobs() > 0 ? 'text-red-600' : 'text-gray-400 dark:text-gray-500'}`}>
                {failedJobs()}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Failed</p>
            </div>
          </div>

          {/* Job list */}
          <Show when={props.generationQueue().length > 0}>
            <div class="space-y-2 max-h-64 overflow-y-auto">
              <For each={props.generationQueue()}>
                {(job) => (
                  <div class="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <Show
                      when={job.status === 'completed'}
                      fallback={
                        <Show
                          when={job.status === 'failed'}
                          fallback={
                            <svg class="animate-spin h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          }
                        >
                          <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </Show>
                      }
                    >
                      <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </Show>
                    <span class="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">
                      {job.variantName}
                    </span>
                    <span class="text-[10px] text-gray-400 dark:text-gray-500">
                      {job.progress}%
                    </span>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </div>
      </Show>

      {/* Navigation */}
      <div class="flex items-center justify-between">
        <button
          onClick={() => {
            if (step() > 1 && step() < 4) {
              setStep((s) => s - 1);
            } else {
              props.onCancel?.();
            }
          }}
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          {step() > 1 && step() < 4 ? 'Back' : 'Cancel'}
        </button>

        <Show
          when={step() < 4}
          fallback={
            <div class="flex items-center gap-2">
              <Show when={!props.hasActiveJobs()}>
                <button
                  onClick={props.onClearQueue}
                  class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Clear Queue
                </button>
              </Show>
            </div>
          }
        >
          <Show
            when={step() < 3}
            fallback={
              <button
                onClick={handleStart}
                disabled={!canStart() || props.generating}
                class="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Show when={!props.generating} fallback="Starting...">
                  Start Batch Generation
                </Show>
              </button>
            }
          >
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={(step() === 1 && !selectedBrandId()) || (step() === 2 && selectedTemplateIds().size === 0)}
              class="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Continue
            </button>
          </Show>
        </Show>
      </div>
    </div>
  );
};
