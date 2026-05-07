import { createSignal, createMemo, For, Show } from 'solid-js';
import type { Brand } from '~/lib/types/brand';
import { BrandCard } from './BrandCard';

interface BrandListProps {
  brands: Brand[];
  loading?: boolean;
  error?: string | null;
  onSelectBrand?: (brand: Brand) => void;
  onDeleteBrand?: (brand: Brand) => void;
  onDuplicateBrand?: (brand: Brand) => void;
  onCreateNew?: () => void;
}

type SortMode = 'updated' | 'name' | 'score' | 'products';

export function BrandList(props: BrandListProps) {
  const [search, setSearch] = createSignal('');
  const [sortMode, setSortMode] = createSignal<SortMode>('updated');

  const filteredBrands = createMemo(() => {
    let list = [...props.brands];

    // Filter
    const q = search().toLowerCase();
    if (q) {
      list = list.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.description?.toLowerCase().includes(q) ||
          b.brandTagline?.toLowerCase().includes(q),
      );
    }

    // Sort
    switch (sortMode()) {
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'score':
        list.sort((a, b) => b.brandScore - a.brandScore);
        break;
      case 'products':
        list.sort((a, b) => b.productsCount - a.productsCount);
        break;
      case 'updated':
      default:
        list.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
        break;
    }

    return list;
  });

  const SORT_OPTIONS: { value: SortMode; label: string }[] = [
    { value: 'updated', label: 'Last updated' },
    { value: 'name', label: 'Name' },
    { value: 'score', label: 'Consistency score' },
    { value: 'products', label: 'Product count' },
  ];

  return (
    <div class="space-y-4">
      {/* Toolbar */}
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Search */}
        <div class="relative flex-1 w-full">
          <svg
            class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width={2}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={search()}
            onInput={(e) => setSearch(e.currentTarget.value)}
            placeholder="Search brands…"
            class="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 pl-9 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
          />
        </div>

        {/* Sort */}
        <select
          value={sortMode()}
          onChange={(e) => setSortMode(e.currentTarget.value as SortMode)}
          class="rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
        >
          <For each={SORT_OPTIONS}>
            {(opt) => <option value={opt.value}>{opt.label}</option>}
          </For>
        </select>

        {/* Create button */}
        <Show when={props.onCreateNew}>
          <button
            type="button"
            onClick={props.onCreateNew}
            class="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create brand
          </button>
        </Show>
      </div>

      {/* Loading state */}
      <Show when={props.loading}>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <For each={[1, 2, 3]}>
            {() => (
              <div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 animate-pulse space-y-3">
                <div class="h-2 w-full rounded bg-gray-100 dark:bg-gray-700" />
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 rounded-xl bg-gray-100 dark:bg-gray-700" />
                  <div class="space-y-1.5 flex-1">
                    <div class="h-4 w-3/4 rounded bg-gray-100 dark:bg-gray-700" />
                    <div class="h-3 w-1/2 rounded bg-gray-100 dark:bg-gray-700" />
                  </div>
                </div>
                <div class="h-3 w-full rounded bg-gray-100 dark:bg-gray-700" />
                <div class="h-3 w-2/3 rounded bg-gray-100 dark:bg-gray-700" />
              </div>
            )}
          </For>
        </div>
      </Show>

      {/* Error banner */}
      <Show when={props.error}>
        <div class="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 px-4 py-3">
          <div class="flex items-center gap-2">
            <svg class="h-4 w-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm text-red-700 dark:text-red-400">{props.error}</p>
          </div>
        </div>
      </Show>

      {/* Empty state */}
      <Show when={!props.loading && filteredBrands().length === 0}>
        <div class="flex flex-col items-center justify-center py-12 text-center">
          <div class="h-16 w-16 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4">
            <svg class="h-8 w-8 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.5}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {search() ? 'No brands found' : 'No brands yet'}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-4">
            {search()
              ? `No brands match "${search()}". Try a different search.`
              : 'Create your first brand kit to start generating mockups.'}
          </p>
          <Show when={!search() && props.onCreateNew}>
            <button
              type="button"
              onClick={props.onCreateNew}
              class="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Create your first brand
            </button>
          </Show>
        </div>
      </Show>

      {/* Brand grid */}
      <Show when={!props.loading && filteredBrands().length > 0}>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <For each={filteredBrands()}>
            {(brand) => (
              <BrandCard
                brand={brand}
                onSelect={props.onSelectBrand}
                onDelete={props.onDeleteBrand}
                onDuplicate={props.onDuplicateBrand}
              />
            )}
          </For>
        </div>

        {/* Summary */}
        <p class="text-xs text-gray-400 text-center">
          {filteredBrands().length} of {props.brands.length} brand
          {props.brands.length !== 1 ? 's' : ''}
        </p>
      </Show>
    </div>
  );
}
