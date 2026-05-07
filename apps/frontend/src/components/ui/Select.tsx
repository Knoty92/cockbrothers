import {
  type Component,
  type JSX,
  splitProps,
  Show,
  For,
} from "solid-js";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps
  extends JSX.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select: Component<SelectProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "label",
    "error",
    "helperText",
    "options",
    "placeholder",
    "class",
    "id",
  ]);

  const selectId = () =>
    local.id || `select-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div class="flex flex-col gap-1.5">
      <Show when={local.label}>
        <label
          for={selectId()}
          class="text-sm font-medium text-[var(--color-text)]"
        >
          {local.label}
        </label>
      </Show>

      <div class="relative">
        <select
          id={selectId()}
          aria-invalid={!!local.error}
          class={`
            w-full rounded-lg border bg-white px-3 py-2 pr-8 text-sm appearance-none
            text-[var(--color-text)]
            transition-colors duration-150
            ${
              local.error
                ? "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-1 focus:ring-[var(--color-error)]"
                : "border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
            }
            ${local.class ?? ""}
          `}
          {...rest}
        >
          <Show when={local.placeholder}>
            <option value="" disabled selected>
              {local.placeholder}
            </option>
          </Show>
          <For each={local.options}>
            {(option) => (
              <option value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            )}
          </For>
        </select>

        {/* Chevron icon */}
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[var(--color-text-tertiary)]">
          <svg
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <Show when={local.error}>
        <p class="text-xs text-[var(--color-error)]" role="alert">
          {local.error}
        </p>
      </Show>

      <Show when={!local.error && local.helperText}>
        <p class="text-xs text-[var(--color-text-tertiary)]">
          {local.helperText}
        </p>
      </Show>
    </div>
  );
};
