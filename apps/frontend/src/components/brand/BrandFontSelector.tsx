import { createSignal, For, Show, createMemo } from 'solid-js';
import type { FontOption } from '~/lib/types/brand';

interface BrandFontSelectorProps {
  headingFont: string;
  bodyFont: string;
  onHeadingChange: (font: string) => void;
  onBodyChange: (font: string) => void;
}

const FONT_OPTIONS: FontOption[] = [
  { family: 'Inter', category: 'sans-serif', variants: ['300', '400', '500', '600', '700'] },
  { family: 'Roboto', category: 'sans-serif', variants: ['300', '400', '500', '700'] },
  { family: 'Poppins', category: 'sans-serif', variants: ['300', '400', '500', '600', '700'] },
  { family: 'Montserrat', category: 'sans-serif', variants: ['300', '400', '500', '600', '700'] },
  { family: 'Open Sans', category: 'sans-serif', variants: ['300', '400', '500', '600', '700'] },
  { family: 'Lato', category: 'sans-serif', variants: ['300', '400', '700'] },
  { family: 'Playfair Display', category: 'serif', variants: ['400', '500', '600', '700'] },
  { family: 'Merriweather', category: 'serif', variants: ['300', '400', '700'] },
  { family: 'PT Serif', category: 'serif', variants: ['400', '700'] },
  { family: 'Bebas Neue', category: 'display', variants: ['400'] },
  { family: 'Oswald', category: 'display', variants: ['200', '300', '400', '500', '600'] },
  { family: 'Abril Fatface', category: 'display', variants: ['400'] },
  { family: 'Pacifico', category: 'handwriting', variants: ['400'] },
  { family: 'Caveat', category: 'handwriting', variants: ['400', '500', '600'] },
  { family: 'Fira Code', category: 'monospace', variants: ['300', '400', '500', '600'] },
  { family: 'JetBrains Mono', category: 'monospace', variants: ['300', '400', '500', '700'] },
];

export function BrandFontSelector(props: BrandFontSelectorProps) {
  const [searchHeading, setSearchHeading] = createSignal('');
  const [searchBody, setSearchBody] = createSignal('');
  const [showHeadingDropdown, setShowHeadingDropdown] = createSignal(false);
  const [showBodyDropdown, setShowBodyDropdown] = createSignal(false);

  const filteredHeadingFonts = createMemo(() =>
    FONT_OPTIONS.filter((f) =>
      f.family.toLowerCase().includes(searchHeading().toLowerCase()),
    ),
  );

  const filteredBodyFonts = createMemo(() =>
    FONT_OPTIONS.filter((f) =>
      f.family.toLowerCase().includes(searchBody().toLowerCase()),
    ),
  );

  const selectedHeadingFont = createMemo(
    () => FONT_OPTIONS.find((f) => f.family === props.headingFont) ?? null,
  );

  const selectedBodyFont = createMemo(
    () => FONT_OPTIONS.find((f) => f.family === props.bodyFont) ?? null,
  );

  const categories = createMemo(() => {
    const cats = [...new Set(FONT_OPTIONS.map((f) => f.category))];
    return cats as FontOption['category'][];
  });

  const fontsByCategory = (category: string) =>
    FONT_OPTIONS.filter((f) => f.category === category);

  return (
    <div class="space-y-6">
      <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
        Typography
      </h3>

      {/* Heading font */}
      <div class="relative">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Heading font
        </label>
        <button
          type="button"
          onClick={() => setShowHeadingDropdown(!showHeadingDropdown())}
          class="w-full flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2.5 text-left text-sm hover:border-gray-300 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
        >
          <span style={{ 'font-family': props.headingFont }}>
            {props.headingFont}
          </span>
          <svg
            class={`h-4 w-4 text-gray-400 transition-transform ${showHeadingDropdown() ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width={2}
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <Show when={showHeadingDropdown()}>
          <>
            {/* Backdrop */}
            <div
              class="fixed inset-0 z-10"
              onClick={() => setShowHeadingDropdown(false)}
            />

            <div class="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg max-h-72 overflow-hidden">
              {/* Search */}
              <div class="sticky top-0 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-2">
                <input
                  type="text"
                  value={searchHeading()}
                  onInput={(e) => setSearchHeading(e.currentTarget.value)}
                  placeholder="Search fonts…"
                  class="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div class="overflow-y-auto max-h-56">
                <For each={categories()}>
                  {(category) => (
                    <div>
                      <div class="px-3 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800/50">
                        {category}
                      </div>
                      <For each={fontsByCategory(category)}>
                        {(font) => (
                          <button
                            type="button"
                            onClick={() => {
                              props.onHeadingChange(font.family);
                              setShowHeadingDropdown(false);
                              setSearchHeading('');
                            }}
                            class={`w-full px-3 py-2 text-left text-sm hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center gap-3 ${
                              props.headingFont === font.family
                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <span class="flex-1 truncate" style={{ 'font-family': font.family }}>
                              {font.family}
                            </span>
                            <span class="text-xs text-gray-400">{font.category}</span>
                          </button>
                        )}
                      </For>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </>
        </Show>

        {/* Preview */}
        <div class="mt-2 rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
          <p
            class="text-lg font-bold truncate"
            style={{ 'font-family': props.headingFont }}
          >
            The quick brown fox jumps over the lazy dog
          </p>
          <p class="text-xs text-gray-400 mt-1 font-mono">
            {props.headingFont} · Heading
          </p>
        </div>
      </div>

      {/* Body font */}
      <div class="relative">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Body font
        </label>
        <button
          type="button"
          onClick={() => setShowBodyDropdown(!showBodyDropdown())}
          class="w-full flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2.5 text-left text-sm hover:border-gray-300 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
        >
          <span style={{ 'font-family': props.bodyFont }}>
            {props.bodyFont}
          </span>
          <svg
            class={`h-4 w-4 text-gray-400 transition-transform ${showBodyDropdown() ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width={2}
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <Show when={showBodyDropdown()}>
          <>
            <div
              class="fixed inset-0 z-10"
              onClick={() => setShowBodyDropdown(false)}
            />

            <div class="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg max-h-72 overflow-hidden">
              <div class="sticky top-0 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-2">
                <input
                  type="text"
                  value={searchBody()}
                  onInput={(e) => setSearchBody(e.currentTarget.value)}
                  placeholder="Search fonts…"
                  class="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div class="overflow-y-auto max-h-56">
                <For each={categories()}>
                  {(category) => (
                    <div>
                      <div class="px-3 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800/50">
                        {category}
                      </div>
                      <For each={fontsByCategory(category)}>
                        {(font) => (
                          <button
                            type="button"
                            onClick={() => {
                              props.onBodyChange(font.family);
                              setShowBodyDropdown(false);
                              setSearchBody('');
                            }}
                            class={`w-full px-3 py-2 text-left text-sm hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center gap-3 ${
                              props.bodyFont === font.family
                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <span class="flex-1 truncate" style={{ 'font-family': font.family }}>
                              {font.family}
                            </span>
                            <span class="text-xs text-gray-400">{font.category}</span>
                          </button>
                        )}
                      </For>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </>
        </Show>

        {/* Preview */}
        <div class="mt-2 rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
          <p
            class="text-sm leading-relaxed"
            style={{ 'font-family': props.bodyFont }}
          >
            The quick brown fox jumps over the lazy dog. Pack my box with five
            dozen liquor jugs. How vexingly quick daft zebras jump.
          </p>
          <p class="text-xs text-gray-400 mt-1 font-mono">
            {props.bodyFont} · Body
          </p>
        </div>
      </div>

      {/* Font pair verdict */}
      <div class="rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3">
        <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
          Font pairing
        </p>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <span style={{ 'font-family': props.headingFont }} class="font-bold">
            {props.headingFont}
          </span>{' '}
          <span class="text-gray-400 mx-1">+</span>{' '}
          <span style={{ 'font-family': props.bodyFont }}>
            {props.bodyFont}
          </span>
        </p>
      </div>
    </div>
  );
}
