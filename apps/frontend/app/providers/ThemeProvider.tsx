import {
  createContext,
  useContext,
  createSignal,
  createEffect,
  onMount,
  type JSX,
  type Accessor,
} from "solid-js";

// ==========================================
// Types
// ==========================================

export type Theme = "light" | "dark" | "system";

export interface ThemeContextValue {
  theme: Accessor<Theme>;
  resolvedTheme: Accessor<"light" | "dark">;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// ==========================================
// Context
// ==========================================

const ThemeContext = createContext<ThemeContextValue>();

// ==========================================
// Storage key
// ==========================================

const STORAGE_KEY = "cockbrothers-theme";

// ==========================================
// Provider
// ==========================================

export function ThemeProvider(props: { children: JSX.Element }) {
  const [theme, setThemeState] = createSignal<Theme>(
    getInitialTheme(),
  );

  const [resolvedTheme, setResolvedTheme] = createSignal<"light" | "dark">(
    resolveTheme(getInitialTheme()),
  );

  // Get initial theme from localStorage or system preference
  function getInitialTheme(): Theme {
    if (typeof window === "undefined") return "system";

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark" || stored === "system") {
        return stored;
      }
    } catch {
      // localStorage not available
    }

    return "system";
  }

  // Resolve "system" to actual light/dark
  function resolveTheme(t: Theme): "light" | "dark" {
    if (t !== "system") return t;

    if (typeof window === "undefined") return "dark";

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // Apply theme class to document
  function applyTheme(t: "light" | "dark") {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(t);
    root.style.colorScheme = t;

    // Update meta theme-color
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute(
        "content",
        t === "dark" ? "#0f172a" : "#ffffff",
      );
    }
  }

  // Set theme
  function setTheme(t: Theme) {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // ignore
    }

    const resolved = resolveTheme(t);
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }

  // Toggle between light and dark
  function toggleTheme() {
    const next = resolvedTheme() === "dark" ? "light" : "dark";
    setTheme(next);
  }

  // Listen for system preference changes
  createEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = () => {
      if (theme() === "system") {
        const resolved = resolveTheme("system");
        setResolvedTheme(resolved);
        applyTheme(resolved);
      }
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  });

  // Apply theme on mount
  onMount(() => {
    applyTheme(resolvedTheme());
  });

  const value: ThemeContextValue = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

// ==========================================
// Hook
// ==========================================

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
