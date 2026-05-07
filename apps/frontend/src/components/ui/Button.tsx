import { type Component, type JSX, splitProps } from "solid-js";
import { Spinner } from "./Spinner";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: JSX.Element;
  children?: JSX.Element;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] active:bg-[var(--color-primary-dark)]",
  secondary:
    "bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface-tertiary)] hover:border-[var(--color-border-hover)]",
  ghost:
    "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-tertiary)] hover:text-[var(--color-text)]",
  danger:
    "bg-[var(--color-error)] text-white hover:bg-red-600 active:bg-red-700",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
};

export const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "variant",
    "size",
    "loading",
    "icon",
    "children",
    "disabled",
    "class",
  ]);

  const variant = () => local.variant ?? "primary";
  const size = () => local.size ?? "md";

  return (
    <button
      disabled={local.disabled || local.loading}
      class={`inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none ${variantClasses[variant()]} ${sizeClasses[size()]} ${local.class ?? ""}`}
      {...rest}
    >
      {local.loading ? (
        <Spinner size="sm" />
      ) : local.icon ? (
        <span class="shrink-0">{local.icon}</span>
      ) : null}
      {local.children && <span>{local.children}</span>}
    </button>
  );
};
