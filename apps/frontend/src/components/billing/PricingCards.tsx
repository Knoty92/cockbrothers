/**
 * PricingCards — display plan tiers as comparison cards.
 * Used on the landing page, billing settings, and upgrade modals.
 */

import { Component, createSignal, For, Show } from 'solid-js';
import { TIER_CONFIGS, getPublicTiers, formatPrice } from '../../lib/stripe/client';
import type { TierConfig } from '../../lib/stripe/client';

interface PricingCardsProps {
  /** Current user's tier (to highlight) */
  currentTier?: string;
  /** Whether to show all tiers or just public ones */
  showAll?: boolean;
  /** Called when user clicks a plan CTA */
  onSelectPlan?: (tier: TierConfig, interval: 'month' | 'year') => void;
  /** Hide the enterprise card */
  hideEnterprise?: boolean;
  /** Compact mode (for upgrade modal) */
  compact?: boolean;
}

export const PricingCards: Component<PricingCardsProps> = (props) => {
  const [interval, setInterval] = createSignal<'month' | 'year'>('month');

  const tiers = () => {
    let list = props.showAll ? TIER_CONFIGS : getPublicTiers();
    if (props.hideEnterprise) {
      list = list.filter((t) => t.tier !== 'enterprise');
    }
    return list;
  };

  const price = (tier: TierConfig) => {
    if (tier.tier === 'free') return 'Free';
    if (tier.tier === 'enterprise') return 'Custom';
    const amount = interval() === 'year' ? tier.priceYearly : tier.priceMonthly;
    return `$${amount}`;
  };

  const period = (tier: TierConfig) => {
    if (tier.tier === 'free') return '';
    if (tier.tier === 'enterprise') return '';
    return interval() === 'year' ? '/year' : '/month';
  };

  const isCurrent = (tier: TierConfig) =>
    tier.tier === props.currentTier;

  return (
    <div class="space-y-6">
      {/* Toggle month/year */}
      <Show when={!props.compact}>
        <div class="flex items-center justify-center gap-3">
          <button
            onClick={() => setInterval('month')}
            class={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              interval() === 'month'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setInterval('year')}
            class={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              interval() === 'year'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            Yearly{' '}
            <span class="text-xs text-green-600 dark:text-green-400">
              (2 months free)
            </span>
          </button>
        </div>
      </Show>

      {/* Cards */}
      <div
        class={`grid gap-6 ${
          props.compact
            ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}
      >
        <For each={tiers()}>
          {(tier) => {
            const popular = tier.tier === 'pro';
            return (
              <div
                class={`
                  relative rounded-xl border-2 p-6 transition-all
                  ${
                    isCurrent(tier)
                      ? 'border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800'
                      : popular && !isCurrent(tier)
                        ? 'border-indigo-400 dark:border-indigo-600'
                        : 'border-gray-200 dark:border-gray-700'
                  }
                  ${
                    popular && !isCurrent(tier)
                      ? 'bg-white shadow-lg dark:bg-gray-800'
                      : 'bg-white dark:bg-gray-800'
                  }
                `}
              >
                {/* Popular badge */}
                <Show when={popular && !isCurrent(tier)}>
                  <div class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                    Most popular
                  </div>
                </Show>

                {/* Current plan badge */}
                <Show when={isCurrent(tier)}>
                  <div class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                    Current plan
                  </div>
                </Show>

                {/* Tier name */}
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {tier.label}
                </h3>

                {/* Price */}
                <div class="mt-4">
                  <span class="text-4xl font-bold text-gray-900 dark:text-gray-100">
                    {price(tier)}
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    {period(tier)}
                  </span>
                </div>

                {/* Features */}
                <ul class="mt-6 space-y-3 text-sm">
                  <FeatureItem
                    label={`${tier.maxBrands === 0 ? 'Unlimited' : tier.maxBrands} brands`}
                  />
                  <FeatureItem
                    label={`${tier.maxProducts === 0 ? 'Unlimited' : tier.maxProducts} products`}
                  />
                  <FeatureItem
                    label={`${tier.maxMockups === 0 ? 'Unlimited' : tier.maxMockups} mockups`}
                  />
                  <FeatureItem
                    label={`${tier.aiGenerations === 0 ? 'Unlimited' : tier.aiGenerations} AI generations/mo`}
                    included={tier.aiGenerations > 0 || tier.tier === 'enterprise'}
                  />
                  <FeatureItem
                    label="Batch export"
                    included={tier.batchExport}
                  />
                  <FeatureItem
                    label={`${tier.integrations === 0 ? 'Unlimited' : tier.integrations} POD integrations`}
                    included={tier.integrations > 0 || tier.tier === 'enterprise'}
                  />
                  <FeatureItem
                    label="API access"
                    included={tier.apiAccess}
                  />
                  <FeatureItem
                    label={`${tier.teamMembers} team member${tier.teamMembers > 1 ? 's' : ''}`}
                    included={tier.teamMembers > 1}
                  />
                  <FeatureItem
                    label="White-label"
                    included={tier.whiteLabel}
                  />
                </ul>

                {/* CTA */}
                <button
                  onClick={() => props.onSelectPlan?.(tier, interval())}
                  disabled={isCurrent(tier)}
                  class={`
                    mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors
                    ${
                      isCurrent(tier)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                        : tier.tier === 'free'
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }
                  `}
                >
                  {isCurrent(tier)
                    ? 'Current plan'
                    : tier.tier === 'free'
                      ? 'Get started'
                      : tier.tier === 'enterprise'
                        ? 'Contact sales'
                        : interval() === 'year'
                          ? `$${tier.priceYearly}/year`
                          : `$${tier.priceMonthly}/month`}
                </button>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};

/* ─── Feature item ──────────────────────────────────────────── */

function FeatureItem(props: { label: string; included?: boolean }) {
  return (
    <li class="flex items-center gap-2">
      <svg
        class={`h-4 w-4 shrink-0 ${
          props.included !== false
            ? 'text-green-500'
            : 'text-gray-300 dark:text-gray-600'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d={
            props.included !== false
              ? 'M5 13l4 4L19 7'
              : 'M6 18L18 6M6 6l12 12'
          }
        />
      </svg>
      <span
        class={
          props.included !== false
            ? 'text-gray-700 dark:text-gray-300'
            : 'text-gray-400 dark:text-gray-600'
        }
      >
        {props.label}
      </span>
    </li>
  );
}
