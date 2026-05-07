import {
  type Component,
  createSignal,
  For,
  Show,
  createEffect,
  onCleanup,
} from "solid-js";

interface Brand {
  id: string;
  name: string;
  primaryColor: string;
  logoUrl?: string;
}

interface BrandSwitcherProps {
  brands: Brand[];
  activeBrandId?: string;
  onSwitch: (brandId: string) => void;
  onAddBrand?: () => void;
}

export const BrandSwitcher: Component<BrandSwitcherProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);

  const activeBrand = () =>
    props.brands.find((b) => b.id === props.activeBrandId) ?? props.brands[0];

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  const handleSelect = (brandId: string) => {
    props.onSwitch(brandId);
    close();
  };

  // Close on click outside
  createEffect(() => {
    if (!isOpen()) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-brand-switcher]")) close();
    };
    document.addEventListener("click", handler);
    onCleanup(() => document.removeEventListener("click", handler));
  });

  return (
    <div class="relative" data-brand-switcher>
      <button
        type="button"
        onClick={toggle}
        class="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium
               text-[var(--color-text)] hover:bg-[var(--color-surface-tertiary)]
               transition-colors cursor-pointer"
        aria-expanded={isOpen()}
        aria-haspopup="listbox"
      >
        <div
          class="h-5 w-5 rounded border border-[var(--color-border)] shrink-0"
          style={{ "background-color": activeBrand()?.primaryColor ?? "#6366f1" }}
        />
        <span class="truncate flex-1 text-left">
          {activeBrand()?.name ?? "No brand"}
        </span>
        <svg
          class={`h-4 w-4 text-[var(--color-text-tertiary)] transition-transform ${isOpen() ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <Show when={isOpen()}>
        <div class="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-[var(--color-border)] py-1 z-50">
          <For each={props.brands}>
            {(brand) => (
              <button
                type="button"
                role="option"
                aria-selected={brand.id === activeBrand()?.id}
                onClick={() => handleSelect(brand.id)}
                class={`
                  flex items-center gap-2 w-full px-3 py-2 text-sm text-left
                  transition-colors cursor-pointer
                  ${
                    brand.id === activeBrand()?.id
                      ? "bg-[var(--color-primary)]/5 text-[var(--color-primary)]"
                      : "text-[var(--color-text)] hover:bg-[var(--color-surface-tertiary)]"
                  }
                `}
              >
                <div
                  class="h-5 w-5 rounded border border-[var(--color-border)] shrink-0"
                  style={{
                    "background-color": brand.primaryColor,
                  }}
                />
                <span class="truncate">{brand.name}</span>
                <Show when={brand.id === activeBrand()?.id}>
                  <svg class="h-4 w-4 ml-auto shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </Show>
              </button>
            )}
          </For>

          <Show when={props.onAddBrand}>
            <div class="border-t border-[var(--color-border)] mt-1 pt-1">
              <button
                type="button"
                onClick={() => {
                  close();
                  props.onAddBrand?.();
                }}
                class="flex items-center gap-2 w-full px-3 py-2 text-sm text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-colors cursor-pointer"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add brand
              </button>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
};
