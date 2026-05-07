/**
 * Hook for POD integration state, wrapping the integrationStore
 * with a convenient component-level API.
 *
 * Usage:
 *   const { integrations, isConnected, connect, disconnect } = useIntegration();
 *   const { isConnected: pfConnected, catalog } = useIntegration('printful');
 */

import { createEffect, onCleanup } from 'solid-js';
import { integrationStore } from '../stores/integrationStore';
import type {
  PODPlatform,
  PODProduct,
  PODPushResult,
  Integration,
  PushJob,
} from '../lib/pod/types';

export function useIntegration(platform?: PODPlatform) {
  const {
    state,
    fetchIntegrations,
    connect: storeConnect,
    disconnect: storeDisconnect,
    sync: storeSync,
    fetchCatalog,
    pushDesigns,
    clearError,
    isConnected,
    isSyncing,
  } = integrationStore;

  // Fetch integrations on mount if not loaded yet
  createEffect(() => {
    if (state.loadingList === false && state.integrations.length === 0) {
      fetchIntegrations();
    }
  });

  onCleanup(() => {
    // Any cleanup needed
  });

  return {
    /** All integrations */
    get integrations(): Integration[] {
      return state.integrations;
    },

    /** Loading state for the list */
    get loading(): boolean {
      return state.loadingList;
    },

    /** Errors keyed by platform */
    get errors(): Partial<Record<PODPlatform, string>> {
      return state.errors;
    },

    /** Check if a specific platform is connected */
    isConnected: (p?: PODPlatform) =>
      isConnected(platform ?? p ?? 'printful'),

    /** Check if a platform is currently syncing */
    isSyncing: (p?: PODPlatform) =>
      isSyncing(platform ?? p ?? 'printful'),

    /** Get the specific integration for a platform */
    getIntegration: (p?: PODPlatform): Integration | null => {
      const key = platform ?? p;
      if (!key) return null;
      return state.integrations.find((i) => i.platform === key) ?? null;
    },

    /** Get cached catalog products for a platform */
    getCatalog: (p?: PODPlatform): PODProduct[] => {
      const key = platform ?? p;
      if (!key) return [];
      return state.catalogs[key] ?? [];
    },

    /** Get push queue for a platform (or all) */
    getPushQueue: (p?: PODPlatform): PushJob[] => {
      const key = platform ?? p;
      if (key) return state.pushQueue.filter((j) => j.platform === key);
      return state.pushQueue;
    },

    /** Connected platforms list */
    get connectedPlatforms(): PODPlatform[] {
      return state.integrations
        .filter((i) => i.isActive)
        .map((i) => i.platform);
    },

    /** Refresh all integrations from the server */
    refreshIntegrations: fetchIntegrations,

    /** Start OAuth connect flow for a platform */
    connect: (p: PODPlatform, redirectPath?: string) =>
      storeConnect(p, redirectPath),

    /** Disconnect a platform */
    disconnect: (p: PODPlatform) => storeDisconnect(p),

    /** Trigger a sync for a platform */
    sync: (p: PODPlatform) => storeSync(p),

    /** Fetch platform product catalog */
    fetchCatalog: (p: PODPlatform, options?: { limit?: number; offset?: number }) =>
      fetchCatalog(p, options),

    /** Push designs to a platform */
    pushDesigns: (
      p: PODPlatform,
      payload: Parameters<typeof pushDesigns>[1],
    ): Promise<PODPushResult | null> => pushDesigns(p, payload),

    /** Clear errors */
    clearError: (p?: PODPlatform) => clearError(p),
  };
}
