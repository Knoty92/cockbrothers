import { type Component, type JSX, Show, splitProps } from "solid-js";

type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  children?: JSX.Element;
  class?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--color-surface-tertiary)] text-[var(--color-text-secondary)]",
  primary:
    "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  success:
    "bg-[var(--color-success-bg)] text-[var(--color-success)]",
  warning:
    "bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
  danger: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
  info: "bg-[var(--color-info-bg)] text-[var(--color-info)]",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
};

export const Badge: Component<BadgeProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "variant",
    "size",
    "dot",
    "removable",
    "onRemove",
    "children",
    "class",
  ]);

  return (
    <span
      class={`
        inline-flex items-center gap-1.5 font-medium rounded-full
        ${variantClasses[local.variant ?? "default"]}
        ${sizeClasses[local.size ?? "md"]}
        ${local.class ?? ""}
      `}
      {...rest}
    >
      <Show when={local.dot}>
        <span
          class="h-1.5 w-1.5 rounded-full"
          style={{
            "background-color": "currentColor",
          }}
        />
      </Show>
      {local.children}
      <Show when={local.removable}>
        <button
          type="button"
          onClick={local.onRemove}
          class="ml-0.5 hover:opacity-70 cursor-pointer"
          aria-label="Remove"
        >
          <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </Show>
    </span>
  );
};
