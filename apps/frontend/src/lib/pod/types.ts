/**
 * Shared POD types — used across all POD platform adapters,
 * API routes, stores, and UI components.
 */

export type PODPlatform = 'printful' | 'printify' | 'shopify' | 'etsy' | 'gelato' | 'spod';

export type PODConnectionStatus = 'connected' | 'disconnected' | 'expired' | 'error';

export interface PODProduct {
  id: string;
  name: string;
  description: string;
  type: string; // "tshirt", "hoodie", "mug", etc.
  variants: PODVariant[];
  images: PODImage[];
}

export interface PODVariant {
  id: string;
  name: string;
  color: string;
  size: string;
  price: number;
  currency: string;
  isAvailable: boolean;
}

export interface PODImage {
  id: string;
  url: string;
  variantIds: string[];
  position: 'front' | 'back' | 'left' | 'right';
}

export interface PODCategory {
  id: string;
  name: string;
  productCount: number;
}

export interface PODConnection {
  platform: PODPlatform;
  connected: boolean;
  storeName: string;
  storeId: string;
}

export interface PODCredentials {
  apiKey?: string;
  accessToken?: string;
  refreshToken?: string;
  shopId?: string;
  storeId?: string;
}

export interface PODPushPayload {
  productId: string;
  externalProductId: string;
  variantMapping: {
    externalVariantId: string;
    mockupUrl: string;
    position: string;
  }[];
  title: string;
  description: string;
  tags: string[];
  publish: boolean;
}

export interface PODPushResult {
  success: boolean;
  externalProductId: string;
  externalUrl: string;
  errors?: { variantId: string; message: string }[];
}

export interface PODCatalogOptions {
  limit?: number;
  offset?: number;
  page?: number;
}

export interface PODAdapter {
  platform: PODPlatform;

  connect(credentials: PODCredentials): Promise<PODConnection>;
  disconnect(): Promise<void>;
  getConnectionStatus(): Promise<PODConnectionStatus>;

  getProducts(options?: PODCatalogOptions): Promise<PODProduct[]>;
  getProduct(productId: string): Promise<PODProduct>;
  getCategories(): Promise<PODCategory[]>;

  pushDesign(payload: PODPushPayload): Promise<PODPushResult>;
  updateDesign(productId: string, payload: Partial<PODPushPayload>): Promise<PODPushResult>;
  deleteDesign(productId: string): Promise<void>;

  registerWebhook(url: string, events: string[]): Promise<void>;
  handleWebhook(payload: unknown): Promise<void>;
}

/** DB-facing row from the integrations table */
export interface Integration {
  id: string;
  userId: string;
  platform: PODPlatform;
  displayName: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiresAt: string | null;
  apiKey: string | null;
  platformStoreId: string | null;
  platformData: Record<string, unknown> | null;
  isActive: boolean;
  lastSyncAt: string | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SyncJob {
  platform: PODPlatform;
  status: 'pending' | 'syncing' | 'done' | 'error';
  startedAt: string;
  completedAt?: string;
  error?: string;
}

export interface PushJob {
  id: string;
  platform: PODPlatform;
  productId: string;
  status: 'queued' | 'pushing' | 'done' | 'failed';
  progress: number; // 0–100
  result?: PODPushResult;
  error?: string;
}
