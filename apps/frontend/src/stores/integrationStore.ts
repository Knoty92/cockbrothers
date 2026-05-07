/**
 * Solid store for POD integrations state management.
 *
 * Manages:
 * - List of connected platform integrations
 * - Sync/push job queues
 * - Platform-specific product catalogs
 * - Connection status
 */

import { createStore, produce } from 'solid-js/store';
import type {
  PODPlatform,
  PODProduct,
  PODPushResult,
  Integration,
  PushJob,
} from '../lib/pod/types';
import * as api from '../lib/api/integrations';

/* ─── State Shape ───────────────────────────────────────────── */

interface IntegrationState {
  /** All integrations for the current user */
  integrations: Integration[];
  /** Platforms currently being synced */
  syncing: PODPlatform[];
  /** Push job queue (in-flight + completed) */
  pushQueue: PushJob[];
  /** Cached product catalogs keyed by platform */
  catalogs: Partial<Record<PODPlatform, PODProduct[]>>;
  /** Per-platform loading state */
  loading: Partial<Record<PODPlatform, boolean>>;
  /** Global loading */
  loadingList: boolean;
  /** Error message per platform */
  errors: Partial<Record<PODPlatform, string>>;
}

const initialState: IntegrationState = {
  integrations: [],
  syncing: [],
  pushQueue: [],
  catalogs: {},
  loading: {},
  loadingList: false,
  errors: {},
};

/* ─── Store ─────────────────────────────────────────────────── */

function createIntegrationStore() {
  const [state, setState] = createStore<IntegrationState>(initialState);

  /* ─── Derived ──────────────────────────────────────────── */

  const getIntegration = (platform: PODPlatform) =>
    state.integrations.find((i) => i.platform === platform) ?? null;

  const isConnected = (platform: PODPlatform) =>
    state.integrations.some(
      (i) => i.platform === platform && i.isActive,
    );

  const connectedPlatforms = () =>
    state.integrations
      .filter((i) => i.isActive)
      .map((i) => i.platform);

  const isSyncing = (platform: PODPlatform) =>
    state.syncing.includes(platform);

  const getCatalog = (platform: PODPlatform) =>
    state.catalogs[platform] ?? [];

  const getPushQueue = (platform?: PODPlatform) =>
    platform
      ? state.pushQueue.filter((j) => j.platform === platform)
      : state.pushQueue;

  /* ─── Actions ──────────────────────────────────────────── */

  /** Fetch all integrations from the server. */
  async function fetchIntegrations(): Promise<void> {
    setState('loadingList', true);
    try {
      const integrations = await api.listIntegrations();
      setState(
        produce((s) => {
          s.integrations = integrations;
          s.loadingList = false;
          s.errors = {};
        }),
      );
    } catch (err) {
      setState('loadingList', false);
      setState('errors', produce((e) => { e['*'] = (err as Error).message; }));
    }
  }

  /** Connect to a POD platform (starts OAuth flow). */
  async function connect(
    platform: PODPlatform,
    redirectPath?: string,
  ): Promise<void> {
    setState('loading', platform, true);
    try {
      const { authUrl } = await api.connectPlatform(platform, redirectPath);
      // Redirect the browser to the OAuth provider
      window.location.href = authUrl;
    } catch (err) {
      setState('loading', platform, false);
      setState('errors', produce((e) => { e[platform] = (err as Error).message; }));
    }
  }

  /** Disconnect an integration and remove it from local state. */
  async function disconnect(platform: PODPlatform): Promise<void> {
    setState('loading', platform, true);
    try {
      await api.disconnectPlatform(platform);
      setState(
        produce((s) => {
          s.integrations = s.integrations.filter(
            (i) => i.platform !== platform,
          );
          delete s.catalogs[platform];
          s.loading[platform] = false;
          delete s.errors[platform];
        }),
      );
    } catch (err) {
      setState('loading', platform, false);
      setState('errors', produce((e) => { e[platform] = (err as Error).message; }));
    }
  }

  /** Trigger a sync for a specific platform. */
  async function sync(platform: PODPlatform): Promise<void> {
    if (isSyncing(platform)) return;
    setState('syncing', (prev) => [...prev, platform]);
    try {
      await api.syncPlatform(platform);
      setState('syncing', (prev) => prev.filter((p) => p !== platform));
      // Refetch integrations to get updated lastSyncAt
      await fetchIntegrations();
    } catch (err) {
      setState('syncing', (prev) => prev.filter((p) => p !== platform));
      setState('errors', produce((e) => { e[platform] = (err as Error).message; }));
    }
  }

  /** Fetch the product catalog from a connected platform. */
  async function fetchCatalog(
    platform: PODPlatform,
    options?: { limit?: number; offset?: number },
  ): Promise<PODProduct[]> {
    setState('loading', platform, true);
    try {
      const products = await api.getPlatformProducts(platform, options);
      setState('catalogs', produce((c) => { c[platform] = products; }));
      setState('loading', platform, false);
      return products;
    } catch (err) {
      setState('loading', platform, false);
      setState('errors', produce((e) => { e[platform] = (err as Error).message; }));
      return [];
    }
  }

  /** Push designs to a platform. Tracks progress in pushQueue. */
  async function pushDesigns(
    platform: PODPlatform,
    payload: Parameters<typeof api.pushDesigns>[1],
  ): Promise<PODPushResult | null> {
    const pushJob: PushJob = {
      id: crypto.randomUUID(),
      platform,
      productId: payload.productId,
      status: 'queued',
      progress: 0,
    };

    setState('pushQueue', (prev) => [...prev, pushJob]);

    try {
      setState('pushQueue', (job) => job.id === pushJob.id, 'status', 'pushing');
      setState('pushQueue', (job) => job.id === pushJob.id, 'progress', 50);

      const result = await api.pushDesigns(platform, payload);

      setState(
        'pushQueue',
        (job) => job.id === pushJob.id,
        produce((job) => {
          job.status = result.success ? 'done' : 'failed';
          job.progress = 100;
          job.result = result;
        }),
      );

      return result;
    } catch (err) {
      setState(
        'pushQueue',
        (job) => job.id === pushJob.id,
        produce((job) => {
          job.status = 'failed';
          job.error = (err as Error).message;
        }),
      );
      return null;
    }
  }

  /** Clear errors for a specific platform (or all). */
  function clearError(platform?: PODPlatform): void {
    if (platform) {
      setState('errors', produce((e) => { delete e[platform]; }));
    } else {
      setState('errors', {});
    }
  }

  /** Reset the entire store. */
  function reset(): void {
    setState(initialState);
  }

  return {
    state,
    getIntegration,
    isConnected,
    connectedPlatforms,
    isSyncing,
    getCatalog,
    getPushQueue,
    fetchIntegrations,
    connect,
    disconnect,
    sync,
    fetchCatalog,
    pushDesigns,
    clearError,
    reset,
  };
}

export const integrationStore = createIntegrationStore();
