// Shared types for Templates, Products, and Mockups

export type ProductType =
  | 'tshirt' | 'hoodie' | 'sweatshirt' | 'tank_top'
  | 'mug' | 'poster' | 'canvas' | 'tote_bag'
  | 'phone_case' | 'hat' | 'pin' | 'sticker'
  | 'leggings' | 'pillow' | 'blanket';

export type MockupFormat = 'png' | 'jpg' | 'webp';

export interface TemplateLayer {
  id: string;
  type: 'text' | 'image' | 'shape' | 'logo' | 'brand_color';
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  // Type-specific properties
  content?: string;          // text content or image URL
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  shapeType?: 'rect' | 'circle' | 'line';
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  borderRadius?: number;
  /** Which brand field to bind to */
  brandBinding?: 'logo' | 'primary_color' | 'secondary_color' | 'accent_color' | 'heading_font' | 'body_font' | null;
}

export interface TemplateData {
  canvasWidth: number;
  canvasHeight: number;
  backgroundColor: string;
  layers: TemplateLayer[];
  grid?: { show: boolean; size: number };
  snapToGrid?: boolean;
}

export interface Template {
  id: string;
  userId: string;
  name: string;
  slug: string;
  description?: string;
  productType: ProductType;
  templateData: TemplateData;
  previewUrl?: string;
  isPublic: boolean;
  isSystem: boolean;
  usageCount: number;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTemplateInput {
  name: string;
  description?: string;
  productType: ProductType;
  templateData: TemplateData;
  category?: string;
}

export interface UpdateTemplateInput {
  name?: string;
  description?: string;
  productType?: ProductType;
  templateData?: Partial<TemplateData>;
  previewUrl?: string;
  isPublic?: boolean;
  category?: string;
}

// --- Products ---

export interface ProductConfig {
  brandId: string;
  templateId: string;
  brandColors?: Record<string, string>;
  brandFonts?: Record<string, string>;
  logoPosition?: { x: number; y: number; scale: number };
  customizations?: Record<string, unknown>;
}

export interface PodConnection {
  platform: string;
  productId: string;
  variantId: string;
  url: string;
}

export interface Product {
  id: string;
  userId: string;
  brandId: string;
  templateId: string;
  name: string;
  mockupUrls: MockupUrlItem[];
  thumbnailUrl?: string;
  config: ProductConfig;
  brandScore: number;
  podConnections: PodConnection[];
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MockupUrlItem {
  variant: string;
  url: string;
}

export interface CreateProductInput {
  brandId: string;
  templateId: string;
  name: string;
  config: ProductConfig;
}

export interface BatchCreateInput {
  brandId: string;
  templateIds: string[];
  namePattern: string; // e.g. "{brand}-{template}"
}

// --- Mockups ---

export interface Mockup {
  id: string;
  userId: string;
  productId: string;
  brandId: string;
  variantName: string;
  productColor?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  fileSize?: number;
  format: MockupFormat;
  generationTimeMs?: number;
  aiEnhanced: boolean;
  downloadCount: number;
  lastDownloaded?: string;
  createdAt: string;
}

export interface GenerationJob {
  id: string;
  productId: string;
  variantName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number; // 0-100
  error?: string;
}

export interface ExportRequest {
  mockupIds: string[];
  format: MockupFormat;
  quality?: number; // 1-100
}

// --- API Response ---

export interface ApiResponse<T> {
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}
