import { type Component, For, Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { AppShell } from "../../components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardBody } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

interface Stat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
}

interface RecentProduct {
  id: string;
  name: string;
  brand: string;
  status: string;
  updatedAt: string;
  thumbnail?: string;
}

const STATS: Stat[] = [
  { label: "Brands", value: "2", change: "+1 this month", positive: true, icon: "🏷️" },
  { label: "Products", value: "12", change: "+5 this week", positive: true, icon: "📦" },
  { label: "Mockups", value: "48", change: "+12 this week", positive: true, icon: "🖼️" },
  { label: "AI Generations", value: "3/5", change: "60% used", positive: false, icon: "🤖" },
];

const RECENT_PRODUCTS: RecentProduct[] = [
  {
    id: "1",
    name: "Summer Vibes T-Shirt",
    brand: "Beach Club",
    status: "completed",
    updatedAt: "2 hours ago",
  },
  {
    id: "2",
    name: "Classic Logo Hoodie",
    brand: "Urban Wear",
    status: "completed",
    updatedAt: "5 hours ago",
  },
  {
    id: "3",
    name: "Minimalist Mug Set",
    brand: "Beach Club",
    status: "processing",
    updatedAt: "1 day ago",
  },
  {
    id: "4",
    name: "Premium Poster Pack",
    brand: "Urban Wear",
    status: "draft",
    updatedAt: "2 days ago",
  },
];

export default function DashboardPage() {
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
      {/* Page header */}
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-[var(--color-text)]">Dashboard</h1>
          <p class="text-sm text-[var(--color-text-secondary)] mt-1">
            Welcome back! Here's what's happening with your brands.
          </p>
        </div>
        <A href="/dashboard/brands/new">
          <Button icon={
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          }>
            New Brand
          </Button>
        </A>
      </div>

      {/* Stats grid */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <For each={STATS}>
          {(stat) => (
            <Card>
              <CardBody>
                <div class="flex items-start justify-between">
                  <div>
                    <p class="text-sm text-[var(--color-text-secondary)]">
                      {stat.label}
                    </p>
                    <p class="text-2xl font-bold mt-1">{stat.value}</p>
                    <p
                      class={`text-xs mt-1 ${
                        stat.positive
                          ? "text-[var(--color-success)]"
                          : "text-[var(--color-text-tertiary)]"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                  <span class="text-2xl">{stat.icon}</span>
                </div>
              </CardBody>
            </Card>
          )}
        </For>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
            <A
              href="/dashboard/products"
              class="text-sm text-[var(--color-primary)] hover:underline"
            >
              View all
            </A>
          </CardHeader>
          <CardBody>
            <div class="space-y-3">
              <For each={RECENT_PRODUCTS}>
                {(product) => (
                  <div class="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--color-surface-tertiary)] transition-colors">
                    {/* Thumbnail placeholder */}
                    <div class="h-10 w-10 rounded-lg bg-[var(--color-surface-tertiary)] flex items-center justify-center text-sm">
                      👕
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-[var(--color-text)] truncate">
                        {product.name}
                      </p>
                      <p class="text-xs text-[var(--color-text-tertiary)]">
                        {product.brand} · {product.updatedAt}
                      </p>
                    </div>
                    <Badge
                      variant={
                        product.status === "completed"
                          ? "success"
                          : product.status === "processing"
                            ? "info"
                            : "default"
                      }
                      size="sm"
                    >
                      {product.status}
                    </Badge>
                  </div>
                )}
              </For>
            </div>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardBody>
            <div class="grid grid-cols-2 gap-3">
              {[
                {
                  label: "New Brand Kit",
                  href: "/dashboard/brands/new",
                  icon: "🏷️",
                  desc: "Create a brand from scratch or with AI",
                },
                {
                  label: "Generate Mockups",
                  href: "/dashboard/products/new",
                  icon: "🖼️",
                  desc: "Apply brand to product templates",
                },
                {
                  label: "Connect POD",
                  href: "/dashboard/integrations",
                  icon: "🔌",
                  desc: "Link Printful or Printify",
                },
                {
                  label: "View Analytics",
                  href: "/dashboard/analytics",
                  icon: "📊",
                  desc: "Track brand performance",
                },
              ].map((action) => (
                <A
                  href={action.href}
                  class="flex flex-col items-center text-center p-4 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all"
                >
                  <span class="text-2xl mb-2">{action.icon}</span>
                  <span class="text-sm font-medium text-[var(--color-text)]">
                    {action.label}
                  </span>
                  <span class="text-xs text-[var(--color-text-tertiary)] mt-1">
                    {action.desc}
                  </span>
                </A>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
