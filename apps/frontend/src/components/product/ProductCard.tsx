import { type Component, Show } from 'solid-js';
import type { Product } from '~/lib/types';

interface ProductCardProps {
  product: Product;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onGenerate?: (id: string) => void;
}

export const ProductCard: Component<ProductCardProps> = (props) => {
  const handleClick = () => props.onSelect?.(props.product.id);

  const handleEdit = (e: MouseEvent) => {
    e.stopPropagation();
    props.onEdit?.(props.product.id);
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    props.onDelete?.(props.product.id);
  };

  const handleGenerate = (e: MouseEvent) => {
    e.stopPropagation();
    props.onGenerate?.(props.product.id);
  };

  const mockupCount = () => props.product.mockupUrls?.length ?? 0;
  const firstMockupUrl = () => props.product.thumbnailUrl || props.product.mockupUrls?.[0]?.url;

  return (
    <div
      class={`group relative rounded-xl border-2 bg-white dark:bg-gray-900 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
        props.selected
          ? 'border-indigo-500 ring-2 ring-indigo-500/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
      } ${props.product.isArchived ? 'opacity-60' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* Thumbnail */}
      <div class="aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-t-xl flex items-center justify-center overflow-hidden">
        <Show
          when={firstMockupUrl()}
          fallback={
            <div class="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
              <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-xs">No mockups yet</span>
            </div>
          }
        >
          <img
            src={firstMockupUrl()}
            alt={props.product.name}
            class="w-full h-full object-cover"
          />
        </Show>
      </div>

      {/* Info */}
      <div class="p-3 space-y-1">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
          {props.product.name}
        </h3>

        <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span class="inline-flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {mockupCount()} mockups
          </span>
          <Show when={props.product.brandScore > 0}>
            <span class="inline-flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {props.product.brandScore}/100
            </span>
          </Show>
        </div>

        <Show when={props.product.isArchived}>
          <span class="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-[10px] font-medium text-gray-500 dark:text-gray-400">
            Archived
          </span>
        </Show>
      </div>

      {/* Actions overlay */}
      <div class="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleGenerate}
          class="p-1.5 rounded-lg bg-white/90 dark:bg-gray-800/90 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
          title="Generate mockups"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        <button
          onClick={handleEdit}
          class="p-1.5 rounded-lg bg-white/90 dark:bg-gray-800/90 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
          title="Edit product"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          class="p-1.5 rounded-lg bg-white/90 dark:bg-gray-800/90 shadow-sm hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          title="Delete product"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};
