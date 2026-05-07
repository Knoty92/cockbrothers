import {
  type Component,
  createSignal,
  For,
  Show,
  splitProps,
} from "solid-js";

const DEFAULT_SWATCHES = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#ef4444",
  "#f59e0b",
  "#22c55e",
  "#14b8a6",
  "#3b82f6",
  "#0f172a",
  "#475569",
  "#94a3b8",
  "#f8fafc",
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  swatches?: string[];
}

function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

export const ColorPicker: Component<ColorPickerProps> = (props) => {
  const [inputValue, setInputValue] = createSignal(props.value);
  const [error, setError] = createSignal<string | null>(null);

  const swatches = () => props.swatches ?? DEFAULT_SWATCHES;

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const val = target.value;
    setInputValue(val);

    if (isValidHex(val)) {
      setError(null);
      props.onChange(val);
    } else if (val.length === 7) {
      setError("Invalid hex color");
    } else {
      setError(null);
    }
  };

  const handleSwatchClick = (color: string) => {
    setInputValue(color);
    setError(null);
    props.onChange(color);
  };

  return (
    <div class="flex flex-col gap-2">
      <Show when={props.label}>
        <label class="text-sm font-medium text-[var(--color-text)]">
          {props.label}
        </label>
      </Show>

      <div class="flex items-center gap-2">
        <div
          class="h-9 w-9 shrink-0 rounded-lg border border-[var(--color-border)]"
          style={{ "background-color": isValidHex(inputValue()) ? inputValue() : "#ffffff" }}
        />
        <div class="relative flex-1">
          <input
            type="text"
            value={inputValue()}
            onInput={handleInputChange}
            placeholder="#000000"
            maxLength={7}
            class={`
              w-full rounded-lg border bg-white px-3 py-2 pl-9 text-sm font-mono
              text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)]
              transition-colors duration-150
              ${
                error()
                  ? "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-1 focus:ring-[var(--color-error)]"
                  : "border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
              }
            `}
          />
        </div>
        <input
          type="color"
          value={isValidHex(inputValue()) ? inputValue() : "#6366f1"}
          onInput={(e) => handleSwatchClick(e.target.value)}
          class="h-9 w-9 cursor-pointer rounded-lg border border-[var(--color-border)] bg-transparent p-0.5"
        />
      </div>

      <Show when={error()}>
        <p class="text-xs text-[var(--color-error)]" role="alert">
          {error()}
        </p>
      </Show>

      {/* Swatches */}
      <div class="flex flex-wrap gap-1.5">
        <For each={swatches()}>
          {(swatch) => (
            <button
              type="button"
              onClick={() => handleSwatchClick(swatch)}
              class={`
                h-6 w-6 rounded-md border-2 cursor-pointer transition-transform hover:scale-110
                ${
                  inputValue().toLowerCase() === swatch.toLowerCase()
                    ? "border-[var(--color-primary)] scale-110"
                    : "border-transparent"
                }
              `}
              style={{ "background-color": swatch }}
              aria-label={`Select color ${swatch}`}
            />
          )}
        </For>
      </div>
    </div>
  );
};
