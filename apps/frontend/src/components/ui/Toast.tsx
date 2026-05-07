import {
  type Component,
  type JSX,
  For,
  createSignal,
  createEffect,
  onCleanup,
} from "solid-js";
import { Portal } from "solid-js/web";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
}

const TOAST_ICONS: Record<ToastType, JSX.Element> = {
  success: (
    <svg class="h-5 w-5 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg class="h-5 w-5 text-[var(--color-error)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  info: (
    <svg class="h-5 w-5 text-[var(--color-info)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg class="h-5 w-5 text-[var(--color-warning)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
};

const TOAST_BG: Record<ToastType, string> = {
  success: "border-l-4 border-[var(--color-success)]",
  error: "border-l-4 border-[var(--color-error)]",
  info: "border-l-4 border-[var(--color-info)]",
  warning: "border-l-4 border-[var(--color-warning)]",
};

// Global store
let globalAddToast: ((toast: Omit<Toast, "id">) => void) | null = null;

export function addToast(toast: Omit<Toast, "id">) {
  globalAddToast?.(toast);
}

let toastCounter = 0;

export const ToastContainer: Component = () => {
  const [toasts, setToasts] = createSignal<Toast[]>([]);

  globalAddToast = (toast: Omit<Toast, "id">) => {
    const id = `toast-${++toastCounter}`;
    const newToast: Toast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    const duration = toast.duration ?? 4000;
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  onCleanup(() => {
    globalAddToast = null;
  });

  return (
    <Portal>
      <div class="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-80">
        <For each={toasts()}>
          {(toast) => (
            <div
              class={`
                toast-enter bg-white rounded-lg shadow-lg p-4 flex items-start gap-3
                ${TOAST_BG[toast.type]}
              `}
              role="alert"
            >
              <span class="shrink-0 mt-0.5">{TOAST_ICONS[toast.type]}</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-[var(--color-text)]">
                  {toast.message}
                </p>
                {toast.description && (
                  <p class="text-xs text-[var(--color-text-secondary)] mt-0.5">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                class="shrink-0 text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] cursor-pointer"
                aria-label="Dismiss"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </For>
      </div>
    </Portal>
  );
};
