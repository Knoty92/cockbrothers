import { api } from './client';
import type {
  ApiResponse,
  Mockup,
  GenerationJob,
  ExportRequest,
  Product,
  CreateProductInput,
  BatchCreateInput,
} from '~/lib/types';

export const mockupsApi = {
  // ── Mockups ──

  /** List user's mockups, with optional filters */
  list: (params?: {
    brandId?: string;
    productId?: string;
    page?: number;
    limit?: number;
    dateFrom?: string;
    dateTo?: string;
  }) =>
    api.get<ApiResponse<Mockup[]>>('/mockups', { params }),

  /** Get single mockup detail */
  get: (id: string) =>
    api.get<ApiResponse<Mockup>>(`/mockups/${id}`),

  /** Delete a mockup */
  delete: (id: string) =>
    api.delete<void>(`/mockups/${id}`),

  /** Batch export mockups as ZIP */
  exportBatch: (data: ExportRequest) =>
    api.post<Blob>('/mockups/export', data),

  /** Regenerate a single mockup */
  regenerate: (id: string) =>
    api.post<ApiResponse<Mockup>>(`/mockups/${id}/regenerate`),

  /** Download a single mockup file */
  download: (id: string) =>
    api.get<Blob>(`/mockups/${id}/download`),

  /** AI enhance mockup quality */
  aiEnhance: (id: string) =>
    api.post<ApiResponse<Mockup>>(`/mockups/${id}/ai-enhance`),

  // ── Products (branded) ──

  /** List user's products */
  listProducts: (params?: {
    brandId?: string;
    page?: number;
    limit?: number;
    archived?: boolean;
  }) =>
    api.get<ApiResponse<Product[]>>('/products', { params }),

  /** Get product detail */
  getProduct: (id: string) =>
    api.get<ApiResponse<Product>>(`/products/${id}`),

  /** Create product (link brand + template) */
  createProduct: (data: CreateProductInput) =>
    api.post<ApiResponse<Product>>('/products', data),

  /** Update product config */
  updateProduct: (id: string, data: Partial<CreateProductInput>) =>
    api.patch<ApiResponse<Product>>(`/products/${id}`, data),

  /** Delete product */
  deleteProduct: (id: string) =>
    api.delete<void>(`/products/${id}`),

  /** Generate mockups for a single product */
  generateMockups: (id: string) =>
    api.post<ApiResponse<{ jobs: GenerationJob[] }>>(`/products/${id}/generate`),

  /** Batch create products (brand → multiple templates) */
  batchCreate: (data: BatchCreateInput) =>
    api.post<ApiResponse<Product[]>>('/products/batch', data),

  /** Batch generate mockups for multiple products */
  batchGenerate: (productIds: string[]) =>
    api.post<ApiResponse<{ jobs: GenerationJob[] }>>('/products/batch/generate', { productIds }),

  /** Get product variant options */
  getVariants: (id: string) =>
    api.get<ApiResponse<{ name: string; colors: string[]; sizes?: string[] }[]>>(
      `/products/${id}/variants`
    ),

  /** Push product to connected POD platform */
  pushToPod: (id: string, platform: string) =>
    api.post<ApiResponse<{ success: boolean; url?: string }>>(
      `/products/${id}/push`,
      { platform }
    ),
};
