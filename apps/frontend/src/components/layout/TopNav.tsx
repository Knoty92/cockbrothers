import { type Component, createSignal, Show, For, createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import { Avatar } from "../ui/Avatar";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface User {
  name: string;
  email: string;
  avatarUrl?: string;
  tier: string;
}

interface TopNavProps {
  user?: User;
  onLogout?: () => void;
  onSearch?: (query: string) => void;
}

function getBreadcrumbs(pathname: string): Breadcrumb[] {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: Breadcrumb[] = [{ label: "Home", href: "/" }];

  let accumulated = "";
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    accumulated += `/${seg}`;

    // Skip dynamic IDs and index
    if (seg.startsWith("[")) continue;

    const label = seg
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    crumbs.push({
      label,
      href: i < segments.length - 1 ? accumulated : undefined,
    });
  }

  return crumbs;
}

export const TopNav: Component<TopNavProps> = (props) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = createSignal("");
  const [userMenuOpen, setUserMenuOpen] = createSignal(false);
  const [searchFocused, setSearchFocused] = createSignal(false);

  const breadcrumbs = () => getBreadcrumbs(location.pathname);

  // Close user menu on click outside
  createEffect(() => {
    if (!userMenuOpen()) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-user-menu]")) setUserMenuOpen(false);
    };
    document.addEventListener("click", handler);
    onCleanup(() => document.removeEventListener("click", handler));
  });

  // Ctrl+K / ⌘K focus search
  createEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("topnav-search")?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    onCleanup(() => document.removeEventListener("keydown", handler));
  });

  const handleSearch = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setSearchQuery(target.value);
    props.onSearch?.(target.value);
  };

  return (
    <header class="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-[var(--color-border)]">
      <div class="flex items-center justify-between h-[var(--topnav-height)] px-6 gap-4">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" class="flex items-center gap-1.5 text-sm min-w-0">
          <For each={breadcrumbs()}>
            {(crumb, index) => (
              <>
                <Show when={index() > 0}>
                  <svg class="h-4 w-4 text-[var(--color-text-tertiary)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Show>
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    class="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors truncate"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span class="text-[var(--color-text)] font-medium truncate">
                    {crumb.label}
                  </span>
                )}
              </>
            )}
          </For>
        </nav>

        <div class="flex items-center gap-3">
          {/* Search */}
          <div class="relative hidden md:block">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[var(--color-text-tertiary)]">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="topnav-search"
              type="text"
              value={searchQuery()}
              onInput={handleSearch}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search... (⌘K)"
              class={`
                w-64 rounded-lg border bg-[var(--color-surface-tertiary)] pl-9 pr-3 py-1.5 text-sm
                text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)]
                transition-all duration-150
                ${searchFocused() ? "border-[var(--color-primary)] bg-white w-80" : "border-transparent"}
              `}
            />
          </div>

          {/* Notification bell */}
          <button
            type="button"
            class="relative p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-tertiary)] transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[var(--color-error)]" />
          </button>

          {/* User Menu */}
          <div class="relative" data-user-menu>
            <button
              type="button"
              onClick={() => setUserMenuOpen((prev) => !prev)}
              class="flex items-center gap-2 p-1 rounded-lg hover:bg-[var(--color-surface-tertiary)] transition-colors cursor-pointer"
              aria-expanded={userMenuOpen()}
              aria-haspopup="true"
            >
              <Avatar
                src={props.user?.avatarUrl}
                name={props.user?.name}
                size="sm"
              />
              <Show when={props.user}>
                <div class="hidden lg:block text-left">
                  <p class="text-sm font-medium text-[var(--color-text)] leading-tight">
                    {props.user!.name}
                  </p>
                  <p class="text-xs text-[var(--color-text-tertiary)] capitalize">
                    {props.user!.tier} plan
                  </p>
                </div>
              </Show>
            </button>

            <Show when={userMenuOpen()}>
              <div class="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-[var(--color-border)] py-1 z-50">
                <div class="px-4 py-2 border-b border-[var(--color-border)]">
                  <p class="text-sm font-medium text-[var(--color-text)]">
                    {props.user?.name ?? "User"}
                  </p>
                  <p class="text-xs text-[var(--color-text-tertiary)]">
                    {props.user?.email}
                  </p>
                </div>

                <a
                  href="/dashboard/settings"
                  class="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-tertiary)] hover:text-[var(--color-text)] transition-colors"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile Settings
                </a>

                <a
                  href="/dashboard/settings/billing"
                  class="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-tertiary)] hover:text-[var(--color-text)] transition-colors"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Billing
                </a>

                <Show when={props.onLogout}>
                  <div class="border-t border-[var(--color-border)] mt-1 pt-1">
                    <button
                      type="button"
                      onClick={props.onLogout}
                      class="flex items-center gap-2 w-full px-4 py-2 text-sm text-[var(--color-error)] hover:bg-[var(--color-error-bg)] transition-colors cursor-pointer"
                    >
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                </Show>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </header>
  );
};
