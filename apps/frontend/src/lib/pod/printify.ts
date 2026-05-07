/**
 * Printify API adapter — implements the PODAdapter interface.
 *
 * Printify uses OAuth 2.0 with access + refresh tokens.
 * Docs: https://developers.printify.com/
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
  PODVariant,
} from './types';

const PRINTIFY_API_BASE = 'https://api.printify.com/v1';

function mapPrintifyProduct(raw: Record<string, unknown>): PODProduct {
  return {
    id: String(raw.id),
    name: String(raw.title ?? ''),
    description: String(raw.description ?? ''),
    type: String(raw.blueprint_id ?? ''),
    variants: Array.isArray(raw.variants)
      ? raw.variants.map((v: Record<string, unknown>) => ({
          id: String(v.id),
          name: String(v.title ?? ''),
          color: String(v.color ?? ''),
          size: String(v.size ?? ''),
          price: Number(v.price ?? 0),
          currency: 'USD',
          isAvailable: v.is_available !== false,
        }))
      : [],
    images: Array.isArray(raw.images)
      ? raw.images.map((img: Record<string, unknown>) => ({
          id: String(img.id),
          url: String(img.src ?? ''),
          variantIds: (img.variant_ids as string[]) ?? [],
          position: 'front' as const,
        }))
      : [],
  };
}

export interface PrintifyBlueprint {
  id: number;
  title: string;
  description: string;
  category: string;
  brand: string;
  model: string;
  images: { src: string }[];
}

export interface PrintifyPrintProvider {
  id: number;
  title: string;
  location: { country: string; address: string };
}

export type PrintifyExtendedAdapter = PODAdapter & {
  getBlueprints(category?: string): Promise<PrintifyBlueprint[]>;
  getPrintProviders(blueprintId: string): Promise<PrintifyPrintProvider[]>;
  getBlueprintVariants(
    blueprintId: string,
    printProviderId: string,
  ): Promise<PODVariant[]>;
};

export function createPrintifyAdapter(
  accessToken: string,
  shopId: string,
): PrintifyExtendedAdapter {
  let _accessToken = accessToken;
  let _shopId = shopId;

  async function request<T>(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<T> {
    const url = new URL(`${PRINTIFY_API_BASE}${path}`);
    const headers: Record<string, string> = {
      Authorization: `Bearer ${_accessToken}`,
    };
    if (body) headers['Content-Type'] = 'application/json';

    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`Printify API ${res.status}: ${errBody}`);
    }

    return res.json();
  }

  // --- Printify-specific helpers ---

  async function getBlueprints(category?: string): Promise<PrintifyBlueprint[]> {
    const blueprints = await request<PrintifyBlueprint[]>('GET', '/blueprints.json');
    return category
      ? blueprints.filter((b) => b.category === category)
      : blueprints;
  }

  async function getPrintProviders(
    blueprintId: string,
  ): Promise<PrintifyPrintProvider[]> {
    return request<PrintifyPrintProvider[]>(
      'GET',
      `/blueprints/${blueprintId}/print_providers.json`,
    );
  }

  async function getBlueprintVariants(
    blueprintId: string,
    printProviderId: string,
  ): Promise<PODVariant[]> {
    const res = await request<{ variants: Record<string, unknown>[] }>(
      'GET',
      `/blueprints/${blueprintId}/print_providers/${printProviderId}/variants.json`,
    );
    return res.variants.map((v) => ({
      id: String(v.id),
      name: String(v.title ?? ''),
      color: String(v.color ?? ''),
      size: String(v.size ?? ''),
      price: Number(v.price ?? 0),
      currency: 'USD',
      isAvailable: true,
    }));
  }

  return {
    platform: 'printify',

    async connect(credentials: PODCredentials): Promise<PODConnection> {
      _accessToken = credentials.accessToken ?? _accessToken;
      _shopId = credentials.shopId ?? _shopId;

      const shop = await request<{ id: string; title: string }>(
        'GET',
        `/shops/${_shopId}.json`,
      );
      return {
        platform: 'printify',
        connected: true,
        storeName: shop.title,
        storeId: shop.id,
      };
    },

    async disconnect(): Promise<void> {
      _accessToken = '';
      _shopId = '';
    },

    async getConnectionStatus(): Promise<PODConnectionStatus> {
      try {
        await request('GET', `/shops/${_shopId}.json`);
        return 'connected';
      } catch {
        return 'disconnected';
      }
    },

    async getProducts(options?: PODCatalogOptions): Promise<PODProduct[]> {
      const params = new URLSearchParams();
      if (options?.limit) params.set('limit', String(options.limit));
      if (options?.page) params.set('page', String(options.page));

      const res = await request<{ data: Record<string, unknown>[] }>(
        'GET',
        `/shops/${_shopId}/products.json?${params}`,
      );
      return res.data.map(mapPrintifyProduct);
    },

    async getProduct(productId: string): Promise<PODProduct> {
      const raw = await request<Record<string, unknown>>(
        'GET',
        `/shops/${_shopId}/products/${productId}.json`,
      );
      return mapPrintifyProduct(raw);
    },

    async getCategories(): Promise<PODCategory[]> {
      const blueprints = await getBlueprints();
      const catMap = new Map<string, number>();
      for (const bp of blueprints) {
        catMap.set(bp.category, (catMap.get(bp.category) ?? 0) + 1);
      }
      return Array.from(catMap.entries()).map(([name, productCount]) => ({
        id: name,
        name,
        productCount,
      }));
    },

    async pushDesign(payload: PODPushPayload): Promise<PODPushResult> {
      const body: Record<string, unknown> = {
        title: payload.title,
        description: payload.description,
        tags: payload.tags,
        blueprint_id: Number(payload.externalProductId),
        print_areas: payload.variantMapping.map((v) => ({
          variant_ids: [Number(v.externalVariantId)],
          placeholders: [
            {
              position: v.position,
              images: [{ src: v.mockupUrl }],
            },
          ],
        })),
        is_published: payload.publish,
      };

      try {
        const product = await request<{ id: string }>(
          'POST',
          `/shops/${_shopId}/products.json`,
          body,
        );
        return {
          success: true,
          externalProductId: product.id,
          externalUrl: `https://printify.com/shop/${_shopId}/product/${product.id}`,
        };
      } catch (err) {
        return {
          success: false,
          externalProductId: payload.externalProductId,
          externalUrl: '',
          errors: [{ variantId: 'all', message: (err as Error).message }],
        };
      }
    },

    async updateDesign(
      productId: string,
      payload: Partial<PODPushPayload>,
    ): Promise<PODPushResult> {
      const body: Record<string, unknown> = {};
      if (payload.title) body.title = payload.title;
      if (payload.description) body.description = payload.description;
      if (payload.variantMapping) {
        body.print_areas = payload.variantMapping.map((v) => ({
          variant_ids: [Number(v.externalVariantId)],
          placeholders: [
            {
              position: v.position,
              images: [{ src: v.mockupUrl }],
            },
          ],
        }));
      }
      await request('PUT', `/shops/${_shopId}/products/${productId}.json`, body);
      return {
        success: true,
        externalProductId: productId,
        externalUrl: `https://printify.com/shop/${_shopId}/product/${productId}`,
      };
    },

    async deleteDesign(productId: string): Promise<void> {
      await request('DELETE', `/shops/${_shopId}/products/${productId}.json`);
    },

    async registerWebhook(url: string, events: string[]): Promise<void> {
      await request('POST', `/shops/${_shopId}/webhooks.json`, { url, events });
    },

    async handleWebhook(payload: unknown): Promise<void> {
      console.info('Printify webhook received:', payload);
    },

    // Extended helpers
    getBlueprints,
    getPrintProviders,
    getBlueprintVariants,
  };
}
