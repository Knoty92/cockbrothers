/**
 * Integrations API calls — typed functions for every integration endpoint.
 */

import type { PODPlatform, PODProduct, Integration } from '../pod/types';

const BASE = '/api/integrations';

interface ApiResponse<T> {
  data: T;
  error?: { code: string; message: string };
}

/**
 * List all integrations for the current user.
 */
export async function listIntegrations(): Promise<Integration[]> {
  const res = await fetch(BASE);
  const json: ApiResponse<Integration[]> = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.data;
}

/**
 * Start OAuth flow for a platform (returns redirect URL).
 */
export async function connectPlatform(
  platform: PODPlatform,
  redirectPath?: string,
): Promise<{ authUrl: string }> {
  const params = new URLSearchParams();
  if (redirectPath) params.set('redirect', redirectPath);

  const res = await fetch(`${BASE}/${platform}/connect?${params}`, {
    method: 'POST',
  });
  const json: ApiResponse<{ authUrl: string }> = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.data;
}

/**
 * Disconnect a platform integration.
 */
export async function disconnectPlatform(platform: PODPlatform): Promise<void> {
  const res = await fetch(`${BASE}/${platform}`, { method: 'DELETE' });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json?.error?.message ?? 'Failed to disconnect');
  }
}

/**
 * Trigger a sync for a specific platform.
 */
export async function syncPlatform(platform: PODPlatform): Promise<void> {
  const res = await fetch(`${BASE}/${platform}/sync`, { method: 'POST' });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json?.error?.message ?? 'Sync failed');
  }
}

/**
 * Get the product catalog from a connected platform.
 */
export async function getPlatformProducts(
  platform: PODPlatform,
  options?: { limit?: number; offset?: number },
): Promise<PODProduct[]> {
  const params = new URLSearchParams();
  if (options?.limit) params.set('limit', String(options.limit));
  if (options?.offset) params.set('offset', String(options.offset));

  const res = await fetch(`${BASE}/${platform}/products?${params}`);
  const json: ApiResponse<PODProduct[]> = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.data;
}

/**
 * Push designs to a connected platform.
 */
export async function pushDesigns(
  platform: PODPlatform,
  payload: {
    productId: string;
    externalProductId: string;
    variantMapping: { externalVariantId: string; mockupUrl: string; position: string }[];
    title: string;
    description: string;
    tags: string[];
    publish: boolean;
  },
): Promise<{ success: boolean; externalProductId: string; externalUrl: string; errors?: { variantId: string; message: string }[] }> {
  const res = await fetch(`${BASE}/${platform}/push`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json: ApiResponse<Record<string, unknown>> = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.data as unknown as { success: boolean; externalProductId: string; externalUrl: string; errors?: { variantId: string; message: string }[] };
}

/**
 * Get connection status for a specific platform.
 */
export async function getPlatformStatus(
  platform: PODPlatform,
): Promise<{ connected: boolean; storeName?: string; error?: string }> {
  const res = await fetch(`${BASE}/${platform}/status`);
  const json: ApiResponse<{ connected: boolean; storeName?: string; error?: string }> = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.data;
}
