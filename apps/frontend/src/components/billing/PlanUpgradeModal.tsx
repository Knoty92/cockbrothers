/**
 * PlanUpgradeModal — full-screen modal showing all available plans
 * for upgrading or changing subscription.
 */

import { Component, Show } from 'solid-js';
import { PricingCards } from './PricingCards';
import { uiStore } from '../../stores/uiStore';
import { useSubscription } from '../../hooks/useSubscription';
import type { TierConfig } from '../../lib/stripe/client';

interface PlanUpgradeModalProps {
  /** Pre-selected tier for the user (e.g., 'pro') */
  preselectedTier?: string;
  /** Called when a plan is selected */
  onSelectPlan?: (tier: TierConfig, interval: 'month' | 'year') => void;
}

export const PlanUpgradeModal: Component<PlanUpgradeModalProps> = (props) => {
  const { plan } = useSubscription();

  const handleSelectPlan = (tier: TierConfig, interval: 'month' | 'year') => {
    if (props.onSelectPlan) {
      props.onSelectPlan(tier, interval);
    } else {
      // Default behavior: redirect to checkout
      uiStore.success(
        `Upgrading to ${tier.label} (${interval})`,
        'Redirecting to checkout...',
      );
      // The actual redirect is handled by the subscription hook
    }
    uiStore.closeModal();
  };

  return (
    <div class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-12">
      <div class="w-full max-w-5xl rounded-xl bg-white shadow-2xl dark:bg-gray-800">
        {/* Header */}
        <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Upgrade plan
            </h2>
            <p class="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              {plan()
                ? `You're currently on the ${plan()!.tier} plan. Choose a plan to upgrade or downgrade.`
                : 'Choose the plan that fits your needs.'}
            </p>
          </div>
          <button
            onClick={() => uiStore.closeModal()}
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div class="p-6">
          <PricingCards
            currentTier={plan()?.tier}
            showAll
            compact={false}
            onSelectPlan={handleSelectPlan}
          />
        </div>

        {/* Footer */}
        <div class="border-t border-gray-200 px-6 py-4 text-center dark:border-gray-700">
          <p class="text-xs text-gray-400 dark:text-gray-500">
            All plans include a 14-day free trial. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};
