import { Show } from 'solid-js';
import type { Brand } from '~/lib/types/brand';
import { BrandScoreIndicator } from './BrandScoreIndicator';

interface BrandCardProps {
  brand: Brand;
  onSelect?: (brand: Brand) => void;
  onDelete?: (brand: Brand) => void;
  onDuplicate?: (brand: Brand) => void;
}

export function BrandCard(props: BrandCardProps) {
  const { brand } = props;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const textOnPrimary = () => {
    const hex = brand.primaryColor;
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  return (
    <div
      class="group relative rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
      onClick={() => props.onSelect?.(brand)}
    >
      {/* Color stripe */}
      <div class="h-2 w-full flex">
        <div class="flex-1" style={{ 'background-color': brand.primaryColor }} />
        <div class="flex-1" style={{ 'background-color': brand.secondaryColor }} />
        <Show when={brand.accentColor}>
          <div class="flex-1" style={{ 'background-color': brand.accentColor! }} />
        </Show>
      </div>

      <div class="p-4 space-y-3">
        {/* Logo + name */}
        <div class="flex items-center gap-3">
          <Show
            when={brand.logoThumbnail || brand.logoUrl}
            fallback={
              <div
                class="h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                style={{
                  'background-color': brand.primaryColor,
                  color: textOnPrimary(),
                }}
              >
                {brand.name.charAt(0).toUpperCase()}
              </div>
            }
          >
            <img
              src={brand.logoThumbnail ?? brand.logoUrl!}
              alt={`${brand.name} logo`}
              class="h-10 w-10 rounded-xl object-contain border border-gray-100 dark:border-gray-700"
            />
          </Show>

          <div class="min-w-0 flex-1">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
              {brand.name}
            </h3>
            <p class="text-xs text-gray-400 truncate">
              {brand.productsCount} products · {brand.mockupsCount} mockups
            </p>
          </div>

          {/* Score */}
          <Show when={brand.brandScore > 0}>
            <div class="shrink-0">
              <BrandScoreIndicator score={brand.brandScore} size="sm" showLabel={false} />
            </div>
          </Show>
        </div>

        {/* Description */}
        <Show when={brand.description}>
          <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {brand.description}
          </p>
        </Show>

        {/* Fonts */}
        <div class="flex items-center gap-3 text-[10px] text-gray-400">
          <span class="truncate max-w-[100px]" style={{ 'font-family': brand.headingFont }}>
            {brand.headingFont}
          </span>
          <span class="text-gray-300 dark:text-gray-600">+</span>
          <span class="truncate max-w-[100px]" style={{ 'font-family': brand.bodyFont }}>
            {brand.bodyFont}
          </span>
        </div>

        {/* Meta */}
        <div class="flex items-center justify-between pt-1">
          <span class="text-[10px] text-gray-400">
            Updated {formatDate(brand.updatedAt)}
          </span>

          <Show when={brand.aiGenerated}>
            <span class="inline-flex items-center gap-0.5 rounded-full bg-purple-50 dark:bg-purple-950/50 px-2 py-0.5 text-[10px] font-medium text-purple-600 dark:text-purple-400">
              <svg class="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
              AI
            </span>
          </Show>
        </div>
      </div>

      {/* Hover actions */}
      <div class="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Show when={props.onDuplicate}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              props.onDuplicate?.(brand);
            }}
            class="rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title="Duplicate brand"
          >
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </Show>

        <Show when={props.onDelete}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              props.onDelete?.(brand);
            }}
            class="rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 p-1.5 text-gray-400 hover:text-red-500 transition-colors"
            title="Delete brand"
          >
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </Show>
      </div>
    </div>
  );
}
