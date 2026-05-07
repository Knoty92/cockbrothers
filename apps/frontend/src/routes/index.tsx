import { type Component, For } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { Button } from "../components/ui/Button";
import { Card, CardTitle, CardBody } from "../components/ui/Card";
import { Footer } from "../components/layout/Footer";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const FEATURES: Feature[] = [
  {
    title: "AI Brand Kit Generator",
    description:
      "Describe your brand and let AI generate a complete brand identity — colors, fonts, logo, and brand voice in seconds.",
    icon: "🤖",
  },
  {
    title: "Smart Mockup Studio",
    description:
      "Apply your brand to hundreds of product templates. Preview in real-time and export high-resolution mockups.",
    icon: "🎨",
  },
  {
    title: "Multi-Platform Export",
    description:
      "Push directly to Printful, Printify, and Shopify. Your branded products go live with one click.",
    icon: "🚀",
  },
  {
    title: "Brand Consistency Score",
    description:
      "AI-powered scoring ensures every design stays on-brand. Catch inconsistencies before they ship.",
    icon: "🎯",
  },
  {
    title: "Batch Operations",
    description:
      "Create a brand once, apply to every product variant. Generate hundreds of mockups in minutes.",
    icon: "⚡",
  },
  {
    title: "Template Playground",
    description:
      "Customize every detail with the canvas editor. Drag, resize, restyle until it's perfect.",
    icon: "✏️",
  },
];

const PRICING_TIERS: PricingTier[] = [
  {
    name: "Free",
    price: 0,
    description: "Try before you commit",
    features: [
      "1 brand kit",
      "3 products",
      "10 mockups",
      "5 AI generations",
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
      "50 AI generations",
      "Batch export",
      "1 POD integration",
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
      "500 AI generations",
      "Batch export",
      "3 POD integrations",
      "API access",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Agency",
    price: 49,
    description: "For agencies & studios",
    features: [
      "Unlimited brands",
      "Unlimited products",
      "Unlimited mockups",
      "2000 AI generations",
      "Batch export",
      "10 POD integrations",
      "API access",
      "Team members (10)",
      "White-label",
    ],
    cta: "Contact Sales",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div class="min-h-screen bg-white">
      {/* Navbar */}
      <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-[var(--color-border)]">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🍆</span>
            <span class="font-bold text-xl text-[var(--color-text)]">
              Cockbrothers
            </span>
          </div>
          <nav class="hidden md:flex items-center gap-6">
            <a
              href="#features"
              class="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              class="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              Pricing
            </a>
            <A
              href="/login"
              class="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              Sign in
            </A>
            <Button onClick={() => navigate("/register")}>Get Started</Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section class="relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Your brand kit.{" "}
              <span class="hero-gradient-text">AI-powered.</span>
              <br />
              Ready to sell.
            </h1>
            <p class="text-lg md:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
              Cockbrothers turns your brand idea into a complete product line.
              Generate brand kits, create stunning mockups, and push to
              print-on-demand platforms — all in one place.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => navigate("/register")}>
                Start Free Trial
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                See Features
              </Button>
            </div>
            <p class="text-sm text-[var(--color-text-tertiary)] mt-4">
              No credit card required · Free tier included
            </p>
          </div>

          {/* Hero visual */}
          <div class="mt-16 relative">
            <div class="absolute inset-0 landing-gradient opacity-5 blur-3xl rounded-3xl" />
            <div class="relative bg-white rounded-2xl shadow-2xl border border-[var(--color-border)] p-8 max-w-4xl mx-auto">
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "T-Shirt", emoji: "👕" },
                  { label: "Hoodie", emoji: "🧥" },
                  { label: "Mug", emoji: "☕" },
                  { label: "Poster", emoji: "🖼️" },
                  { label: "Tote Bag", emoji: "🛍️" },
                  { label: "Phone Case", emoji: "📱" },
                ].map((product) => (
                  <div class="bg-[var(--color-surface-secondary)] rounded-xl p-4 text-center border border-[var(--color-border)]">
                    <div class="text-3xl mb-2">{product.emoji}</div>
                    <div class="text-sm font-medium text-[var(--color-text)]">
                      {product.label}
                    </div>
                    <div class="text-xs text-[var(--color-text-tertiary)] mt-1">
                      4 variants
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" class="py-20 bg-[var(--color-surface-secondary)]">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to brand & ship
            </h2>
            <p class="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              From brand creation to product mockups to POD publishing — one
              integrated workflow.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <For each={FEATURES}>
              {(feature) => (
                <Card hover class="p-6">
                  <div class="text-2xl mb-3">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                  <p class="text-sm text-[var(--color-text-secondary)] mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" class="py-20">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p class="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Start free, upgrade as you grow. No hidden fees.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <For each={PRICING_TIERS}>
              {(tier) => (
                <div
                  class={`
                    relative bg-white rounded-xl border p-6 flex flex-col
                    ${
                      tier.highlighted
                        ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20 shadow-lg"
                        : "border-[var(--color-border)]"
                    }
                  `}
                >
                  {tier.highlighted && (
                    <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-white text-xs font-medium px-3 py-1 rounded-full">
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
                    <span class="text-4xl font-bold">${tier.price}</span>
                    {tier.name !== "Enterprise" && (
                      <span class="text-[var(--color-text-tertiary)]">
                        /month
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
                    onClick={() =>
                      navigate(tier.price === 0 ? "/register" : "/register")
                    }
                  >
                    {tier.cta}
                  </Button>
                </div>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-20 landing-gradient">
        <div class="max-w-3xl mx-auto px-6 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to brand your empire?
          </h2>
          <p class="text-lg text-white/80 mb-10">
            Join hundreds of creators who build, brand, and ship with
            Cockbrothers.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/register")}
            class="bg-white text-[var(--color-primary)] hover:bg-white/90"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
