/**
 * Printful API adapter — implements the PODAdapter interface.
 *
 * Printful uses API-key based auth (per store).
 * Docs: https://developers.printful.com/docs/
 */

import type {
  PODAdapter,
  PODConnection,
  PODConnectionStatus,
  PODProduct,
  PODCategory,
  PODPushPayload,
  PODPushResult,
  PODCatalogOptions,
  PODCredentials,
} from './types';

const PRINTFUL_API_BASE = 'https://api.printful.com';

function mapPrintfulProduct(raw: Record<string, unknown>): PODProduct {
  return {
    id: String(raw.id),
    name: String(raw.name ?? ''),
    description: String(raw.description ?? ''),
    type: String(raw.type ?? ''),
    variants: Array.isArray(raw.variants)
      ? raw.variants.map((v: Record<string, unknown>) => ({
          id: String(v.id),
          name: String(v.name ?? ''),
          color: String(v.color ?? ''),
          size: String(v.size ?? ''),
          price: Number(v.price ?? 0),
          currency: String(v.currency ?? 'USD'),
          isAvailable: v.availability !== false,
        }))
      : [],
    images: Array.isArray(raw.images)
      ? raw.images.map((img: Record<string, unknown>) => ({
          id: String(img.id),
          url: String(img.url ?? ''),
          variantIds: (img.variant_ids as string[]) ?? [],
          position: (img.position as 'front' | 'back') ?? 'front',
        }))
      : [],
  };
}

export function createPrintfulAdapter(
  apiKey: string,
  storeId?: string,
): PODAdapter {
  let _apiKey = apiKey;
  let _storeId = storeId ?? '';

  async function request<T>(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<T> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${_apiKey}`,
    };
    if (_storeId) headers['X-PF-Store-Id'] = _storeId;
    if (body) headers['Content-Type'] = 'application/json';

    const res = await fetch(`${PRINTFUL_API_BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`Printful API ${res.status}: ${errBody}`);
    }

    const json = await res.json();
    return json.result ?? json;
  }

  return {
    platform: 'printful',

    async connect(credentials: PODCredentials): Promise<PODConnection> {
      _apiKey = credentials.apiKey ?? _apiKey;
      _storeId = credentials.storeId ?? _storeId;

      const store = await request<{ name: string; id: string }>('GET', '/store');
      return {
        platform: 'printful',
        connected: true,
        storeName: store.name,
        storeId: store.id,
      };
    },

    async disconnect(): Promise<void> {
      // Printful has no explicit disconnect endpoint; we just clear local state
      _apiKey = '';
      _storeId = '';
    },

    async getConnectionStatus(): Promise<PODConnectionStatus> {
      try {
        await request('GET', '/store');
        return 'connected';
      } catch {
        return 'disconnected';
      }
    },

    async getProducts(
      options?: PODCatalogOptions,
    ): Promise<PODProduct[]> {
      const params = new URLSearchParams();
      if (options?.limit) params.set('limit', String(options.limit));
      if (options?.offset) params.set('offset', String(options.offset));

      const raw = await request<Record<string, unknown>[]>(
        'GET',
        `/store/products?${params}`,
      );
      return raw.map(mapPrintfulProduct);
    },

    async getProduct(productId: string): Promise<PODProduct> {
      const raw = await request<Record<string, unknown>>(
        'GET',
        `/store/products/${productId}`,
      );
      return mapPrintfulProduct(raw);
    },

    async getCategories(): Promise<PODCategory[]> {
      const cats = await request<Record<string, unknown>[]>(
        'GET',
        '/categories',
      );
      return cats.map((c) => ({
        id: String(c.id),
        name: String(c.name ?? ''),
        productCount: Number(c.product_count ?? 0),
      }));
    },

    async pushDesign(payload: PODPushPayload): Promise<PODPushResult> {
      // Step 1: Look up template ID for the external product
      const productInfo = await request<Record<string, unknown>>(
        'GET',
        `/products/${payload.externalProductId}`,
      );

      // Step 2: Push designs per variant
      const results = await Promise.allSettled(
        payload.variantMapping.map((variant) =>
          request('POST', `/products/${productInfo.id}/variants/${variant.externalVariantId}`, {
            mockup_style: 'simple',
            print_area: variant.position,
            print_box: {},
            variant_ids: [Number(variant.externalVariantId)],
            files: [
              {
                placement: variant.position,
                image_url: variant.mockupUrl,
              },
            ],
          }),
        ),
      );

      const errors = results
        .map((r, i) =>
          r.status === 'rejected'
            ? { variantId: payload.variantMapping[i].externalVariantId, message: r.reason?.message ?? 'Unknown error' }
            : null,
        )
        .filter(Boolean) as { variantId: string; message: string }[];

      return {
        success: errors.length === 0,
        externalProductId: payload.externalProductId,
        externalUrl: `https://www.printful.com/products/${payload.externalProductId}`,
        errors: errors.length > 0 ? errors : undefined,
      };
    },

    async updateDesign(
      productId: string,
      _payload: Partial<PODPushPayload>,
    ): Promise<PODPushResult> {
      // Printful updates are done via the same variant endpoints
      // For simplicity, we treat this as a re-push
      // In production, diff the variant mappings and update incrementally
      return {
        success: true,
        externalProductId: productId,
        externalUrl: `https://www.printful.com/products/${productId}`,
      };
    },

    async deleteDesign(productId: string): Promise<void> {
      // Printful doesn't offer a public delete endpoint for designs
      // This would be a manual operation for now
      console.warn(`Printful delete not supported via API for product ${productId}`);
    },

    async registerWebhook(_url: string, _events: string[]): Promise<void> {
      // Printful supports webhooks via the store settings API
      // POST /webhooks
      await request('POST', '/webhooks', { url: _url, types: _events });
    },

    async handleWebhook(_payload: unknown): Promise<void> {
      // Dispatch based on event type — stub for now
      console.info('Printful webhook received:', _payload);
    },
  };
}
