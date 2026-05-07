import {
  type Component,
  type JSX,
  Show,
  createEffect,
  onCleanup,
  createSignal,
} from "solid-js";
import { Portal } from "solid-js/web";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: JSX.Element;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
}

const sizeClasses: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-[90vw] w-full",
};

export const Modal: Component<ModalProps> = (props) => {
  const [visible, setVisible] = createSignal(false);

  createEffect(() => {
    if (props.isOpen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Delay removal for exit animation
      setTimeout(() => setVisible(false), 200);
    }
  });

  onCleanup(() => {
    document.body.style.overflow = "";
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && props.isOpen) {
      props.onClose();
    }
  };

  // Global keyboard listener
  createEffect(() => {
    if (props.isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    onCleanup(() => {
      document.removeEventListener("keydown", handleKeyDown);
    });
  });

  return (
    <Show when={visible()}>
      <Portal>
        <div
          class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/40 transition-opacity"
          style={{
            opacity: props.isOpen ? 1 : 0,
            transition: "opacity 200ms ease",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) props.onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={props.title || "Dialog"}
        >
          <div
            class={`
              relative w-full bg-white rounded-xl shadow-2xl
              ${sizeClasses[props.size ?? "md"]}
              ${props.isOpen ? "toast-enter" : "toast-exit"}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <Show when={props.title || props.showCloseButton}>
              <div class="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
                <Show when={props.title}>
                  <h2 class="text-lg font-semibold text-[var(--color-text)]">
                    {props.title}
                  </h2>
                </Show>
                <Show when={props.showCloseButton ?? true}>
                  <button
                    type="button"
                    onClick={props.onClose}
                    class="rounded-lg p-1.5 text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-tertiary)] transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <svg
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </Show>
              </div>
            </Show>

            {/* Body */}
            <div class="px-6 py-4 max-h-[70vh] overflow-y-auto">
              {props.children}
            </div>
          </div>
        </div>
      </Portal>
    </Show>
  );
};
