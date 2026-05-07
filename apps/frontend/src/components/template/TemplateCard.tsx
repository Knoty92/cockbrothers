import { type Component, Show } from 'solid-js';
import type { Template } from '~/lib/types';

interface TemplateCardProps {
  template: Template;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
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

export const TemplateCard: Component<TemplateCardProps> = (props) => {
  const handleClick = () => {
    props.onSelect?.(props.template.id);
  };

  const handleEdit = (e: MouseEvent) => {
    e.stopPropagation();
    props.onEdit?.(props.template.id);
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    props.onDelete?.(props.template.id);
  };

  return (
    <div
      class={`group relative rounded-xl border-2 bg-white dark:bg-gray-900 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
        props.selected
          ? 'border-indigo-500 ring-2 ring-indigo-500/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* Preview area */}
      <div class="aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-t-xl flex items-center justify-center overflow-hidden">
        <Show
          when={props.template.previewUrl}
          fallback={
            <div class="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
              <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-xs font-medium">{productTypeLabels[props.template.productType] ?? props.template.productType}</span>
            </div>
          }
        >
          <img
            src={props.template.previewUrl!}
            alt={props.template.name}
            class="w-full h-full object-cover"
          />
        </Show>
      </div>

      {/* Info area */}
      <div class="p-3 space-y-1">
        <div class="flex items-start justify-between gap-2">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
            {props.template.name}
          </h3>
          <Show when={props.template.isSystem}>
            <span class="shrink-0 inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 px-2 py-0.5 text-[10px] font-medium text-indigo-700 dark:text-indigo-300">
              System
            </span>
          </Show>
        </div>

        <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
          {props.template.description ?? 'No description'}
        </p>

        <div class="flex items-center justify-between pt-1">
          <span class="text-[11px] text-gray-400 dark:text-gray-500">
            {productTypeLabels[props.template.productType] ?? props.template.productType}
          </span>
          <Show when={props.template.usageCount > 0}>
            <span class="text-[11px] text-gray-400 dark:text-gray-500">
              Used {props.template.usageCount}x
            </span>
          </Show>
        </div>
      </div>

      {/* Actions overlay */}
      <div class="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Show when={!props.template.isSystem}>
          <button
            onClick={handleEdit}
            class="p-1.5 rounded-lg bg-white/90 dark:bg-gray-800/90 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
            title="Edit template"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </Show>
        <button
          onClick={handleDelete}
          class="p-1.5 rounded-lg bg-white/90 dark:bg-gray-800/90 shadow-sm hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          title="Delete template"
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
