import { type Component, For, Show, createSignal, createMemo } from 'solid-js';
import type { Brand } from '~/lib/types/brand';
import type { Template, ProductType } from '~/lib/types';

interface VariantOption {
  name: string;
  colors: string[];
  sizes?: string[];
}

interface ProductConfiguratorProps {
  brands: () => Brand[];
  templates: () => Template[];
  variants: () => VariantOption[];
  selectedBrandId: () => string | null;
  selectedTemplateId: () => string | null;
  productName: string;
  generating: boolean;
  onBrandChange: (id: string) => void;
  onTemplateChange: (id: string) => void;
  onProductNameChange: (name: string) => void;
  onGenerate: () => void;
  onCreate: () => void;
  onCancel?: () => void;
}

export const ProductConfigurator: Component<ProductConfiguratorProps> = (props) => {
  const [step, setStep] = createSignal(1); // 1: brand, 2: template, 3: review & generate
  const [selectedColor, setSelectedColor] = createSignal<string | null>(null);
  const [selectedSize, setSelectedSize] = createSignal<string | null>(null);

  const selectedBrand = createMemo(() =>
    props.brands().find((b) => b.id === props.selectedBrandId()) ?? null
  );

  const selectedTemplate = createMemo(() =>
    props.templates().find((t) => t.id === props.selectedTemplateId()) ?? null
  );

  const canGoNext = () => {
    if (step() === 1) return props.selectedBrandId() !== null;
    if (step() === 2) return props.selectedTemplateId() !== null;
    return props.productName.length > 0;
  };

  const handleNext = () => {
    if (canGoNext()) setStep((s) => Math.min(s + 1, 3));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div class="max-w-3xl mx-auto space-y-6">
      {/* Step indicator */}
      <div class="flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div class="flex items-center gap-2">
            <div
              class={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                step() === s
                  ? 'bg-indigo-600 text-white'
                  : step() > s
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
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
              {s === 1 ? 'Select Brand' : s === 2 ? 'Select Template' : 'Configure & Generate'}
            </span>
            {s < 3 && (
              <svg class="w-4 h-4 text-gray-300 dark:text-gray-600 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Brand Selection */}
      <Show when={step() === 1}>
        <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Choose a Brand</h3>

          <Show
            when={props.brands().length > 0}
            fallback={
              <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>No brands yet. Create a brand kit first.</p>
              </div>
            }
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <For each={props.brands()}>
                {(brand) => (
                  <button
                    onClick={() => props.onBrandChange(brand.id)}
                    class={`flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all ${
                      props.selectedBrandId() === brand.id
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 bg-white dark:bg-gray-900'
                    }`}
                  >
                    {/* Brand avatar / logo */}
                    <div
                      class="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0"
                      style={{ 'background-color': brand.primaryColor ?? '#6366f1' }}
                    >
                      {brand.name.charAt(0)}
                    </div>

                    <div class="min-w-0">
                      <p class="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                        {brand.name}
                      </p>
                      <Show when={brand.productsCount !== undefined}>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          {brand.productsCount} products
                        </p>
                      </Show>
                    </div>
                  </button>
                )}
              </For>
            </div>
          </Show>
        </div>
      </Show>

      {/* Step 2: Template Selection */}
      <Show when={step() === 2}>
        <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Choose a Template</h3>

          <Show
            when={props.templates().length > 0}
            fallback={
              <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>No templates available.</p>
              </div>
            }
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <For each={props.templates()}>
                {(template) => (
                  <button
                    onClick={() => props.onTemplateChange(template.id)}
                    class={`flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all ${
                      props.selectedTemplateId() === template.id
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 bg-white dark:bg-gray-900'
                    }`}
                  >
                    {/* Template thumbnail */}
                    <div class="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
                      <Show
                        when={template.previewUrl}
                        fallback={
                          <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        }
                      >
                        <img src={template.previewUrl!} alt={template.name} class="w-full h-full object-cover" />
                      </Show>
                    </div>

                    <div class="min-w-0">
                      <p class="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                        {template.name}
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {template.productType}
                      </p>
                      <Show when={template.isSystem}>
                        <span class="inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 px-1.5 py-0.5 text-[10px] font-medium text-indigo-700 dark:text-indigo-300 mt-1">
                          System
                        </span>
                      </Show>
                    </div>
                  </button>
                )}
              </For>
            </div>
          </Show>
        </div>
      </Show>

      {/* Step 3: Configure & Generate */}
      <Show when={step() === 3}>
        <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Configure Product</h3>

          {/* Selected brand + template summary */}
          <div class="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Show when={selectedBrand()}>
              <div class="flex items-center gap-2">
                <div
                  class="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ 'background-color': selectedBrand()?.primaryColor ?? '#6366f1' }}
                >
                  {selectedBrand()?.name.charAt(0)}
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {selectedBrand()?.name}
                </span>
              </div>
            </Show>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <Show when={selectedTemplate()}>
              <span class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {selectedTemplate()?.name}
              </span>
            </Show>
          </div>

          {/* Product name */}
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={props.productName}
              onInput={(e) => props.onProductNameChange(e.currentTarget.value)}
              placeholder={`${selectedBrand()?.name ?? 'Brand'} - ${selectedTemplate()?.name ?? 'Template'}`}
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Variant options */}
          <Show when={props.variants().length > 0}>
            <div class="space-y-4">
              <For each={props.variants()}>
                {(variant) => (
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {variant.name}
                    </label>

                    {/* Colors */}
                    <Show when={variant.colors.length > 0}>
                      <div class="flex flex-wrap gap-2 mb-3">
                        <For each={variant.colors}>
                          {(color) => (
                            <button
                              onClick={() => setSelectedColor(color)}
                              class={`w-8 h-8 rounded-full border-2 transition-all ${
                                selectedColor() === color
                                  ? 'border-indigo-500 ring-2 ring-indigo-500/30 scale-110'
                                  : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                              }`}
                              style={{ 'background-color': color }}
                              title={color}
                            />
                          )}
                        </For>
                      </div>
                    </Show>

                    {/* Sizes */}
                    <Show when={variant.sizes && variant.sizes!.length > 0}>
                      <div class="flex flex-wrap gap-2">
                        <For each={variant.sizes!}>
                          {(size) => (
                            <button
                              onClick={() => setSelectedSize(size)}
                              class={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                                selectedSize() === size
                                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                              }`}
                            >
                              {size}
                            </button>
                          )}
                        </For>
                      </div>
                    </Show>
                  </div>
                )}
              </For>
            </div>
          </Show>

          <Show when={!props.variants().length}>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              No variant options available. Default options will be used.
            </p>
          </Show>
        </div>
      </Show>

      {/* Navigation buttons */}
      <div class="flex items-center justify-between">
        <button
          onClick={step() > 1 ? handleBack : props.onCancel}
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          {step() > 1 ? 'Back' : 'Cancel'}
        </button>

        <Show
          when={step() < 3}
          fallback={
            <div class="flex items-center gap-2">
              <button
                onClick={props.onCreate}
                disabled={props.generating || !props.productName}
                class="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Create Product
              </button>
              <button
                onClick={props.onGenerate}
                disabled={props.generating || !props.productName}
                class="px-6 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Show when={props.generating} fallback="Generate Mockups">
                  <span class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating...
                  </span>
                </Show>
              </button>
            </div>
          }
        >
          <button
            onClick={handleNext}
            disabled={!canGoNext()}
            class="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continue
          </button>
        </Show>
      </div>
    </div>
  );
};
