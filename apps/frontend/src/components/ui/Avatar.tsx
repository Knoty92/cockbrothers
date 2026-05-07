import { type Component, Show, splitProps } from "solid-js";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  class?: string;
}

const sizeClasses: Record<string, string> = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-11 w-11 text-base",
  xl: "h-14 w-14 text-lg",
};

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 55%, 50%)`;
}

export const Avatar: Component<AvatarProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "src",
    "alt",
    "name",
    "size",
    "class",
  ]);

  const initials = () => (local.name ? getInitials(local.name) : "?");
  const bgColor = () =>
    local.name ? stringToColor(local.name) : "var(--color-surface-tertiary)";

  return (
    <div
      class={`
        relative inline-flex items-center justify-center rounded-full overflow-hidden
        shrink-0 font-medium text-white select-none
        ${sizeClasses[local.size ?? "md"]}
        ${local.class ?? ""}
      `}
      style={{
        "background-color": local.src ? "transparent" : bgColor(),
      }}
      aria-label={local.alt || local.name || "Avatar"}
      {...rest}
    >
      <Show
        when={local.src}
        fallback={<span>{initials()}</span>}
      >
        <img
          src={local.src}
          alt={local.alt || local.name || "Avatar"}
          class="h-full w-full object-cover"
          onError={(e) => {
            // Fallback to initials on load error
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
      </Show>
    </div>
  );
};
