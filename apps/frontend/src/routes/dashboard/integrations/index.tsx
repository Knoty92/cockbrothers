/**
 * Integration hub page — /dashboard/integrations
 *
 * Lists all available POD platforms, their connection status,
 * and provides connect/disconnect/sync actions.
 */

import { Component, For, Show } from 'solid-js';
import { useIntegration } from '../../../hooks/useIntegration';
import { IntegrationCard } from '../../../components/integration/IntegrationCard';
import type { PODPlatform } from '../../../lib/pod/types';

const ALL_PLATFORMS: PODPlatform[] = [
  'printful',
  'printify',
];

const PLATFORM_ORDER: PODPlatform[] = [
  'printful',
  'printify',
];

export default function IntegrationsPage() {
  const integration = useIntegration();

  const sortedPlatforms = () =>
    [...ALL_PLATFORMS].sort(
      (a, b) => PLATFORM_ORDER.indexOf(a) - PLATFORM_ORDER.indexOf(b),
    );

  return (
    <div class="mx-auto max-w-4xl space-y-6 p-6">
      {/* Page header */}
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Integrations
        </h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Connect your POD (Print-on-Demand) platforms to push your brand
          designs directly from Cockbrothers.
        </p>
      </div>

      {/* Loading state */}
      <Show when={integration.loading && integration.integrations.length === 0}>
        <div class="flex items-center justify-center py-12">
          <svg
            class="h-8 w-8 animate-spin text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
      </Show>

      {/* Integration list */}
      <Show when={!integration.loading || integration.integrations.length > 0}>
        <div class="space-y-4">
          <For each={sortedPlatforms()}>
            {(platform) => {
              const int = integration.getIntegration(platform);
              const syncing = integration.isSyncing(platform);
              const err = integration.errors[platform] ?? null;

              return (
                <IntegrationCard
                  integration={int}
                  platform={platform}
                  isSyncing={syncing}
                  loading={
                    integration.errors[platform]
                      ? false
                      : syncing
                  }
                  error={err}
                  onConnect={() =>
                    integration.connect(
                      platform,
                      window.location.pathname,
                    )
                  }
                  onDisconnect={() =>
                    integration.disconnect(platform)
                  }
                  onSync={() => integration.sync(platform)}
                />
              );
            }}
          </For>
        </div>
      </Show>

      {/* Info card */}
      <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
        <h3 class="text-sm font-semibold text-blue-800 dark:text-blue-200">
          How it works
        </h3>
        <ol class="mt-2 list-inside list-decimal space-y-1 text-sm text-blue-700 dark:text-blue-300">
          <li>Connect your Printful or Printify account</li>
          <li>Select a product from their catalog</li>
          <li>Push your brand designs directly to the platform</li>
          <li>Manage fulfillment and orders on the platform</li>
        </ol>
      </div>
    </div>
  );
}
