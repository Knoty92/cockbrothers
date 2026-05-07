import { type Component, For, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { AppShell } from "../../../components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardBody } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Spinner } from "../../../components/ui/Spinner";

interface Mockup {
  id: string;
  name: string;
  brand: string;
  product: string;
  status: "ready" | "generating" | "failed";
  thumbnail?: string;
  createdAt: string;
}

const MOCKUPS: Mockup[] = [
  {
    id: "1",
    name: "Front View",
    brand: "Beach Club",
    product: "Summer Vibes T-Shirt",
    status: "ready",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    name: "Back View",
    brand: "Beach Club",
    product: "Summer Vibes T-Shirt",
    status: "ready",
    createdAt: "2 hours ago",
  },
  {
    id: "3",
    name: "White Mug - Side",
    brand: "Urban Wear",
    product: "Classic Logo Mug",
    status: "generating",
    createdAt: "30 min ago",
  },
  {
    id: "4",
    name: "Poster - A3",
    brand: "Urban Wear",
    product: "Minimal Poster",
    status: "failed",
    createdAt: "1 day ago",
  },
  {
    id: "5",
    name: "Hoodie Front",
    brand: "Beach Club",
    product: "Summer Hoodie",
    status: "ready",
    createdAt: "3 hours ago",
  },
  {
    id: "6",
    name: "Tote Bag",
    brand: "Urban Wear",
    product: "Canvas Tote",
    status: "ready",
    createdAt: "5 hours ago",
  },
];

export default function MockupsPage() {
  const [filter, setFilter] = createSignal<string>("all");

  const filteredMockups = () => {
    if (filter() === "all") return MOCKUPS;
    return MOCKUPS.filter((m) => m.status === filter());
  };

  return (
    <AppShell
      user={{
        name: "Knoty",
        email: "knoty@example.com",
        tier: "free",
      }}
      brands={[
        { id: "1", name: "Beach Club", primaryColor: "#06b6d4" },
        { id: "2", name: "Urban Wear", primaryColor: "#8b5cf6" },
      ]}
      activeBrandId="1"
    >
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-[var(--color-text)]">Mockups</h1>
          <p class="text-sm text-[var(--color-text-secondary)] mt-1">
            View and manage your generated product mockups.
          </p>
        </div>
        <A href="/dashboard/products/new">
          <Button icon={
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          }>
            New Mockup
          </Button>
        </A>
      </div>

      {/* Filters */}
      <div class="flex items-center gap-2 mb-6">
        {["all", "ready", "generating", "failed"].map((f) => (
          <button
            type="button"
            onClick={() => setFilter(f)}
            class={`
              px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer capitalize
              ${
                filter() === f
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-surface-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              }
            `}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Mockup grid */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <For each={filteredMockups()}>
          {(mockup) => (
            <Card hover>
              <CardBody>
                {/* Thumbnail */}
                <div
                  class={`
                    aspect-[4/3] rounded-lg mb-3 flex items-center justify-center border border-[var(--color-border)]
                    ${
                      mockup.status === "generating"
                        ? "bg-[var(--color-surface-tertiary)]"
                        : mockup.status === "failed"
                          ? "bg-[var(--color-error-bg)]"
                          : "bg-gradient-to-br from-[var(--color-surface-secondary)] to-[var(--color-surface-tertiary)]"
                    }
                  `}
                >
                  {mockup.status === "generating" ? (
                    <Spinner size="md" />
                  ) : mockup.status === "failed" ? (
                    <span class="text-3xl">⚠️</span>
                  ) : (
                    <span class="text-4xl">👕</span>
                  )}
                </div>

                <div class="flex items-start justify-between mb-2">
                  <div>
                    <p class="text-sm font-medium text-[var(--color-text)]">
                      {mockup.name}
                    </p>
                    <p class="text-xs text-[var(--color-text-tertiary)]">
                      {mockup.product}
                    </p>
                    <p class="text-xs text-[var(--color-text-tertiary)]">
                      {mockup.brand} · {mockup.createdAt}
                    </p>
                  </div>
                  <Badge
                    variant={
                      mockup.status === "ready"
                        ? "success"
                        : mockup.status === "generating"
                          ? "info"
                          : "danger"
                    }
                    size="sm"
                  >
                    {mockup.status}
                  </Badge>
                </div>

                <div class="flex gap-2 mt-3">
                  <Button size="sm" variant="secondary" disabled={mockup.status !== "ready"}>
                    Download
                  </Button>
                  <Button size="sm" variant="ghost">
                    Share
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}
        </For>
      </div>
    </AppShell>
  );
}
