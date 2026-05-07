/**
 * PrintifyProductBrowser — browse the Printify blueprint catalog
 * and select a blueprint (product type with print provider).
 */

import {
  Component,
  createSignal,
  createMemo,
  createResource,
  For,
  Show,
} from 'solid-js';
import type { PODProduct } from '../../lib/pod/types';
import type { PrintifyBlueprint } from '../../lib/pod/printify';
import * as api from '../../lib/api/integrations';

interface PrintifyProductBrowserProps {
  loading: boolean;
  error?: string | null;
  onSelect: (blueprint: PrintifyBlueprint) => void;
  onRefresh: () => void;
  selectedBlueprintId?: number;
}

const CATEGORY_ICONS: Record<string, string> = {
  apparel: '👕',
  'home & living': '🏠',
  accessories: '🎒',
  shoes: '👟',
  'phone cases': '📱',
  stationery: '📝',
  bags: '👜',
  drinkware: '☕',
};

export const PrintifyProductBrowser: Component<
  PrintifyProductBrowserProps
> = (props) => {
  const [search, setSearch] = createSignal('');
  const [categoryFilter, setCategoryFilter] = createSignal<string | 'all'>('all');

  const [blueprints] = createResource(async () => {
    // In production, fetch from /api/integrations/printify/blueprints
    // For now, use a stub
    const stubBlueprints: PrintifyBlueprint[] = [
      { id: 6, title: 'Unisex Softstyle T-Shirt', description: 'Classic fit', category: 'apparel', brand: 'Gildan', model: '64000', images: [] },
      { id: 9, title: 'Unisex Hoodie', description: 'Pulled hood', category: 'apparel', brand: 'Gildan', model: '18500', images: [] },
      { id: 14, title: 'Canvas Tote Bag', description: 'Heavyweight', category: 'bags', brand: 'Pringle', model: '70-0041', images: [] },
      { id: 29, title: 'White Mug', description: '11oz ceramic', category: 'drinkware', brand: 'Orca', model: 'MUG-11', images: [] },
      { id: 31, title: 'Poster', description: 'A2 glossy', category: 'home & living', brand: 'Xerox', model: 'POST-A2', images: [] },
    ];
    return stubBlueprints;
  });

  const categories = createMemo(() => {
    const bps = blueprints();
    if (!bps) return ['all'] as string[];
    const cats = new Set(bps.map((b) => b.category));
    return ['all', ...cats];
  });

  const filtered = createMemo(() => {
    const bps = blueprints();
    if (!bps) return [];
    const q = search().toLowerCase();
    const cat = categoryFilter();
    return bps.filter((b) => {
      if (cat !== 'all' && b.category !== cat) return false;
      if (q && !b.title.toLowerCase().includes(q)) return false;
      return true;
    });
  });

  return (
    <div class="space-y-4">
      {/* Toolbar */}
      <div class="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search blueprints…"
          value={search()}
          onInput={(e) => setSearch(e.currentTarget.value)}
          class="flex-1 min-w-[200px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />

        <div class="flex gap-1 overflow-x-auto">
          <For each={categories()}>
            {(cat) => (
              <button
                onClick={() => setCategoryFilter(cat)}
                class={`shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  categoryFilter() === cat
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Show when={cat !== 'all'} fallback="All">
                  {CATEGORY_ICONS[cat.toLowerCase()] ?? '📦'} {cat}
                </Show>
              </button>
            )}
          </For>
        </div>
      </div>

      {/* Loading */}
      <Show when={blueprints.loading}>
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

      {/* Grid */}
      <Show when={!blueprints.loading && !props.error}>
        <Show
          when={filtered().length > 0}
          fallback={
            <div class="py-12 text-center text-sm text-gray-500">
              No blueprints found.
            </div>
          }
        >
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <For each={filtered()}>
              {(blueprint) => {
                const isSelected = blueprint.id === props.selectedBlueprintId;
                return (
                  <button
                    onClick={() => props.onSelect(blueprint)}
                    class={`
                      relative rounded-lg border-2 p-4 text-left transition-all hover:shadow-md
                      ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-950/30'
                          : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600'
                      }
                    `}
                  >
                    <div class="mb-2 flex items-center gap-3">
                      <span class="text-2xl">
                        {CATEGORY_ICONS[blueprint.category.toLowerCase()] ?? '📦'}
                      </span>
                      <h4 class="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {blueprint.title}
                      </h4>
                    </div>

                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {blueprint.description}
                    </p>

                    <div class="mt-2 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                      <span>{blueprint.brand}</span>
                      <span>·</span>
                      <span>{blueprint.model}</span>
                    </div>

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
