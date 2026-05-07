import { type Component, type JSX, splitProps } from "solid-js";

interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children?: JSX.Element;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const paddingClasses = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

export const Card: Component<CardProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "children",
    "padding",
    "hover",
    "class",
  ]);

  return (
    <div
      class={`
        bg-white rounded-xl border border-[var(--color-border)]
        ${paddingClasses[local.padding ?? "md"]}
        ${local.hover ? "card-hover cursor-pointer" : ""}
        ${local.class ?? ""}
      `}
      {...rest}
    >
      {local.children}
    </div>
  );
};

export const CardHeader: Component<{ children?: JSX.Element; class?: string }> = (
  props,
) => (
  <div
    class={`flex items-center justify-between mb-4 ${props.class ?? ""}`}
  >
    {props.children}
  </div>
);

export const CardTitle: Component<{ children?: JSX.Element }> = (props) => (
  <h3 class="text-base font-semibold text-[var(--color-text)]">
    {props.children}
  </h3>
);

export const CardBody: Component<{ children?: JSX.Element; class?: string }> = (
  props,
) => <div class={props.class ?? ""}>{props.children}</div>;

export const CardFooter: Component<{ children?: JSX.Element; class?: string }> = (
  props,
) => (
  <div
    class={`flex items-center justify-end gap-3 mt-4 pt-4 border-t border-[var(--color-border)] ${props.class ?? ""}`}
  >
    {props.children}
  </div>
);
