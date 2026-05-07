import { api } from './client';
import type { ApiResponse, Template, CreateTemplateInput, UpdateTemplateInput } from '~/lib/types';

export const templatesApi = {
  /** List templates (system + user) */
  list: (params?: {
    productType?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) =>
    api.get<ApiResponse<Template[]>>('/templates', { params }),

  /** Get template detail */
  get: (id: string) =>
    api.get<ApiResponse<Template>>(`/templates/${id}`),

  /** Create a new template */
  create: (data: CreateTemplateInput) =>
    api.post<ApiResponse<Template>>('/templates', data),

  /** Update an existing template */
  update: (id: string, data: UpdateTemplateInput) =>
    api.patch<ApiResponse<Template>>(`/templates/${id}`, data),

  /** Delete a template */
  delete: (id: string) =>
    api.delete<void>(`/templates/${id}`),

  /** Render template preview (returns preview URL) */
  render: (id: string) =>
    api.get<ApiResponse<{ previewUrl: string }>>(`/templates/${id}/render`),

  /** Apply brand to template (dry run) */
  applyBrand: (id: string, brandId: string) =>
    api.post<ApiResponse<{ previewUrl: string; layers: unknown[] }>>(
      `/templates/${id}/apply-brand`,
      { brandId }
    ),

  /** List public templates */
  listPublic: (params?: { page?: number; limit?: number }) =>
    api.get<ApiResponse<Template[]>>('/templates/public', { params }),

  /** Get template options by product type */
  getByProductType: (productType: string) =>
    api.get<ApiResponse<Template[]>>('/templates/products', {
      params: { productType },
    }),
};
