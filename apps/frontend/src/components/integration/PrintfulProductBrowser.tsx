/**
 * PrintfulProductBrowser — browse the Printful product catalog
 * and select a product to push designs to.
 */

import {
  Component,
  createSignal,
  createMemo,
  For,
  Show,
} from 'solid-js';
import type { PODProduct, PODPlatform } from '../../lib/pod/types';

interface PrintfulProductBrowserProps {
  platform: PODPlatform;
  products: PODProduct[];
  loading: boolean;
  error?: string | null;
  onSelect: (product: PODProduct) => void;
  onRefresh: () => void;
  selectedProductId?: string;
}

type ProductCategory = 'apparel' | 'home' | 'accessories';

function guessCategory(product: PODProduct): ProductCategory {
  const type = product.type.toLowerCase();
  if (
    ['tshirt', 'hoodie', 'sweatshirt', 'tank_top', 'leggings', 'hat'].some((t) =>
      type.includes(t),
    )
  )
    return 'apparel';
  if (['mug', 'poster', 'canvas', 'pillow', 'blanket', 'tote_bag'].some((t) =>
    type.includes(t),
  ))
    return 'home';
  return 'accessories';
}

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  apparel: 'Apparel',
  home: 'Home & Living',
  accessories: 'Accessories',
};

const CATEGORY_ICONS: Record<ProductCategory, string> = {
  apparel: '👕',
  home: '🏠',
  accessories: '🎒',
};

export const PrintfulProductBrowser: Component<
  PrintfulProductBrowserProps
> = (props) => {
  const [search, setSearch] = createSignal('');
  const [categoryFilter, setCategoryFilter] = createSignal<
    ProductCategory | 'all'
  >('all');

  const categories = createMemo(() => {
    const cats = new Set(props.products.map(guessCategory));
    return ['all' as const, ...cats];
  });

  const filtered = createMemo(() => {
    const q = search().toLowerCase();
    const cat = categoryFilter();
    return props.products.filter((p) => {
      if (cat !== 'all' && guessCategory(p) !== cat) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  });

  return (
    <div class="space-y-4">
      {/* Toolbar */}
      <div class="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search products…"
          value={search()}
          onInput={(e) => setSearch(e.currentTarget.value)}
          class="flex-1 min-w-[200px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />

        <div class="flex gap-1">
          <For each={categories()}>
            {(cat) => (
              <button
                onClick={() => setCategoryFilter(cat)}
                class={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  categoryFilter() === cat
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Show when={cat !== 'all'} fallback="All">
                  {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
                </Show>
              </button>
            )}
          </For>
        </div>

        <button
          onClick={props.onRefresh}
          disabled={props.loading}
          class="rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-600 hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          {props.loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {/* Loading */}
      <Show when={props.loading}>
        <div class="flex items-center justify-center py-12">
          <svg
            class="h-8 w-8 animate-spin text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
      </Show>

      {/* Error */}
      <Show when={props.error}>
        <div class="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {props.error}
        </div>
      </Show>

      {/* Product grid */}
      <Show when={!props.loading && !props.error}>
        <Show
          when={filtered().length > 0}
          fallback={
            <div class="py-12 text-center text-sm text-gray-500">
              No products found.
            </div>
          }
        >
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <For each={filtered()}>
              {(product) => {
                const isSelected = product.id === props.selectedProductId;
                return (
                  <button
                    onClick={() => props.onSelect(product)}
                    class={`
                      relative rounded-lg border-2 p-4 text-left transition-all hover:shadow-md
                      ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-950/30'
                          : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600'
                      }
                    `}
                  >
                    {/* Product image */}
                    <div class="aspect-square mb-3 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-700">
                      <Show
                        when={product.images[0]?.url}
                        fallback={
                          <span class="text-4xl text-gray-400">
                            {CATEGORY_ICONS[guessCategory(product)]}
                          </span>
                        }
                      >
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          class="h-full w-full rounded-md object-cover"
                        />
                      </Show>
                    </div>

                    {/* Product name */}
                    <h4 class="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {product.name}
                    </h4>

                    {/* Variants count */}
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {product.variants.length} variant
                      {product.variants.length !== 1 ? 's' : ''}
                    </p>

                    {/* Price range */}
                    <Show when={product.variants.length > 0}>
                      <p class="mt-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                        From $
                        {Math.min(
                          ...product.variants.map((v) => v.price),
                        ).toFixed(2)}
                      </p>
                    </Show>

                    {/* Selected indicator */}
                    <Show when={isSelected}>
                      <div class="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-white">
                        <svg
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="3"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </Show>
                  </button>
                );
              }}
            </For>
          </div>
        </Show>
      </Show>
    </div>
  );
};
