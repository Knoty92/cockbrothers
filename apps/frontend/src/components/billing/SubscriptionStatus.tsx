/**
 * SubscriptionStatus — shows current plan info, usage bar,
 * and actions (upgrade, cancel, portal).
 */

import { Component, For, Show } from 'solid-js';
import { getTierConfig, formatPrice } from '../../lib/stripe/client';
import type { CurrentPlan } from '../../lib/api/payments';

interface SubscriptionStatusProps {
  plan: CurrentPlan | null;
  loading: boolean;
  onUpgrade: () => void;
  onCancel: () => void;
  onOpenPortal: () => void;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  active: { label: 'Active', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
  trialing: { label: 'Trial', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
  past_due: { label: 'Past Due', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
  canceled: { label: 'Canceled', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
  incomplete: { label: 'Incomplete', color: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' },
};

export const SubscriptionStatus: Component<SubscriptionStatusProps> = (props) => {
  const statusInfo = () =>
    STATUS_LABELS[props.plan?.status ?? 'active'] ?? STATUS_LABELS.active;

  const config = () => getTierConfig(props.plan?.tier ?? 'free');

  const periodEnd = () => {
    if (!props.plan?.currentPeriodEnd) return '';
    try {
      return new Date(props.plan.currentPeriodEnd).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return props.plan.currentPeriodEnd;
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <div class="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <Show when={props.loading} fallback={
        <Show
          when={props.plan}
          fallback={
            <div class="py-8 text-center text-sm text-gray-500">Unable to load subscription data.</div>
          }
        >
          {/* Current plan header */}
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {config()?.label ?? props.plan!.tier} Plan
              </h3>
              <div class="mt-1 flex items-center gap-2">
                <span class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusInfo().color}`}>
                  {statusInfo().label}
                </span>
                <Show when={props.plan!.trialEnd}>
                  <span class="text-xs text-gray-500">
                    Trial ends {new Date(props.plan!.trialEnd!).toLocaleDateString()}
                  </span>
                </Show>
              </div>
              <Show when={periodEnd()}>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Current period ends {periodEnd()}
                </p>
              </Show>
            </div>

            <div class="flex flex-wrap gap-2">
              <button
                onClick={props.onOpenPortal}
                class="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Manage billing
              </button>
              <Show when={props.plan?.tier !== 'free' && props.plan?.status === 'active'}>
                <button
                  onClick={props.onCancel}
                  class="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950"
                >
                  Cancel
                </button>
              </Show>
            </div>
          </div>

          {/* Usage bars */}
          <div class="mt-6 space-y-4 border-t border-gray-200 pt-6 dark:border-gray-700">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Usage this period
            </h4>

            <UsageBar
              label="AI Generations"
              used={props.plan!.usage.aiGenerationsUsed}
              limit={config()?.aiGenerations ?? 0}
              format={(n) => `${n}`}
            />
            <UsageBar
              label="Mockups Generated"
              used={props.plan!.usage.mockupsGenerated}
              limit={config()?.maxMockups ?? 0}
              format={(n) => `${n}`}
            />
            <UsageBar
              label="Storage"
              used={props.plan!.usage.storageBytesUsed}
              limit={500 * 1024 * 1024} // 500MB default
              format={formatBytes}
            />
          </div>

          {/* Plan features summary */}
          <Show when={config()}>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <FeatureStat label="Brands" value={config()!.maxBrands === 0 ? 'Unlimited' : `${config()!.maxBrands}`} />
              <FeatureStat label="Products" value={config()!.maxProducts === 0 ? 'Unlimited' : `${config()!.maxProducts}`} />
              <FeatureStat label="Mockups" value={config()!.maxMockups === 0 ? 'Unlimited' : `${config()!.maxMockups}`} />
              <FeatureStat label="Integrations" value={config()!.integrations === 0 ? 'Unlimited' : `${config()!.integrations}`} />
              <FeatureStat label="Team size" value={config()!.teamMembers === 0 ? 'Unlimited' : `${config()!.teamMembers}`} />
              <FeatureStat label="API access" value={config()!.apiAccess ? 'Yes' : 'No'} />
            </div>
          </Show>
        </Show>
      }>
        <div class="flex items-center justify-center py-8">
          <svg class="h-8 w-8 animate-spin text-indigo-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      </Show>
    </div>
  );
};

/* ─── Sub-components ────────────────────────────────────────── */

function UsageBar(props: {
  label: string;
  used: number;
  limit: number;
  format: (n: number) => string;
}) {
  const isUnlimited = () => props.limit === 0;
  const pct = () =>
    isUnlimited() ? 0 : Math.min(100, Math.round((props.used / props.limit) * 100));
  const isOverLimit = () => !isUnlimited() && props.used >= props.limit;

  return (
    <div>
      <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
        <span>{props.label}</span>
        <span class={isOverLimit() ? 'text-red-500 font-medium' : ''}>
          {props.format(props.used)}
          {isUnlimited() ? '' : ` / ${props.format(props.limit)}`}
        </span>
      </div>
      <Show when={!isUnlimited()}>
        <div class="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
          <div
            class={`h-full rounded-full transition-all ${
              isOverLimit()
                ? 'bg-red-500'
                : pct() > 80
                  ? 'bg-yellow-500'
                  : 'bg-indigo-500'
            }`}
            style={{ width: `${Math.min(100, pct())}%` }}
          />
        </div>
      </Show>
    </div>
  );
}

function FeatureStat(props: { label: string; value: string }) {
  return (
    <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
      <p class="text-xs text-gray-500 dark:text-gray-400">{props.label}</p>
      <p class="mt-0.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
        {props.value}
      </p>
    </div>
  );
}
