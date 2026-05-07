/**
 * Payments API calls — typed functions for billing and subscription endpoints.
 */

import type { TierConfig } from '../stripe/client';

const BASE = '/api/payments';

interface ApiResponse<T> {
  data: T;
  error?: { code: string; message: string };
}

export interface CurrentPlan {
  tier: string;
  status: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  trialEnd: string | null;
  usage: {
    aiGenerationsUsed: number;
    mockupsGenerated: number;
    storageBytesUsed: number;
  };
}

export interface CheckoutResponse {
  url: string;
  sessionId: string;
}

export interface PortalResponse {
  url: string;
}

export interface SubscribeParams {
  priceId: string;
  successUrl?: string;
  cancelUrl?: string;
}

/**
 * Get the current subscription plan + usage data.
 */
export async function getCurrentPlan(): Promise<CurrentPlan> {
  const res = await fetch(`${BASE}/current-plan`);
  const json: ApiResponse<CurrentPlan> = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.data;
}

/**
 * Create or change a subscription. Returns a Stripe Checkout URL.
 */
export async function subscribe(params: SubscribeParams): Promise<CheckoutResponse> {
  const res = await fetch(`${BASE}/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const json: ApiResponse<CheckoutResponse> = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.data;
}

/**
 * Cancel the current subscription.
 */
export async function cancelSubscription(): Promise<void> {
  const res = await fetch(`${BASE}/cancel`, { method: 'POST' });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json?.error?.message ?? 'Cancel failed');
  }
}

/**
 * Get a Stripe Customer Portal URL for managing billing.
 */
export async function getPortalUrl(returnUrl?: string): Promise<string> {
  const params = new URLSearchParams();
  if (returnUrl) params.set('returnUrl', returnUrl);

  const res = await fetch(`${BASE}/portal?${params}`);
  const json: ApiResponse<PortalResponse> = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.data.url;
}

/**
 * Fetch all available tier configurations.
 */
export async function getTiers(): Promise<TierConfig[]> {
  const res = await fetch('/api/payments/tiers');
  const json: ApiResponse<TierConfig[]> = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.data;
}
