import {
  createContext,
  useContext,
  createSignal,
  onMount,
  type JSX,
  type Accessor,
} from "solid-js";
import { DEFAULT_TIER_LIMITS, TIERS, TIER_ORDER, type Tier } from "~/lib/constants";

// ==========================================
// Types
// ==========================================

export interface Subscription {
  id: string;
  userId: string;
  stripeId: string | null;
  stripeCustomerId: string | null;
  tier: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  trialEnd: string | null;
  canceledAt: string | null;
  aiGenerationsUsed: number;
  mockupsGenerated: number;
  storageBytesUsed: number;
  createdAt: string;
  updatedAt: string;
}

export interface TierLimits {
  maxBrands: number;
  maxProducts: number;
  maxMockups: number;
  aiGenerationsPerMonth: number;
  batchExport: boolean;
  apiAccess: boolean;
  maxIntegrations: number;
  maxTeamMembers: number;
  whiteLabel: boolean;
  priceMonthly: number;
}

export interface SubscriptionContextValue {
  subscription: Accessor<Subscription | null>;
  tierLimits: Accessor<TierLimits | null>;
  currentTier: Accessor<Tier>;
  loading: Accessor<boolean>;
  error: Accessor<string | null>;
  canCreateBrand: () => boolean;
  canCreateProduct: () => boolean;
  canBatchExport: () => boolean;
  canAccessApi: () => boolean;
  canUseAiGeneration: () => boolean;
  canAddIntegration: () => boolean;
  canInviteTeamMember: () => boolean;
  isWhiteLabel: () => boolean;
  refresh: () => Promise<void>;
  subscribe: (tier: string) => Promise<void>;
  cancel: () => Promise<void>;
  openPortal: () => Promise<void>;
  usagePercent: (used: number, limit: number) => number;
}

// ==========================================
// Context
// ==========================================

const SubscriptionContext = createContext<SubscriptionContextValue>();

// ==========================================
// Helpers
// ==========================================

function getTierLimits(tier: string): TierLimits {
  const key = tier as Tier;
  if (key in DEFAULT_TIER_LIMITS) {
    return DEFAULT_TIER_LIMITS[key];
  }
  return DEFAULT_TIER_LIMITS.free;
}

function hasUnlimited(value: number): boolean {
  return value === 0;
}

// ==========================================
// Provider
// ==========================================

export function SubscriptionProvider(props: {
  children: JSX.Element;
  initialTier?: string;
}) {
  const [subscription, setSubscription] = createSignal<Subscription | null>(null);
  const [tierLimits, setTierLimits] = createSignal<TierLimits>(
    getTierLimits(props.initialTier ?? "free"),
  );
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  // Derived — current tier
  const currentTier: Accessor<Tier> = () => {
    const sub = subscription();
    const tier = sub?.tier ?? "free";
    return tier as Tier;
  };

  // ==========================================
  // Limit checks
  // ==========================================

  function canCreateBrand(): boolean {
    const limits = tierLimits();
    return limits ? hasUnlimited(limits.maxBrands) || limits.maxBrands > 0 : false;
  }

  function canCreateProduct(): boolean {
    const limits = tierLimits();
    return limits ? hasUnlimited(limits.maxProducts) || limits.maxProducts > 0 : false;
  }

  function canBatchExport(): boolean {
    const limits = tierLimits();
    return limits?.batchExport ?? false;
  }

  function canAccessApi(): boolean {
    const limits = tierLimits();
    return limits?.apiAccess ?? false;
  }

  function canUseAiGeneration(): boolean {
    const limits = tierLimits();
    // 0 = unlimited generations; otherwise check if user has remaining
    // Actual remaining check done on the server
    return limits ? hasUnlimited(limits.aiGenerationsPerMonth) || limits.aiGenerationsPerMonth > 0 : false;
  }

  function canAddIntegration(): boolean {
    const limits = tierLimits();
    return limits ? hasUnlimited(limits.maxIntegrations) || limits.maxIntegrations > 0 : false;
  }

  function canInviteTeamMember(): boolean {
    const limits = tierLimits();
    return limits ? hasUnlimited(limits.maxTeamMembers) || limits.maxTeamMembers > 1 : false;
  }

  function isWhiteLabel(): boolean {
    const limits = tierLimits();
    return limits?.whiteLabel ?? false;
  }

  // ==========================================
  // Usage helpers
  // ==========================================

  function usagePercent(used: number, limit: number): number {
    if (hasUnlimited(limit)) return 0;
    if (limit <= 0) return 100;
    return Math.min(100, Math.round((used / limit) * 100));
  }

  // ==========================================
  // API actions
  // ==========================================

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/payments/current-plan");
      if (!res.ok) {
        throw new Error("Failed to fetch subscription");
      }
      const data = await res.json();
      const sub = data.data as Subscription;
      setSubscription(sub);

      // Update tier limits from server if available, otherwise use defaults
      if (sub) {
        setTierLimits(getTierLimits(sub.tier));
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function subscribe(tier: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/payments/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message ?? "Subscription failed");
      }
      const data = await res.json();
      const sub = data.data as Subscription;
      setSubscription(sub);
      setTierLimits(getTierLimits(sub.tier));
    } catch (e) {
      setError((e as Error).message);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function cancel() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/payments/cancel", {
        method: "POST",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message ?? "Cancelation failed");
      }
      const data = await res.json();
      setSubscription(data.data as Subscription);
    } catch (e) {
      setError((e as Error).message);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function openPortal() {
    try {
      const res = await fetch("/api/payments/portal");
      if (!res.ok) {
        throw new Error("Failed to get portal URL");
      }
      const data = await res.json();
      if (data.data?.url && typeof window !== "undefined") {
        window.location.href = data.data.url;
      }
    } catch (e) {
      setError((e as Error).message);
    }
  }

  // Fetch subscription on mount
  onMount(() => {
    refresh();
  });

  const value: SubscriptionContextValue = {
    subscription,
    tierLimits,
    currentTier,
    loading,
    error,
    canCreateBrand,
    canCreateProduct,
    canBatchExport,
    canAccessApi,
    canUseAiGeneration,
    canAddIntegration,
    canInviteTeamMember,
    isWhiteLabel,
    refresh,
    subscribe,
    cancel,
    openPortal,
    usagePercent,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {props.children}
    </SubscriptionContext.Provider>
  );
}

// ==========================================
// Hook
// ==========================================

export function useSubscription(): SubscriptionContextValue {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return ctx;
}
