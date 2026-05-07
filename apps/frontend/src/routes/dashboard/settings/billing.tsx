import { type Component, For, Show, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { AppShell } from "../../../components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Modal } from "../../../components/ui/Modal";
import { addToast } from "../../../components/ui/Toast";

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  current?: boolean;
}

const CURRENT_PLAN: Plan = {
  id: "free",
  name: "Free",
  price: 0,
  period: "month",
  features: [
    "1 brand kit",
    "3 products",
    "10 mockups",
    "5 AI generations/mo",
  ],
  current: true,
};

const AVAILABLE_PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 9,
    period: "month",
    features: [
      "3 brand kits",
      "20 products",
      "100 mockups",
      "50 AI generations/mo",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    period: "month",
    features: [
      "10 brand kits",
      "Unlimited products",
      "Unlimited mockups",
      "500 AI generations/mo",
    ],
  },
];

const INVOICES = [
  { id: "INV-001", date: "May 1, 2026", amount: "$9.00", status: "paid" },
  { id: "INV-002", date: "Apr 1, 2026", amount: "$9.00", status: "paid" },
  { id: "INV-003", date: "Mar 1, 2026", amount: "$9.00", status: "paid" },
];

export default function BillingPage() {
  const [showUpgrade, setShowUpgrade] = createSignal(false);
  const [upgradeTarget, setUpgradeTarget] = createSignal<Plan | null>(null);

  const handleUpgrade = (plan: Plan) => {
    setUpgradeTarget(plan);
    setShowUpgrade(true);
  };

  const confirmUpgrade = () => {
    setShowUpgrade(false);
    addToast({
      type: "success",
      message: `Upgraded to ${upgradeTarget()?.name}`,
      description: "Your plan has been updated. You can now enjoy new features.",
    });
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
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-[var(--color-text)]">Billing</h1>
        <p class="text-sm text-[var(--color-text-secondary)] mt-1">
          Manage your subscription and billing history.
        </p>
      </div>

      {/* Current Plan */}
      <Card class="mb-6">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <Badge variant="primary">{CURRENT_PLAN.name}</Badge>
        </CardHeader>
        <CardBody>
          <div class="flex items-baseline gap-1 mb-4">
            <span class="text-3xl font-bold">${CURRENT_PLAN.price}</span>
            <span class="text-[var(--color-text-tertiary)]">
              /{CURRENT_PLAN.period}
            </span>
          </div>
          <ul class="space-y-2 mb-4">
            <For each={CURRENT_PLAN.features}>
              {(feature) => (
                <li class="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <svg class="h-4 w-4 text-[var(--color-success)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              )}
            </For>
          </ul>
          <p class="text-xs text-[var(--color-text-tertiary)]">
            Need more?{" "}
            <A href="/pricing" class="text-[var(--color-primary)] hover:underline">
              Compare plans
            </A>
          </p>
        </CardBody>
      </Card>

      {/* Available Plans */}
      <h2 class="text-lg font-semibold mb-4">Available Upgrades</h2>
      <div class="grid md:grid-cols-2 gap-4 mb-8">
        <For each={AVAILABLE_PLANS}>
          {(plan) => (
            <Card>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div class="flex items-baseline gap-1">
                  <span class="text-xl font-bold">${plan.price}</span>
                  <span class="text-xs text-[var(--color-text-tertiary)]">
                    /{plan.period}
                  </span>
                </div>
              </CardHeader>
              <CardBody>
                <ul class="space-y-2 mb-6">
                  <For each={plan.features}>
                    {(feature) => (
                      <li class="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                        <svg class="h-4 w-4 text-[var(--color-success)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    )}
                  </For>
                </ul>
                <Button class="w-full" onClick={() => handleUpgrade(plan)}>
                  Upgrade to {plan.name}
                </Button>
              </CardBody>
            </Card>
          )}
        </For>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardBody>
          <div class="space-y-2">
            <For each={INVOICES}>
              {(invoice) => (
                <div class="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--color-surface-tertiary)] transition-colors">
                  <div>
                    <p class="text-sm font-medium text-[var(--color-text)]">
                      {invoice.id}
                    </p>
                    <p class="text-xs text-[var(--color-text-tertiary)]">
                      {invoice.date}
                    </p>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-sm text-[var(--color-text)]">
                      {invoice.amount}
                    </span>
                    <Badge variant="success" size="sm">
                      {invoice.status}
                    </Badge>
                    <button
                      type="button"
                      class="text-xs text-[var(--color-primary)] hover:underline cursor-pointer"
                    >
                      Download
                    </button>
                  </div>
                </div>
              )}
            </For>
          </div>
        </CardBody>
      </Card>

      {/* Payment Method */}
      <Card class="mt-6">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardBody>
          <p class="text-sm text-[var(--color-text-secondary)]">
            No payment method on file. You're on the Free plan.
          </p>
          <Button variant="secondary" class="mt-3" disabled>
            Add payment method
          </Button>
        </CardBody>
      </Card>

      {/* Upgrade Confirmation Modal */}
      <Modal
        isOpen={showUpgrade()}
        onClose={() => setShowUpgrade(false)}
        title={`Upgrade to ${upgradeTarget()?.name ?? ""}`}
        size="sm"
      >
        <p class="text-sm text-[var(--color-text-secondary)] mb-6">
          You're upgrading your plan. The change will take effect immediately
          and you'll be charged ${upgradeTarget()?.price}/month starting today.
        </p>
        <div class="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowUpgrade(false)}>
            Cancel
          </Button>
          <Button onClick={confirmUpgrade}>
            Confirm upgrade
          </Button>
        </div>
      </Modal>
    </AppShell>
  );
}
