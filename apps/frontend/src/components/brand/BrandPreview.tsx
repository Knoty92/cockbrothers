import { For, Show, createMemo } from 'solid-js';
import type { BrandFormData } from '~/lib/types/brand';

interface BrandPreviewProps {
  form: BrandFormData;
  compact?: boolean;
}

export function BrandPreview(props: BrandPreviewProps) {
  const hasContent = createMemo(
    () =>
      props.form.name ||
      props.form.logoPreview ||
      props.form.brandTagline ||
      props.form.primaryColor !== '#000000',
  );

  const contrastLuminance = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const adjust = (c: number) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return 0.2126 * adjust(r) + 0.7152 * adjust(g) + 0.0722 * adjust(b);
  };

  const textOnPrimary = createMemo(() => {
    const l = contrastLuminance(props.form.primaryColor);
    return l > 0.5 ? '#000000' : '#FFFFFF';
  });

  const textOnSecondary = createMemo(() => {
    const l = contrastLuminance(props.form.secondaryColor);
    return l > 0.5 ? '#000000' : '#FFFFFF';
  });

  return (
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
          Brand Preview
        </h3>
        <Show when={!hasContent()}>
          <span class="text-xs text-gray-400">Fill in details to see preview</span>
        </Show>
      </div>

      {/* Hero card */}
      <div
        class={`rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm ${
          props.compact ? 'max-w-sm' : ''
        }`}
      >
        {/* Colored header */}
        <div
          class="px-5 py-6 flex flex-col items-center text-center gap-3"
          style={{
            'background-color': props.form.primaryColor,
            color: textOnPrimary(),
          }}
        >
          <Show when={props.form.logoPreview}>
            <img
              src={props.form.logoPreview!}
              alt="Brand logo"
              class="h-14 w-14 object-contain rounded-lg"
              style={{
                'background-color': `${textOnPrimary()}15`,
              }}
            />
          </Show>

          <div>
            <h2
              class="text-xl font-bold"
              style={{ 'font-family': props.form.headingFont }}
            >
              {props.form.name || 'Your Brand Name'}
            </h2>
            <Show when={props.form.brandTagline}>
              <p
                class="text-sm mt-0.5 opacity-80"
                style={{ 'font-family': props.form.bodyFont }}
              >
                {props.form.brandTagline}
              </p>
            </Show>
          </div>
        </div>

        {/* Content area */}
        <div
          class="px-5 py-4 space-y-3"
          style={{
            'background-color': props.form.secondaryColor,
            color: textOnSecondary(),
          }}
        >
          <Show when={props.form.brandBio}>
            <p
              class="text-sm leading-relaxed"
              style={{ 'font-family': props.form.bodyFont }}
            >
              {props.form.brandBio}
            </p>
          </Show>

          {/* Color swatches */}
          <div class="flex gap-2">
            <div
              class="h-6 w-6 rounded-full border-2"
              style={{
                'background-color': props.form.primaryColor,
                'border-color': textOnSecondary(),
              }}
              title={`Primary: ${props.form.primaryColor}`}
            />
            <div
              class="h-6 w-6 rounded-full border-2"
              style={{
                'background-color': props.form.secondaryColor,
                'border-color': textOnSecondary(),
              }}
              title={`Secondary: ${props.form.secondaryColor}`}
            />
            <Show when={props.form.accentColor}>
              <div
                class="h-6 w-6 rounded-full border-2"
                style={{
                  'background-color': props.form.accentColor,
                  'border-color': textOnSecondary(),
                }}
                title={`Accent: ${props.form.accentColor}`}
              />
            </Show>
            <For each={props.form.colors}>
              {(c) => (
                <div
                  class="h-6 w-6 rounded-full border-2"
                  style={{
                    'background-color': c.hex,
                    'border-color': textOnSecondary(),
                  }}
                  title={`${c.name}: ${c.hex}`}
                />
              )}
            </For>
          </div>

          {/* Font sample */}
          <div class="border-t border-gray-200 dark:border-gray-600 pt-3">
            <div class="flex items-center gap-4 text-xs text-gray-500">
              <span style={{ 'font-family': props.form.headingFont }}>
                Heading: {props.form.headingFont}
              </span>
              <span style={{ 'font-family': props.form.bodyFont }}>
                Body: {props.form.bodyFont}
              </span>
            </div>
            <p
              class="mt-1 text-xs leading-relaxed opacity-60"
              style={{ 'font-family': props.form.bodyFont }}
            >
              Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu
              Vv Ww Xx Yy Zz 0123456789
            </p>
          </div>
        </div>
      </div>

      {/* Compact color bar */}
      <div class="flex h-2 rounded-full overflow-hidden">
        <div
          class="flex-1"
          style={{ 'background-color': props.form.primaryColor }}
        />
        <div
          class="flex-1"
          style={{ 'background-color': props.form.secondaryColor }}
        />
        <Show when={props.form.accentColor}>
          <div
            class="flex-1"
            style={{ 'background-color': props.form.accentColor }}
          />
        </Show>
        <For each={props.form.colors}>
          {(c) => (
            <div class="flex-1" style={{ 'background-color': c.hex }} />
          )}
        </For>
      </div>

      {/* Hex codes */}
      <div class="flex flex-wrap gap-1 text-xs font-mono text-gray-400">
        <span>{props.form.primaryColor}</span>
        <span>{props.form.secondaryColor}</span>
        <Show when={props.form.accentColor}>
          <span>{props.form.accentColor}</span>
        </Show>
      </div>
    </div>
  );
}
