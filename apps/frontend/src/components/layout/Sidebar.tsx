import { type Component, For, Show, type JSX } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import { BrandSwitcher } from "./BrandSwitcher";

interface NavItem {
  label: string;
  href: string;
  icon: JSX.Element;
  badge?: string;
}

interface Brand {
  id: string;
  name: string;
  primaryColor: string;
  logoUrl?: string;
}

interface SidebarProps {
  brands: Brand[];
  activeBrandId?: string;
  onBrandSwitch: (brandId: string) => void;
  onAddBrand?: () => void;
  userTier: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "Brands",
    href: "/dashboard/brands",
    icon: (
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    label: "Templates",
    href: "/dashboard/templates",
    icon: (
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    label: "Products",
    href: "/dashboard/products",
    icon: (
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    label: "Mockups",
    href: "/dashboard/mockups",
    icon: (
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Integrations",
    href: "/dashboard/integrations",
    icon: (
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: (
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: (
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const TIER_LABELS: Record<string, string> = {
  free: "Free",
  starter: "Starter",
  pro: "Pro",
  agency: "Agency",
  enterprise: "Enterprise",
};

export const Sidebar: Component<SidebarProps> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href: string) => {
    if (href === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(href);
  };

  return (
    <aside class="fixed left-0 top-0 bottom-0 w-[var(--sidebar-width)] bg-white border-r border-[var(--color-border)] flex flex-col z-40">
      {/* Logo */}
      <div class="flex items-center gap-2 px-5 h-[var(--topnav-height)] border-b border-[var(--color-border)]">
        <span class="text-xl">🍆</span>
        <span class="font-bold text-lg text-[var(--color-text)]">Cockbrothers</span>
      </div>

      {/* Brand Switcher */}
      <div class="px-3 pt-3 pb-2">
        <BrandSwitcher
          brands={props.brands}
          activeBrandId={props.activeBrandId}
          onSwitch={props.onBrandSwitch}
          onAddBrand={props.onAddBrand}
        />
      </div>

      {/* Navigation */}
      <nav class="flex-1 overflow-y-auto px-3 py-2">
        <For each={NAV_ITEMS}>
          {(item) => (
            <button
              type="button"
              onClick={() => navigate(item.href)}
              class={`
                flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium
                transition-colors mb-0.5 cursor-pointer
                ${
                  isActive(item.href)
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-tertiary)]"
                }
              `}
            >
              <span class="shrink-0">{item.icon}</span>
              <span class="truncate">{item.label}</span>
              <Show when={item.badge}>
                <span class="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  {item.badge}
                </span>
              </Show>
            </button>
          )}
        </For>
      </nav>

      {/* Upgrade CTA */}
      <Show when={props.userTier === "free"}>
        <div class="p-3 border-t border-[var(--color-border)]">
          <button
            type="button"
            onClick={() => navigate("/pricing")}
            class="w-full px-4 py-2.5 rounded-lg text-sm font-medium text-white
                   bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]
                   hover:opacity-90 transition-opacity cursor-pointer"
          >
            Upgrade to Pro
          </button>
          <p class="text-xs text-[var(--color-text-tertiary)] text-center mt-1.5">
            Unlock unlimited brands & mockups
          </p>
        </div>
      </Show>
    </aside>
  );
};
