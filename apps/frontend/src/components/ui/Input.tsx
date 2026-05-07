import { type Component, type JSX, splitProps, Show } from "solid-js";

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: JSX.Element;
}

export const Input: Component<InputProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "label",
    "error",
    "helperText",
    "icon",
    "class",
    "id",
  ]);

  const inputId = () => local.id || `input-${Math.random().toString(36).slice(2, 9)}`;
  const errorId = () => `${inputId()}-error`;
  const helperId = () => `${inputId()}-helper`;

  return (
    <div class="flex flex-col gap-1.5">
      <Show when={local.label}>
        <label
          for={inputId()}
          class="text-sm font-medium text-[var(--color-text)]"
        >
          {local.label}
        </label>
      </Show>

      <div class="relative">
        <Show when={local.icon}>
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[var(--color-text-tertiary)]">
            {local.icon}
          </div>
        </Show>

        <input
          id={inputId()}
          aria-invalid={!!local.error}
          aria-describedby={
            local.error ? errorId() : local.helperText ? helperId() : undefined
          }
          class={`
            w-full rounded-lg border bg-white px-3 py-2 text-sm
            text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)]
            transition-colors duration-150
            ${
              local.error
                ? "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-1 focus:ring-[var(--color-error)]"
                : "border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
            }
            ${local.icon ? "pl-10" : ""}
            ${local.class ?? ""}
          `}
          {...rest}
        />
      </div>

      <Show when={local.error}>
        <p id={errorId()} class="text-xs text-[var(--color-error)]" role="alert">
          {local.error}
        </p>
      </Show>

      <Show when={!local.error && local.helperText}>
        <p id={helperId()} class="text-xs text-[var(--color-text-tertiary)]">
          {local.helperText}
        </p>
      </Show>
    </div>
  );
};
