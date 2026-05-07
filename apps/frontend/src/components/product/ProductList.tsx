import { type Component, For, Show, createSignal } from 'solid-js';
import { ProductCard } from './ProductCard';
import type { Product } from '~/lib/types';

interface ProductListProps {
  products: () => Product[];
  loading: () => boolean;
  error: () => string | null;
  selectedId?: () => string | null;
  searchQuery: string;
  onSearch: (query: string) => void;
  onSelect?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onGenerate?: (id: string) => void;
  onNewProduct?: () => void;
  onRefresh?: () => void;
  showArchived?: boolean;
  onToggleArchived?: () => void;
}

export const ProductList: Component<ProductListProps> = (props) => {
  const [showFilters, setShowFilters] = createSignal(false);

  const visibleProducts = () => {
    const list = props.products();
    if (!props.showArchived) return list.filter((p) => !p.isArchived);
    return list;
  };

  return (
    <div class="space-y-6">
      {/* Search & actions bar */}
      <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div class="flex-1 w-full sm:max-w-md">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={props.searchQuery}
              onInput={(e) => props.onSearch(e.currentTarget.value)}
              class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters())}
            class={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
              showFilters()
                ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>

          <button
            onClick={props.onRefresh}
            class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>

          <button
            onClick={props.onNewProduct}
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Product
          </button>
        </div>
      </div>

      {/* Filter: archived toggle */}
      <Show when={showFilters()}>
        <div class="flex items-center gap-3">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={props.showArchived}
              onChange={props.onToggleArchived}
              class="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">Show archived</span>
          </label>
        </div>
      </Show>

      {/* Loading */}
      <Show when={props.loading()}>
        <div class="flex justify-center py-12">
          <div class="flex items-center gap-3 text-gray-500 dark:text-gray-400">
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span class="text-sm">Loading products...</span>
          </div>
        </div>
      </Show>

      {/* Error */}
      <Show when={props.error()}>
        <div class="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm text-red-700 dark:text-red-300">{props.error()}</p>
          </div>
        </div>
      </Show>

      {/* Grid */}
      <Show when={!props.loading()}>
        <Show
          when={visibleProducts().length > 0}
          fallback={
            <div class="text-center py-16">
              <svg class="mx-auto w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No products yet</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {props.searchQuery
                  ? 'No products match your search.'
                  : 'Create your first product by selecting a brand and template.'}
              </p>
              <Show when={!props.searchQuery}>
                <button
                  onClick={props.onNewProduct}
                  class="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Create Product
                </button>
              </Show>
            </div>
          }
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <For each={visibleProducts()}>
              {(product) => (
                <ProductCard
                  product={product}
                  selected={props.selectedId?.() === product.id}
                  onSelect={props.onSelect}
                  onEdit={props.onEdit}
                  onDelete={props.onDelete}
                  onGenerate={props.onGenerate}
                />
              )}
            </For>
          </div>
        </Show>
      </Show>
    </div>
  );
};
