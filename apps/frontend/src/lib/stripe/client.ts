/**
 * Stripe client helpers — used in API routes and browser-side
 * checkout flows (via Stripe.js Elements / redirect).
 *
 * The actual Stripe SDK is loaded server-side; the client
 * only handles redirect-to-checkout and portal actions.
 */

// Tier configuration mirroring the DB tier_limits table
export interface TierConfig {
  tier: 'free' | 'starter' | 'pro' | 'agency' | 'enterprise';
  label: string;
  priceMonthly: number;
  priceYearly: number;
  maxBrands: number;
  maxProducts: number; // 0 = unlimited
  maxMockups: number;  // 0 = unlimited
  aiGenerations: number;
  batchExport: boolean;
  apiAccess: boolean;
  integrations: number;
  teamMembers: number;
  whiteLabel: boolean;
  stripePriceId?: string;
  stripeYearlyPriceId?: string;
}

export const TIER_CONFIGS: TierConfig[] = [
  {
    tier: 'free',
    label: 'Free',
    priceMonthly: 0,
    priceYearly: 0,
    maxBrands: 1,
    maxProducts: 3,
    maxMockups: 10,
    aiGenerations: 5,
    batchExport: false,
    apiAccess: false,
    integrations: 0,
    teamMembers: 1,
    whiteLabel: false,
  },
  {
    tier: 'starter',
    label: 'Starter',
    priceMonthly: 9,
    priceYearly: 90,
    maxBrands: 3,
    maxProducts: 20,
    maxMockups: 100,
    aiGenerations: 50,
    batchExport: true,
    apiAccess: false,
    integrations: 1,
    teamMembers: 1,
    whiteLabel: false,
    stripePriceId: 'price_starter_monthly',     // placeholder — set real IDs
    stripeYearlyPriceId: 'price_starter_yearly',
  },
  {
    tier: 'pro',
    label: 'Pro',
    priceMonthly: 19,
    priceYearly: 190,
    maxBrands: 10,
    maxProducts: 0,   // unlimited
    maxMockups: 0,    // unlimited
    aiGenerations: 500,
    batchExport: true,
    apiAccess: true,
    integrations: 3,
    teamMembers: 1,
    whiteLabel: false,
    stripePriceId: 'price_pro_monthly',
    stripeYearlyPriceId: 'price_pro_yearly',
  },
  {
    tier: 'agency',
    label: 'Agency',
    priceMonthly: 49,
    priceYearly: 490,
    maxBrands: 0,     // unlimited
    maxProducts: 0,   // unlimited
    maxMockups: 0,    // unlimited
    aiGenerations: 2000,
    batchExport: true,
    apiAccess: true,
    integrations: 10,
    teamMembers: 10,
    whiteLabel: true,
    stripePriceId: 'price_agency_monthly',
    stripeYearlyPriceId: 'price_agency_yearly',
  },
  {
    tier: 'enterprise',
    label: 'Enterprise',
    priceMonthly: 0,  // custom pricing
    priceYearly: 0,   // custom pricing
    maxBrands: 0,
    maxProducts: 0,
    maxMockups: 0,
    aiGenerations: 0,
    batchExport: true,
    apiAccess: true,
    integrations: 0,  // unlimited
    teamMembers: 0,   // unlimited
    whiteLabel: true,
  },
];

export function getTierConfig(tier: string): TierConfig | undefined {
  return TIER_CONFIGS.find((t) => t.tier === tier);
}

export function getPublicTiers(): TierConfig[] {
  return TIER_CONFIGS.filter((t) => t.tier !== 'enterprise');
}

export type BillingInterval = 'month' | 'year';

/**
 * Build the Stripe Checkout session URL.
 * Called from the server; the response contains a url for redirect.
 */
export interface CreateCheckoutSessionParams {
  userId: string;
  email: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  trialDays?: number;
  metadata?: Record<string, string>;
}

export interface CreatePortalSessionParams {
  customerId: string;
  returnUrl: string;
}

/**
 * Format price for display.
 */
export function formatPrice(cents: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(cents / 100);
}
