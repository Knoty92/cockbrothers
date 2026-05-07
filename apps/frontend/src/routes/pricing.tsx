import { type Component, For } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { Button } from "../components/ui/Button";
import { Footer } from "../components/layout/Footer";

interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: "Free",
    price: 0,
    description: "Try before you commit",
    features: [
      "1 brand kit",
      "3 products",
      "10 mockups",
      "5 AI generations per month",
      "PNG export",
      "Community support",
    ],
    cta: "Get Started",
  },
  {
    name: "Starter",
    price: 9,
    description: "For side hustlers",
    features: [
      "3 brand kits",
      "20 products",
      "100 mockups",
      "50 AI generations per month",
      "Batch export",
      "1 POD integration",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Pro",
    price: 19,
    description: "For serious brands",
    features: [
      "10 brand kits",
      "Unlimited products",
      "Unlimited mockups",
      "500 AI generations per month",
      "Batch export",
      "3 POD integrations",
      "API access",
      "Priority support",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Agency",
    price: 49,
    description: "For agencies & studios",
    features: [
      "Unlimited brand kits",
      "Unlimited products",
      "Unlimited mockups",
      "2,000 AI generations per month",
      "Batch export",
      "10 POD integrations",
      "API access",
      "10 team members",
      "White-label export",
      "Dedicated support",
    ],
    cta: "Contact Sales",
  },
  {
    name: "Enterprise",
    price: 0,
    description: "Custom solutions for large teams",
    features: [
      "Everything in Agency",
      "Custom AI model fine-tuning",
      "SSO / SAML",
      "Custom integrations",
      "SLA guarantee",
      "Dedicated account manager",
      "Volume discounts",
    ],
    cta: "Contact Us",
  },
];

const FAQ_ITEMS = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "What happens when I hit my limits?",
    a: "You'll receive a notification when you're approaching your tier limits. Upgrade to unlock more capacity or wait for the next billing cycle.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Yes! Starter and Pro plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. No long-term contracts. Cancel anytime and keep access until the end of your billing period.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and bank transfers (for annual Enterprise plans).",
  },
  {
    q: "Do you offer annual discounts?",
    a: "Yes! Save 20% when you pay annually. The discount is applied automatically at checkout.",
  },
];

export default function PricingPage() {
  const navigate = useNavigate();

  return (
    <div class="min-h-screen bg-white">
      {/* Navbar */}
      <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-[var(--color-border)]">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <A href="/" class="flex items-center gap-2">
            <span class="text-2xl">🍆</span>
            <span class="font-bold text-xl text-[var(--color-text)]">
              Cockbrothers
            </span>
          </A>
          <nav class="flex items-center gap-4">
            <A
              href="/login"
              class="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
            >
              Sign in
            </A>
            <Button size="sm" onClick={() => navigate("/register")}>
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Pricing hero */}
      <section class="py-20">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              Simple pricing for every stage
            </h1>
            <p class="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Start with our free tier and upgrade as your brand grows. No
              hidden fees, no surprises.
            </p>
          </div>

          {/* Toggle: Monthly/Annual */}
          <div class="flex items-center justify-center gap-3 mb-12">
            <span class="text-sm font-medium text-[var(--color-text)]">
              Monthly
            </span>
            <div class="relative w-12 h-6 bg-[var(--color-primary)] rounded-full cursor-pointer">
              <div class="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow" />
            </div>
            <span class="text-sm font-medium text-[var(--color-text-secondary)]">
              Annual{" "}
              <span class="text-[var(--color-success)] text-xs font-medium">
                Save 20%
              </span>
            </span>
          </div>

          {/* Pricing cards */}
          <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <For each={PRICING_TIERS}>
              {(tier) => (
                <div
                  class={`
                    relative bg-white rounded-xl border p-6 flex flex-col
                    ${
                      tier.highlighted
                        ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20 shadow-lg scale-105 z-10"
                        : "border-[var(--color-border)]"
                    }
                  `}
                >
                  {tier.highlighted && (
                    <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
                      Most Popular
                    </span>
                  )}

                  <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-1">{tier.name}</h3>
                    <p class="text-sm text-[var(--color-text-secondary)]">
                      {tier.description}
                    </p>
                  </div>

                  <div class="mb-6">
                    {tier.price > 0 ? (
                      <>
                        <span class="text-4xl font-bold">${tier.price}</span>
                        <span class="text-[var(--color-text-tertiary)]">
                          /month
                        </span>
                      </>
                    ) : (
                      <span class="text-3xl font-bold text-[var(--color-text-secondary)]">
                        Custom
                      </span>
                    )}
                  </div>

                  <ul class="space-y-3 mb-8 flex-1">
                    <For each={tier.features}>
                      {(feature) => (
                        <li class="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                          <svg
                            class="h-4 w-4 mt-0.5 text-[var(--color-success)] shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      )}
                    </For>
                  </ul>

                  <Button
                    variant={tier.highlighted ? "primary" : "secondary"}
                    onClick={() => navigate("/register")}
                  >
                    {tier.cta}
                  </Button>
                </div>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* Feature comparison */}
      <section class="py-20 bg-[var(--color-surface-secondary)]">
        <div class="max-w-5xl mx-auto px-6">
          <h2 class="text-2xl font-bold text-center mb-10">
            What's included in each plan
          </h2>

          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-[var(--color-border)]">
                  <th class="text-left py-3 pr-6 font-semibold text-[var(--color-text)]">
                    Feature
                  </th>
                  <th class="text-center py-3 px-4 font-semibold text-[var(--color-text)]">
                    Free
                  </th>
                  <th class="text-center py-3 px-4 font-semibold text-[var(--color-primary)]">
                    Starter
                  </th>
                  <th class="text-center py-3 px-4 font-semibold text-[var(--color-text)]">
                    Pro
                  </th>
                  <th class="text-center py-3 px-4 font-semibold text-[var(--color-text)]">
                    Agency
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Brand kits", free: "1", starter: "3", pro: "10", agency: "∞" },
                  { label: "Products", free: "3", starter: "20", pro: "∞", agency: "∞" },
                  { label: "Mockups", free: "10", starter: "100", pro: "∞", agency: "∞" },
                  { label: "AI generations/mo", free: "5", starter: "50", pro: "500", agency: "2,000" },
                  { label: "Batch export", free: "—", starter: "✅", pro: "✅", agency: "✅" },
                  { label: "POD integrations", free: "—", starter: "1", pro: "3", agency: "10" },
                  { label: "API access", free: "—", starter: "—", pro: "✅", agency: "✅" },
                  { label: "Team members", free: "—", starter: "—", pro: "—", agency: "10" },
                  { label: "White-label", free: "—", starter: "—", pro: "—", agency: "✅" },
                ].map((row) => (
                  <tr class="border-b border-[var(--color-border)]">
                    <td class="py-3 pr-6 text-[var(--color-text)]">
                      {row.label}
                    </td>
                    <td class="text-center py-3 px-4 text-[var(--color-text-secondary)]">
                      {row.free}
                    </td>
                    <td class="text-center py-3 px-4 text-[var(--color-text-secondary)]">
                      {row.starter}
                    </td>
                    <td class="text-center py-3 px-4 text-[var(--color-text-secondary)]">
                      {row.pro}
                    </td>
                    <td class="text-center py-3 px-4 text-[var(--color-text-secondary)]">
                      {row.agency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section class="py-20">
        <div class="max-w-3xl mx-auto px-6">
          <h2 class="text-2xl font-bold text-center mb-10">
            Frequently asked questions
          </h2>

          <div class="space-y-6">
            <For each={FAQ_ITEMS}>
              {(faq) => (
                <div class="bg-[var(--color-surface-secondary)] rounded-xl p-5">
                  <h3 class="font-medium text-[var(--color-text)] mb-2">
                    {faq.q}
                  </h3>
                  <p class="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </For>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
