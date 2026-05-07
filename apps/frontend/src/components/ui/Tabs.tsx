import {
  type Component,
  type JSX,
  For,
  createSignal,
  Show,
  splitProps,
} from "solid-js";

interface Tab {
  id: string;
  label: string;
  icon?: JSX.Element;
  disabled?: boolean;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  variant?: "underline" | "pills" | "buttons";
  class?: string;
}

export const Tabs: Component<TabsProps> = (props) => {
  const [internalActive, setInternalActive] = createSignal(
    props.activeTab || props.tabs[0]?.id || "",
  );

  const activeTab = () => props.activeTab ?? internalActive();
  const variant = () => props.variant ?? "underline";

  const handleClick = (tabId: string) => {
    if (props.onChange) {
      props.onChange(tabId);
    }
    setInternalActive(tabId);
  };

  const variantClasses = (tabId: string) => {
    const isActive = activeTab() === tabId;
    switch (variant()) {
      case "underline":
        return `
          pb-3 border-b-2 transition-colors
          ${
            isActive
              ? "border-[var(--color-primary)] text-[var(--color-primary)]"
              : "border-transparent text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]"
          }
        `;
      case "pills":
        return `
          px-4 py-2 rounded-lg transition-all
          ${
            isActive
              ? "bg-[var(--color-primary)] text-white"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-tertiary)]"
          }
        `;
      case "buttons":
        return `
          px-4 py-2 border transition-all
          ${
            isActive
              ? "bg-white border-[var(--color-primary)] text-[var(--color-primary)] z-10"
              : "bg-[var(--color-surface-tertiary)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-white"
          }
        `;
    }
  };

  return (
    <div
      class={`
        flex items-center gap-1
        ${variant() === "underline" ? "border-b border-[var(--color-border)]" : ""}
        ${variant() === "buttons" ? "-space-x-px" : ""}
        ${props.class ?? ""}
      `}
      role="tablist"
    >
      <For each={props.tabs}>
        {(tab) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab() === tab.id}
            disabled={tab.disabled}
            onClick={() => handleClick(tab.id)}
            class={`
              inline-flex items-center gap-2 text-sm font-medium cursor-pointer
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]
              ${variantClasses(tab.id)}
              ${variant() === "buttons" ? "first:rounded-l-lg last:rounded-r-lg" : ""}
            `}
          >
            <Show when={tab.icon}>
              <span class="shrink-0">{tab.icon}</span>
            </Show>
            <span>{tab.label}</span>
            <Show when={tab.count !== undefined}>
              <span
                class={`
                  inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-medium
                  ${
                    activeTab() === tab.id
                      ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                      : "bg-[var(--color-surface-tertiary)] text-[var(--color-text-tertiary)]"
                  }
                `}
              >
                {tab.count}
              </span>
            </Show>
          </button>
        )}
      </For>
    </div>
  );
};

interface TabPanelProps {
  value: string;
  activeTab: string;
  children?: JSX.Element;
}

export const TabPanel: Component<TabPanelProps> = (props) => {
  return (
    <Show when={props.value === props.activeTab}>
      <div role="tabpanel" class="pt-4">
        {props.children}
      </div>
    </Show>
  );
};
