/**
 * IntegrationCard — shows the connection status for a single POD platform.
 *
 * Displays platform logo/icon, store name, last sync time,
 * and connect/disconnect/sync actions.
 */

import { Component, Show } from 'solid-js';
import type { PODPlatform, Integration } from '../../lib/pod/types';
import { IntegrationConnectButton } from './IntegrationConnectButton';

interface IntegrationCardProps {
  integration: Integration | null;
  platform: PODPlatform;
  isSyncing: boolean;
  loading: boolean;
  error?: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
  onSync: () => void;
}

const PLATFORM_LABELS: Record<PODPlatform, string> = {
  printful: 'Printful',
  printify: 'Printify',
  shopify: 'Shopify',
  etsy: 'Etsy',
  gelato: 'Gelato',
  spod: 'SPOD',
};

const PLATFORM_DESCRIPTIONS: Record<PODPlatform, string> = {
  printful: 'On-demand printing with worldwide fulfillment',
  printify: 'Global print network with 70+ print providers',
  shopify: 'Sync products directly to your Shopify store',
  etsy: 'List products on the Etsy marketplace',
  gelato: 'Localized printing across 30+ countries',
  spod: 'European print-on-demand network',
};

function formatDate(isoString: string | null): string {
  if (!isoString) return 'Never';
  try {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.round((Date.now() - new Date(isoString).getTime()) / 60000) * -1,
      'minute',
    );
  } catch {
    return new Date(isoString).toLocaleDateString();
  }
}

export const IntegrationCard: Component<IntegrationCardProps> = (props) => {
  const isConnected = () => props.integration?.isActive ?? false;

  return (
    <div
      class={`rounded-lg border p-5 transition-colors ${
        isConnected()
          ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30'
          : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
      }`}
    >
      <div class="flex items-start justify-between gap-4">
        {/* Platform info */}
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-3">
            {/* Platform icon placeholder */}
            <div
              class={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg font-bold ${
                isConnected()
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              {PLATFORM_LABELS[props.platform]?.[0] ?? '?'}
            </div>

            <div class="min-w-0">
              <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100">
                {PLATFORM_LABELS[props.platform]}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                {PLATFORM_DESCRIPTIONS[props.platform]}
              </p>
            </div>
          </div>

          {/* Connection details */}
          <Show when={isConnected() && props.integration}>
            <div class="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <span class="font-medium">Store:</span>{' '}
                {props.integration!.displayName ??
                  props.integration!.platformStoreId ??
                  PLATFORM_LABELS[props.platform]}
              </p>
              <p>
                <span class="font-medium">Last sync:</span>{' '}
                {formatDate(props.integration!.lastSyncAt)}
              </p>
              <Show when={props.integration!.errorMessage}>
                <p class="text-red-500">
                  <span class="font-medium">Error:</span>{' '}
                  {props.integration!.errorMessage}
                </p>
              </Show>
            </div>
          </Show>

          {/* Error message */}
          <Show when={props.error}>
            <p class="mt-2 text-sm text-red-500">{props.error}</p>
          </Show>
        </div>

        {/* Status badge + actions */}
        <div class="flex shrink-0 flex-col items-end gap-2">
          <span
            class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isConnected()
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
            }`}
          >
            {isConnected() ? 'Connected' : 'Not connected'}
          </span>

          <IntegrationConnectButton
            platform={props.platform}
            isConnected={isConnected()}
            loading={props.loading}
            onConnect={props.onConnect}
            onDisconnect={props.onDisconnect}
          />

          <Show when={isConnected()}>
            <button
              onClick={props.onSync}
              disabled={props.isSyncing}
              class="text-xs font-medium text-indigo-600 hover:text-indigo-500 disabled:text-gray-400 disabled:cursor-not-allowed dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {props.isSyncing ? 'Syncing...' : 'Sync now'}
            </button>
          </Show>
        </div>
      </div>
    </div>
  );
};
