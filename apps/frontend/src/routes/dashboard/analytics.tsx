import { type Component, For, createSignal } from "solid-js";
import { AppShell } from "../../components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardBody } from "../../components/ui/Card";
import { Select } from "../../components/ui/Select";

interface AnalyticsMetric {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

interface BrandScore {
  brand: string;
  score: number;
  color: string;
}

interface TopProduct {
  name: string;
  brand: string;
  mockups: number;
  downloads: number;
}

const METRICS: AnalyticsMetric[] = [
  { label: "Total Mockups", value: "48", change: "+12 this week", positive: true },
  { label: "Downloads", value: "23", change: "+8 this week", positive: true },
  { label: "AI Generations Used", value: "3/5", change: "60% this month", positive: false },
  { label: "Avg Brand Score", value: "82", change: "+5 pts", positive: true },
];

const BRAND_SCORES: BrandScore[] = [
  { brand: "Beach Club", score: 88, color: "#06b6d4" },
  { brand: "Urban Wear", score: 76, color: "#8b5cf6" },
];

const TOP_PRODUCTS: TopProduct[] = [
  { name: "Summer Vibes T-Shirt", brand: "Beach Club", mockups: 8, downloads: 12 },
  { name: "Classic Logo Hoodie", brand: "Urban Wear", mockups: 6, downloads: 5 },
  { name: "Minimalist Mug", brand: "Urban Wear", mockups: 4, downloads: 3 },
  { name: "Premium Poster", brand: "Beach Club", mockups: 3, downloads: 3 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = createSignal("7d");

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
          <h1 class="text-2xl font-bold text-[var(--color-text)]">
            Analytics
          </h1>
          <p class="text-sm text-[var(--color-text-secondary)] mt-1">
            Track your brand performance and usage.
          </p>
        </div>
        <Select
          value={timeRange()}
          onChange={(e) => setTimeRange(e.currentTarget.value)}
          options={[
            { value: "7d", label: "Last 7 days" },
            { value: "30d", label: "Last 30 days" },
            { value: "90d", label: "Last 90 days" },
          ]}
          class="w-40"
        />
      </div>

      {/* Metric cards */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <For each={METRICS}>
          {(metric) => (
            <Card>
              <CardBody>
                <p class="text-sm text-[var(--color-text-secondary)]">
                  {metric.label}
                </p>
                <p class="text-2xl font-bold mt-1">{metric.value}</p>
                <p
                  class={`text-xs mt-1 ${
                    metric.positive
                      ? "text-[var(--color-success)]"
                      : "text-[var(--color-text-tertiary)]"
                  }`}
                >
                  {metric.change}
                </p>
              </CardBody>
            </Card>
          )}
        </For>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        {/* Brand Scores */}
        <Card>
          <CardHeader>
            <CardTitle>Brand Consistency Scores</CardTitle>
          </CardHeader>
          <CardBody>
            <div class="space-y-4">
              <For each={BRAND_SCORES}>
                {(bs) => (
                  <div>
                    <div class="flex items-center justify-between mb-1.5">
                      <div class="flex items-center gap-2">
                        <div
                          class="h-3 w-3 rounded-full"
                          style={{ "background-color": bs.color }}
                        />
                        <span class="text-sm font-medium text-[var(--color-text)]">
                          {bs.brand}
                        </span>
                      </div>
                      <span class="text-sm font-bold text-[var(--color-text)]">
                        {bs.score}/100
                      </span>
                    </div>
                    <div class="h-2 bg-[var(--color-surface-tertiary)] rounded-full overflow-hidden">
                      <div
                        class="h-full rounded-full transition-all"
                        style={{
                          width: `${bs.score}%`,
                          "background-color": bs.score >= 80
                            ? "var(--color-success)"
                            : bs.score >= 60
                              ? "var(--color-warning)"
                              : "var(--color-error)",
                        }}
                      />
                    </div>
                  </div>
                )}
              </For>
            </div>
          </CardBody>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
          </CardHeader>
          <CardBody>
            <div class="space-y-3">
              <For each={TOP_PRODUCTS}>
                {(product, i) => (
                  <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--color-surface-tertiary)] transition-colors">
                    <span class="text-sm font-bold text-[var(--color-text-tertiary)] w-5">
                      {i() + 1}
                    </span>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-[var(--color-text)] truncate">
                        {product.name}
                      </p>
                      <p class="text-xs text-[var(--color-text-tertiary)]">
                        {product.brand}
                      </p>
                    </div>
                    <div class="text-right text-xs">
                      <p class="text-[var(--color-text)]">
                        {product.downloads} downloads
                      </p>
                      <p class="text-[var(--color-text-tertiary)]">
                        {product.mockups} mockups
                      </p>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Usage Summary */}
      <Card class="mt-6">
        <CardHeader>
          <CardTitle>Usage Summary</CardTitle>
        </CardHeader>
        <CardBody>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AI Generations */}
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-[var(--color-text-secondary)]">
                  AI Generations
                </span>
                <span class="text-sm font-medium">3 / 5</span>
              </div>
              <div class="h-2 bg-[var(--color-surface-tertiary)] rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full bg-[var(--color-warning)]"
                  style={{ width: "60%" }}
                />
              </div>
            </div>

            {/* Storage */}
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-[var(--color-text-secondary)]">
                  Storage
                </span>
                <span class="text-sm font-medium">12 MB / 50 MB</span>
              </div>
              <div class="h-2 bg-[var(--color-surface-tertiary)] rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full bg-[var(--color-info)]"
                  style={{ width: "24%" }}
                />
              </div>
            </div>

            {/* Products */}
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-[var(--color-text-secondary)]">
                  Products Created
                </span>
                <span class="text-sm font-medium">12 / 3</span>
              </div>
              <div class="h-2 bg-[var(--color-surface-tertiary)] rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full bg-[var(--color-error)]"
                  style={{ width: "100%" }}
                />
              </div>
              <p class="text-xs text-[var(--color-error)] mt-1">
                Upgrade to create more products
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </AppShell>
  );
}
