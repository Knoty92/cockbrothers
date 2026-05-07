import { createSignal, For, Show, createMemo } from 'solid-js';
import type { PaletteSuggestion } from '~/lib/types/brand';

interface BrandColorPickerProps {
  label: string;
  value: string;
  onChange: (hex: string) => void;
  showAISuggest?: boolean;
  onAISuggest?: () => Promise<PaletteSuggestion[]>;
}

export function BrandColorPicker(props: BrandColorPickerProps) {
  const [inputValue, setInputValue] = createSignal(props.value);
  const [copied, setCopied] = createSignal(false);
  const [suggestions, setSuggestions] = createSignal<PaletteSuggestion[]>([]);
  const [suggesting, setSuggesting] = createSignal(false);
  const [showPalette, setShowPalette] = createSignal(false);

  // Predefined swatches for quick selection
  const swatches = [
    '#000000', '#1D1D1F', '#515151', '#86868B',
    '#F5F5F7', '#FFFFFF',
    '#DC2626', '#EA580C', '#D97706', '#EAB308',
    '#22C55E', '#06B6D4', '#3B82F6', '#6366F1',
    '#8B5CF6', '#A855F7', '#D946EF', '#EC4899',
    '#881337', '#7C2D12', '#451A03', '#1E3A5F',
  ];

  const handleHexInput = (val: string) => {
    let hex = val.startsWith('#') ? val : `#${val}`;
    hex = hex.slice(0, 7);
    setInputValue(hex);
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      props.onChange(hex);
    }
  };

  const handleSwatchClick = (hex: string) => {
    setInputValue(hex);
    props.onChange(hex);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(props.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const handleAISuggest = async () => {
    if (!props.onAISuggest) return;
    setSuggesting(true);
    try {
      const palettes = await props.onAISuggest();
      setSuggestions(palettes);
      setShowPalette(true);
    } catch {} finally {
      setSuggesting(false);
    }
  };

  // WCAG contrast check
  const luminance = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const adjust = (c: number) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return 0.2126 * adjust(r) + 0.7152 * adjust(g) + 0.0722 * adjust(b);
  };

  const contrastRatio = createMemo(() => {
    const l1 = luminance(props.value);
    const l2 = luminance(props.secondaryColor ?? '#FFFFFF');
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
  });

  const textColor = createMemo(() => {
    const l = luminance(props.value);
    return l > 0.5 ? '#000000' : '#FFFFFF';
  });

  return (
    <div class="space-y-3">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {props.label}
      </label>

      {/* Hex input + color preview */}
      <div class="flex items-center gap-3">
        <div
          class="h-10 w-10 shrink-0 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
          style={{ 'background-color': props.value }}
          title={props.value}
        />
        <div class="relative flex-1">
          <span class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm">
            #
          </span>
          <input
            type="text"
            value={inputValue().replace(/^#/, '')}
            onInput={(e) => handleHexInput(e.currentTarget.value)}
            class="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-8 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 outline-none transition-colors"
            placeholder="000000"
            maxLength={6}
          />
        </div>
        <button
          type="button"
          onClick={copyToClipboard}
          class="shrink-0 rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          title="Copy hex"
        >
          {copied() ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Contrast indicator */}
      <div class="flex items-center gap-2">
        <div class="flex h-5 w-10 rounded overflow-hidden border border-gray-200 dark:border-gray-600">
          <div class="flex-1" style={{ 'background-color': props.value }} />
          <div
            class="flex-1"
            style={{ 'background-color': props.secondaryColor ?? '#FFFFFF' }}
          />
        </div>
        <span class="text-xs text-gray-500">
          Contrast:{' '}
          <span
            class={
              Number(contrastRatio()) >= 4.5
                ? 'text-green-600 font-medium'
                : Number(contrastRatio()) >= 3
                  ? 'text-amber-600 font-medium'
                  : 'text-red-600 font-medium'
            }
          >
            {contrastRatio()}:1
          </span>
          {Number(contrastRatio()) >= 4.5 && (
            <span class="ml-1 text-green-600">✓ AA</span>
          )}
        </span>
      </div>

      {/* Swatches */}
      <div class="flex flex-wrap gap-1.5">
        <For each={swatches}>
          {(swatch) => (
            <button
              type="button"
              onClick={() => handleSwatchClick(swatch)}
              class={`h-7 w-7 rounded-full border-2 transition-all duration-100 hover:scale-110 ${
                props.value === swatch
                  ? 'border-blue-500 ring-2 ring-blue-200 scale-110'
                  : 'border-gray-200 dark:border-gray-600'
              }`}
              style={{ 'background-color': swatch }}
              title={swatch}
            />
          )}
        </For>
      </div>

      {/* AI Palette Suggestion */}
      <Show when={props.showAISuggest && props.onAISuggest}>
        <div class="pt-1">
          <button
            type="button"
            onClick={handleAISuggest}
            disabled={suggesting()}
            class="inline-flex items-center gap-1.5 rounded-lg border border-purple-200 dark:border-purple-800 px-3 py-1.5 text-xs font-medium text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 disabled:opacity-50 transition-colors"
          >
            <svg
              class="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width={2}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
              />
            </svg>
            {suggesting() ? 'Generating…' : 'AI Palette Suggestions'}
          </button>
        </div>

        <Show when={showPalette() && suggestions().length > 0}>
          <div class="space-y-2 rounded-lg border border-purple-100 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-950/30 p-3">
            <p class="text-xs font-medium text-purple-700 dark:text-purple-300">
              Suggested palettes
            </p>
            <For each={suggestions()}>
              {(palette) => (
                <button
                  type="button"
                  onClick={() => {
                    handleSwatchClick(palette.colors[0]);
                    setShowPalette(false);
                  }}
                  class="w-full rounded-lg border border-purple-100 dark:border-purple-800 bg-white dark:bg-gray-800 p-2 text-left hover:border-purple-300 transition-colors"
                >
                  <div class="flex gap-1 mb-1">
                    <For each={palette.colors}>
                      {(c) => (
                        <div
                          class="h-6 flex-1 rounded"
                          style={{ 'background-color': c }}
                        />
                      )}
                    </For>
                  </div>
                  <p class="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {palette.name}
                  </p>
                  <p class="text-xs text-gray-400 dark:text-gray-500">
                    {palette.description}
                  </p>
                </button>
              )}
            </For>
          </div>
        </Show>
      </Show>
    </div>
  );
}
