/**
 * Hook for subscription / billing state — manages plan info,
 * checkout flows, and usage tracking.
 *
 * Usage:
 *   const { plan, tiers, subscribe, loading } = useSubscription();
 */

import { createSignal, createResource, onMount } from 'solid-js';
import * as payments from '../lib/api/payments';
import type { CurrentPlan } from '../lib/api/payments';
import { TIER_CONFIGS, getTierConfig, getPublicTiers } from '../lib/stripe/client';
import type { TierConfig } from '../lib/stripe/client';

export function useSubscription() {
  const [plan, setPlan] = createSignal<CurrentPlan | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  // Fetch current plan on mount
  onMount(async () => {
    try {
      const currentPlan = await payments.getCurrentPlan();
      setPlan(currentPlan);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  });

  return {
    /** Current subscription plan with usage */
    get plan(): CurrentPlan | null {
      return plan();
    },

    /** Is data still loading */
    get loading(): boolean {
      return loading();
    },

    /** Error message */
    get error(): string | null {
      return error();
    },

    /** Current tier label */
    get tier(): string {
      return plan()?.tier ?? 'free';
    },

    /** The full TierConfig for the current plan */
    get tierConfig(): TierConfig | undefined {
      return getTierConfig(plan()?.tier ?? 'free');
    },

    /** All available tiers for comparison */
    get allTiers(): TierConfig[] {
      return TIER_CONFIGS;
    },

    /** Public-facing tier cards (excludes enterprise) */
    get publicTiers(): TierConfig[] {
      return getPublicTiers();
    },

    /** Check if the user is on the free tier */
    get isFree(): boolean {
      return plan()?.tier === 'free';
    },

    /** Check if the plan is currently active */
    get isActive(): boolean {
      return plan()?.status === 'active' || plan()?.status === 'trialing';
    },

    /** Usage stats */
    get usage() {
      return plan()?.usage ?? {
        aiGenerationsUsed: 0,
        mockupsGenerated: 0,
        storageBytesUsed: 0,
      };
    },

    /** Check if AI generation limit is reached */
    get aiGenerationLimitReached(): boolean {
      const config = getTierConfig(plan()?.tier ?? 'free');
      if (!config || config.aiGenerations === 0) return false; // 0 = unlimited
      return (plan()?.usage.aiGenerationsUsed ?? 0) >= config.aiGenerations;
    },

    /** Initiate a subscription checkout. Returns a redirect URL. */
    async subscribe(priceId: string): Promise<string> {
      setLoading(true);
      setError(null);
      try {
        const result = await payments.subscribe({ priceId });
        window.location.href = result.url;
        return result.url;
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
        throw err;
      }
    },

    /** Cancel the current subscription. */
    async cancel(): Promise<void> {
      setLoading(true);
      try {
        await payments.cancelSubscription();
        setPlan((prev) =>
          prev ? { ...prev, status: 'canceled' } : prev,
        );
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },

    /** Open the Stripe Customer Portal for managing billing. */
    async openPortal(returnUrl?: string): Promise<void> {
      try {
        const url = await payments.getPortalUrl(returnUrl);
        window.location.href = url;
      } catch (err) {
        setError((err as Error).message);
      }
    },

    /** Refetch the current plan from the server. */
    async refresh(): Promise<void> {
      try {
        const currentPlan = await payments.getCurrentPlan();
        setPlan(currentPlan);
      } catch (err) {
        setError((err as Error).message);
      }
    },

    /** Get the price id for a tier + interval. */
    getPriceId(tier: string, interval: 'month' | 'year'): string | undefined {
      const config = getTierConfig(tier);
      if (!config) return undefined;
      return interval === 'year'
        ? config.stripeYearlyPriceId
        : config.stripePriceId;
    },
  };
}
