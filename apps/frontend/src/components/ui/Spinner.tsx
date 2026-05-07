import { type Component, Show } from "solid-js";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  label?: string;
}

const sizeClasses: Record<string, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-3",
};

export const Spinner: Component<SpinnerProps> = (props) => {
  const size = () => props.size ?? "md";

  return (
    <span
      class="inline-flex items-center gap-2"
      role="status"
      aria-label={props.label ?? "Loading"}
    >
      <span
        class={`
          block rounded-full border-current border-t-transparent animate-spin
          ${sizeClasses[size()]}
        `}
        style={{
          color: props.color ?? "currentColor",
        }}
      />
      <Show when={props.label}>
        <span class="text-sm text-[var(--color-text-secondary)]">
          {props.label}
        </span>
      </Show>
    </span>
  );
};

/** Full-page loading overlay */
export const PageSpinner: Component<{ label?: string }> = (props) => (
  <div class="flex items-center justify-center min-h-[60vh]">
    <Spinner size="lg" label={props.label ?? "Loading..."} />
  </div>
);
