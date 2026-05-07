/**
 * Solid store for global UI state — modals, toasts, sidebar, theme.
 */

import { createStore, produce } from 'solid-js/store';

/* ─── Types ────────────────────────────────────────────────── */

export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type SidebarState = 'expanded' | 'collapsed';
export type Theme = 'light' | 'dark' | 'system';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  durationMs: number;
  createdAt: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ModalConfig {
  component: string; // unique key for the modal
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  data?: Record<string, unknown>;
  closable?: boolean;
  onClose?: () => void;
}

/* ─── State ─────────────────────────────────────────────────── */

interface UIState {
  sidebar: SidebarState;
  theme: Theme;
  activeModal: ModalConfig | null;
  toasts: Toast[];
  commandPalette: boolean;
  pageLoading: boolean;
}

const initialState: UIState = {
  sidebar: 'expanded',
  theme: 'light',
  activeModal: null,
  toasts: [],
  commandPalette: false,
  pageLoading: false,
};

/* ─── Store ─────────────────────────────────────────────────── */

function createUIStore() {
  const [state, setState] = createStore<UIState>(initialState);

  /* ─── Sidebar ──────────────────────────────────────────── */

  function toggleSidebar(): void {
    setState(
      'sidebar',
      state.sidebar === 'expanded' ? 'collapsed' : 'expanded',
    );
  }

  function setSidebar(mode: SidebarState): void {
    setState('sidebar', mode);
  }

  /* ─── Theme ────────────────────────────────────────────── */

  function setTheme(theme: Theme): void {
    setState('theme', theme);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }

  function toggleTheme(): void {
    const next: Theme =
      state.theme === 'light'
        ? 'dark'
        : state.theme === 'dark'
          ? 'system'
          : 'light';
    setTheme(next);
  }

  /* ─── Toasts ───────────────────────────────────────────── */

  function addToast(toast: Omit<Toast, 'id' | 'createdAt'>): string {
    const id = crypto.randomUUID();
    const newToast: Toast = {
      ...toast,
      id,
      createdAt: Date.now(),
    };
    setState('toasts', (prev) => [...prev, newToast]);

    // Auto-remove after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.durationMs);

    return id;
  }

  function removeToast(id: string): void {
    setState('toasts', (prev) => prev.filter((t) => t.id !== id));
  }

  function clearToasts(): void {
    setState('toasts', []);
  }

  /* Convenience helpers */
  function success(title: string, message?: string, durationMs = 4000): string {
    return addToast({ type: 'success', title, message, durationMs });
  }

  function error(title: string, message?: string, durationMs = 6000): string {
    return addToast({ type: 'error', title, message, durationMs });
  }

  function info(title: string, message?: string, durationMs = 4000): string {
    return addToast({ type: 'info', title, message, durationMs });
  }

  function warning(title: string, message?: string, durationMs = 5000): string {
    return addToast({ type: 'warning', title, message, durationMs });
  }

  /* ─── Modals ───────────────────────────────────────────── */

  function openModal(config: ModalConfig): void {
    setState('activeModal', config);
  }

  function closeModal(): void {
    const modal = state.activeModal;
    if (modal?.onClose) {
      modal.onClose();
    }
    setState('activeModal', null);
  }

  function isModalOpen(component: string): boolean {
    return state.activeModal?.component === component ?? false;
  }

  /* ─── Command Palette ──────────────────────────────────── */

  function toggleCommandPalette(): void {
    setState('commandPalette', !state.commandPalette);
  }

  function setCommandPalette(open: boolean): void {
    setState('commandPalette', open);
  }

  /* ─── Page Loading ─────────────────────────────────────── */

  function setPageLoading(loading: boolean): void {
    setState('pageLoading', loading);
  }

  /* ─── Reset ────────────────────────────────────────────── */

  function reset(): void {
    setState(initialState);
  }

  return {
    state,
    toggleSidebar,
    setSidebar,
    setTheme,
    toggleTheme,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    info,
    warning,
    openModal,
    closeModal,
    isModalOpen,
    toggleCommandPalette,
    setCommandPalette,
    setPageLoading,
    reset,
  };
}

export const uiStore = createUIStore();
