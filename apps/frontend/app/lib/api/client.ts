/**
 * API Client base for Cockbrothers server functions.
 *
 * Provides typed fetch helpers for calling backend API routes.
 * All requests go through the Vinxi server.
 */

// ==========================================
// Types
// ==========================================

export interface ApiResponse<T> {
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasMore?: boolean;
  };
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

// ==========================================
// Base URL detection
// ==========================================

function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    // Client-side — use current origin
    return window.location.origin;
  }
  // Server-side — use env or fallback
  return process.env.APP_URL ?? "http://localhost:3000";
}

// ==========================================
// Request helpers
// ==========================================

interface RequestOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
  cache?: RequestCache;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({
      error: { code: "UNKNOWN", message: response.statusText },
    }));
    throw errorBody as ApiError;
  }
  return response.json() as Promise<T>;
}

async function get<T>(
  path: string,
  options?: RequestOptions,
): Promise<ApiResponse<T>> {
  const url = `${getBaseUrl()}${path}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    signal: options?.signal,
    cache: options?.cache,
  });
  return handleResponse<ApiResponse<T>>(response);
}

async function post<T>(
  path: string,
  body?: unknown,
  options?: RequestOptions,
): Promise<ApiResponse<T>> {
  const url = `${getBaseUrl()}${path}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: options?.signal,
  });
  return handleResponse<ApiResponse<T>>(response);
}

async function patch<T>(
  path: string,
  body?: unknown,
  options?: RequestOptions,
): Promise<ApiResponse<T>> {
  const url = `${getBaseUrl()}${path}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: options?.signal,
  });
  return handleResponse<ApiResponse<T>>(response);
}

async function del<T>(
  path: string,
  options?: RequestOptions,
): Promise<ApiResponse<T>> {
  const url = `${getBaseUrl()}${path}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    signal: options?.signal,
  });
  return handleResponse<ApiResponse<T>>(response);
}

// ==========================================
// Public API client
// ==========================================

export const api = {
  get,
  post,
  patch,
  delete: del,
};

// ==========================================
// Type-safe resource builders
// ==========================================

export function createResourceApi<T>(basePath: string) {
  return {
    list: (params?: Record<string, string>) => {
      const query = params ? `?${new URLSearchParams(params)}` : "";
      return get<T[]>(`${basePath}${query}`);
    },
    get: (id: string) => get<T>(`${basePath}/${id}`),
    create: (data: Partial<T>) => post<T>(basePath, data),
    update: (id: string, data: Partial<T>) => patch<T>(`${basePath}/${id}`, data),
    remove: (id: string) => del<T>(`${basePath}/${id}`),
  };
}
