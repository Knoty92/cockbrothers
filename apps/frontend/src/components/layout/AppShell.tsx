import { type Component, type JSX, createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";
import { ToastContainer } from "../ui/Toast";

interface Brand {
  id: string;
  name: string;
  primaryColor: string;
  logoUrl?: string;
}

interface User {
  name: string;
  email: string;
  avatarUrl?: string;
  tier: string;
}

interface AppShellProps {
  children?: JSX.Element;
  user?: User;
  brands?: Brand[];
  activeBrandId?: string;
  onBrandSwitch?: (brandId: string) => void;
  onAddBrand?: () => void;
  onLogout?: () => void;
  onSearch?: (query: string) => void;
  /** Hide the sidebar for auth pages etc. */
  sidebar?: boolean;
  /** Hide footer */
  footer?: boolean;
  /** Use a centered narrow container for auth/settings */
  narrow?: boolean;
}

export const AppShell: Component<AppShellProps> = (props) => {
  const [sidebarOpen, setSidebarOpen] = createSignal(true);

  const defaultBrands: Brand[] = props.brands ?? [];
  const defaultUser: User = props.user ?? {
    name: "User",
    email: "user@example.com",
    tier: "free",
  };

  return (
    <div class="min-h-screen bg-[var(--color-surface-secondary)]">
      <Show when={props.sidebar !== false}>
        <Sidebar
          brands={defaultBrands}
          activeBrandId={props.activeBrandId}
          onBrandSwitch={props.onBrandSwitch ?? (() => {})}
          onAddBrand={props.onAddBrand}
          userTier={defaultUser.tier}
        />
      </Show>

      <div
        class={`flex flex-col min-h-screen ${
          props.sidebar !== false ? "ml-[var(--sidebar-width)]" : ""
        }`}
      >
        <Show when={props.sidebar !== false}>
          <TopNav
            user={defaultUser}
            onLogout={props.onLogout}
            onSearch={props.onSearch}
          />
        </Show>

        <main
          class={`flex-1 ${
            props.narrow
              ? "max-w-lg mx-auto w-full px-4 py-8"
              : "px-6 py-6"
          }`}
        >
          {props.children}
        </main>

        <Show when={props.footer !== false && props.narrow !== true}>
          <Footer minimal />
        </Show>
      </div>

      {/* Global toast container */}
      <ToastContainer />
    </div>
  );
};
