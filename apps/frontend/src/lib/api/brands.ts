/**
 * Brand API calls – server functions for Vinxi.
 * These are called on the client but executed on the server via Vinxi's server$ functions.
 */
import type {
  Brand,
  CreateBrandInput,
  UpdateBrandInput,
  BrandScoreBreakdown,
  PaletteSuggestion,
} from '../types/brand';

// ---------------------------------------------------------------------------
// Base
// ---------------------------------------------------------------------------

const BASE = '/api/brands';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = body?.error?.message ?? `Request failed (${res.status})`;
    throw new Error(msg);
  }

  const json = await res.json();
  return json.data as T;
}

// ---------------------------------------------------------------------------
// Server functions (run on server via Vinxi)
// ---------------------------------------------------------------------------

/** List all brands for the current user */
export async function listBrands(): Promise<Brand[]> {
  return request<Brand[]>(BASE);
}

/** Get a single brand by ID */
export async function getBrand(id: string): Promise<Brand> {
  return request<Brand>(`${BASE}/${id}`);
}

/** Create a new brand */
export async function createBrand(data: CreateBrandInput): Promise<Brand> {
  return request<Brand>(BASE, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/** Update an existing brand */
export async function updateBrand(
  id: string,
  data: UpdateBrandInput,
): Promise<Brand> {
  return request<Brand>(`${BASE}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

/** Delete a brand */
export async function deleteBrand(id: string): Promise<void> {
  await fetch(`${BASE}/${id}`, { method: 'DELETE' });
}

/** Duplicate a brand */
export async function duplicateBrand(id: string): Promise<Brand> {
  return request<Brand>(`${BASE}/${id}/duplicate`, { method: 'POST' });
}

/** AI: Generate a brand kit from a text prompt */
export async function generateBrandFromPrompt(
  prompt: string,
): Promise<Brand> {
  return request<Brand>(`${BASE}/generate-from-prompt`, {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  });
}

/** AI: Regenerate an existing brand kit */
export async function regenerateBrandKit(
  id: string,
  prompt?: string,
): Promise<Brand> {
  return request<Brand>(`${BASE}/${id}/generate`, {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  });
}

/** AI: Suggest a colour palette based on a brand's primary colour */
export async function suggestPalette(
  primaryColor: string,
): Promise<PaletteSuggestion[]> {
  return request<PaletteSuggestion[]>(`${BASE}/suggest-palette`, {
    method: 'POST',
    body: JSON.stringify({ primaryColor }),
  });
}

/** Get brand consistency score */
export async function getBrandScore(
  id: string,
): Promise<BrandScoreBreakdown> {
  return request<BrandScoreBreakdown>(`${BASE}/${id}/score`);
}

/** Export brand kit as a JSON bundle */
export async function exportBrand(id: string): Promise<Blob> {
  const res = await fetch(`${BASE}/${id}/export`);
  return res.blob();
}

// ---------------------------------------------------------------------------
// Server-only functions (Vinxi server$)
// ---------------------------------------------------------------------------

/**
 * Upload a logo image to the server.
 * This sends a FormData with the file to the server API endpoint.
 */
export async function uploadLogo(
  file: File,
  brandId: string,
): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('brandId', brandId);

  const res = await fetch(`${BASE}/${brandId}/logo`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error?.message ?? 'Logo upload failed');
  }

  const json = await res.json();
  return json.data.url as string;
}

/**
 * Validate brand data before saving.
 */
export function validateBrandData(data: CreateBrandInput): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 1) {
    errors.push('Brand name is required');
  }
  if (data.name && data.name.length > 100) {
    errors.push('Brand name must be under 100 characters');
  }
  if (data.primaryColor && !/^#[0-9a-fA-F]{6}$/.test(data.primaryColor)) {
    errors.push('Primary color must be a valid hex code');
  }
  if (data.secondaryColor && !/^#[0-9a-fA-F]{6}$/.test(data.secondaryColor)) {
    errors.push('Secondary color must be a valid hex code');
  }

  return { valid: errors.length === 0, errors };
}
