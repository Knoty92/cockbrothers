/**
 * Shared mock data for all API routes.
 * These are used across brands, templates, products, mockups, etc.
 */

import type { Brand, BrandScoreBreakdown, PaletteSuggestion } from '../../types/brand';
import type { Template, Product, Mockup, GenerationJob } from '../../types';
import type { Integration, PODProduct } from '../../pod/types';
import type { CurrentPlan } from '../payments';

const TS = '2026-05-07T11:00:00.000Z';

export const MOCK_USER = {
  id: 'user_001',
  email: 'knoty@cockbrothers.com',
  name: 'Knoty',
  tier: 'free',
  avatarUrl: null,
};

// ── Brands ──

export const MOCK_BRANDS: Brand[] = [
  {
    id: 'brand_001',
    userId: 'user_001',
    name: 'Beach Club',
    slug: 'beach-club',
    description: 'Summer vibes, tropical colors, laid-back style',
    logoUrl: 'https://placehold.co/200x200/06b6d4/ffffff?text=BC',
    logoThumbnail: 'https://placehold.co/80x80/06b6d4/ffffff?text=BC',
    primaryColor: '#06b6d4',
    secondaryColor: '#f59e0b',
    accentColor: '#10b981',
    colors: [
      { name: 'Cyan', hex: '#06b6d4', usage: 'primary' },
      { name: 'Amber', hex: '#f59e0b', usage: 'secondary' },
      { name: 'Emerald', hex: '#10b981', usage: 'accent' },
    ],
    headingFont: 'Poppins',
    bodyFont: 'Inter',
    fontWeights: { heading: 700, body: 400 },
    brandVoice: 'Playful, energetic, youthful',
    brandTagline: 'Live the beach life',
    brandBio: 'Beach Club is all about bringing tropical vibes to everyday wear.',
    aiGenerated: false,
    generationPrompt: null,
    generationModel: null,
    brandScore: 88,
    productsCount: 5,
    mockupsCount: 20,
    isDefault: true,
    createdAt: '2026-04-01T10:00:00.000Z',
    updatedAt: TS,
  },
  {
    id: 'brand_002',
    userId: 'user_001',
    name: 'Urban Outfitters',
    slug: 'urban-outfitters',
    description: 'Streetwear meets sophistication',
    logoUrl: 'https://placehold.co/200x200/8b5cf6/ffffff?text=UO',
    logoThumbnail: 'https://placehold.co/80x80/8b5cf6/ffffff?text=UO',
    primaryColor: '#8b5cf6',
    secondaryColor: '#1e293b',
    accentColor: '#f43f5e',
    colors: [
      { name: 'Purple', hex: '#8b5cf6', usage: 'primary' },
      { name: 'Slate', hex: '#1e293b', usage: 'secondary' },
      { name: 'Rose', hex: '#f43f5e', usage: 'accent' },
    ],
    headingFont: 'Space Grotesk',
    bodyFont: 'Inter',
    fontWeights: { heading: 600, body: 400 },
    brandVoice: 'Bold, edgy, confident',
    brandTagline: 'Define your streets',
    brandBio: 'Urban apparel for those who march to their own beat.',
    aiGenerated: true,
    generationPrompt: 'Urban streetwear brand with purple and dark tones',
    generationModel: 'gpt-4',
    brandScore: 76,
    productsCount: 4,
    mockupsCount: 16,
    isDefault: false,
    createdAt: '2026-04-10T10:00:00.000Z',
    updatedAt: TS,
  },
  {
    id: 'brand_003',
    userId: 'user_001',
    name: 'Minimalist Co.',
    slug: 'minimalist-co',
    description: 'Clean, simple, timeless design',
    logoUrl: 'https://placehold.co/200x200/000000/ffffff?text=M',
    logoThumbnail: 'https://placehold.co/80x80/000000/ffffff?text=M',
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    accentColor: '#3b82f6',
    colors: [
      { name: 'Black', hex: '#000000', usage: 'primary' },
      { name: 'White', hex: '#ffffff', usage: 'secondary' },
      { name: 'Blue', hex: '#3b82f6', usage: 'accent' },
    ],
    headingFont: 'Inter',
    bodyFont: 'Inter',
    fontWeights: { heading: 300, body: 300 },
    brandVoice: 'Minimal, elegant, precise',
    brandTagline: 'Less is more',
    brandBio: 'Timeless pieces for the modern minimalist.',
    aiGenerated: false,
    generationPrompt: null,
    generationModel: null,
    brandScore: 92,
    productsCount: 3,
    mockupsCount: 12,
    isDefault: false,
    createdAt: '2026-04-20T10:00:00.000Z',
    updatedAt: TS,
  },
];

export const MOCK_BRAND_SCORE: BrandScoreBreakdown = {
  overall: 85,
  colorConsistency: 90,
  fontConsistency: 80,
  logoUsage: 85,
  voiceClarity: 85,
};

export const MOCK_PALETTE_SUGGESTIONS: PaletteSuggestion[] = [
  { name: 'Ocean Breeze', colors: ['#0ea5e9', '#06b6d4', '#14b8a6', '#0891b2', '#0e7490'], description: 'Cool blues and teals for a fresh feel' },
  { name: 'Sunset Glow', colors: ['#f97316', '#f59e0b', '#eab308', '#d946ef', '#ec4899'], description: 'Warm tones that evoke golden hour' },
  { name: 'Midnight', colors: ['#1e293b', '#334155', '#475569', '#0f172a', '#020617'], description: 'Deep slates for a sophisticated look' },
];

// ── Templates ──

const TEMPLATE_DATA_BASE = {
  canvasWidth: 2000,
  canvasHeight: 2400,
  backgroundColor: '#ffffff',
  grid: { show: true, size: 10 },
  snapToGrid: true,
};

export const MOCK_TEMPLATES: Template[] = [
  {
    id: 'tpl_001',
    userId: 'system',
    name: 'Classic T-Shirt',
    slug: 'classic-tshirt',
    description: 'Standard front-center print on a classic tee',
    productType: 'tshirt',
    templateData: {
      ...TEMPLATE_DATA_BASE,
      layers: [
        { id: 'l1', type: 'brand_color', name: 'Background', visible: true, locked: false, opacity: 1, x: 200, y: 300, width: 1600, height: 1800, rotation: 0, zIndex: 0, color: '#ffffff' },
        { id: 'l2', type: 'logo', name: 'Logo', visible: true, locked: false, opacity: 1, x: 700, y: 600, width: 600, height: 600, rotation: 0, zIndex: 1, brandBinding: 'logo' },
        { id: 'l3', type: 'text', name: 'Tagline', visible: true, locked: false, opacity: 1, x: 500, y: 1300, width: 1000, height: 200, rotation: 0, zIndex: 2, content: 'Your tagline here', fontSize: 48, fontFamily: 'Inter', fontWeight: 400, color: '#000000', textAlign: 'center', brandBinding: 'primary_color' },
      ],
    },
    previewUrl: 'https://placehold.co/400x480/e2e8f0/475569?text=T-Shirt',
    isPublic: true,
    isSystem: true,
    usageCount: 128,
    category: 'apparel',
    createdAt: '2026-03-01T00:00:00.000Z',
    updatedAt: TS,
  },
  {
    id: 'tpl_002',
    userId: 'system',
    name: 'Pullover Hoodie',
    slug: 'pullover-hoodie',
    description: 'Front center print on a classic pullover hoodie',
    productType: 'hoodie',
    templateData: {
      ...TEMPLATE_DATA_BASE,
      layers: [
        { id: 'l1', type: 'brand_color', name: 'Background', visible: true, locked: false, opacity: 1, x: 200, y: 300, width: 1600, height: 1800, rotation: 0, zIndex: 0, color: '#ffffff' },
        { id: 'l2', type: 'logo', name: 'Logo', visible: true, locked: false, opacity: 1, x: 700, y: 500, width: 600, height: 600, rotation: 0, zIndex: 1, brandBinding: 'logo' },
        { id: 'l3', type: 'text', name: 'Brand Text', visible: true, locked: false, opacity: 1, x: 500, y: 1200, width: 1000, height: 300, rotation: 0, zIndex: 2, content: 'Brand Name', fontSize: 72, fontFamily: 'Poppins', fontWeight: 700, color: '#000000', textAlign: 'center', brandBinding: 'primary_color' },
      ],
    },
    previewUrl: 'https://placehold.co/400x480/e2e8f0/475569?text=Hoodie',
    isPublic: true,
    isSystem: true,
    usageCount: 95,
    category: 'apparel',
    createdAt: '2026-03-05T00:00:00.000Z',
    updatedAt: TS,
  },
  {
    id: 'tpl_003',
    userId: 'system',
    name: 'Ceramic Mug',
    slug: 'ceramic-mug',
    description: 'Full-wrap print on an 11oz ceramic mug',
    productType: 'mug',
    templateData: {
      ...TEMPLATE_DATA_BASE,
      canvasWidth: 2200,
      canvasHeight: 1200,
      layers: [
        { id: 'l1', type: 'brand_color', name: 'Mug Surface', visible: true, locked: false, opacity: 1, x: 100, y: 100, width: 2000, height: 1000, rotation: 0, zIndex: 0, color: '#ffffff' },
        { id: 'l2', type: 'logo', name: 'Logo', visible: true, locked: false, opacity: 1, x: 800, y: 350, width: 600, height: 500, rotation: 0, zIndex: 1, brandBinding: 'logo' },
      ],
    },
    previewUrl: 'https://placehold.co/400x200/e2e8f0/475569?text=Mug',
    isPublic: true,
    isSystem: true,
    usageCount: 72,
    category: 'drinkware',
    createdAt: '2026-03-10T00:00:00.000Z',
    updatedAt: TS,
  },
  {
    id: 'tpl_004',
    userId: 'user_001',
    name: 'Summer Special',
    slug: 'summer-special',
    description: 'Custom summer-themed t-shirt layout',
    productType: 'tshirt',
    templateData: {
      ...TEMPLATE_DATA_BASE,
      layers: [
        { id: 'l1', type: 'brand_color', name: 'BG', visible: true, locked: false, opacity: 1, x: 200, y: 300, width: 1600, height: 1800, rotation: 0, zIndex: 0, color: '#ffffff' },
        { id: 'l2', type: 'image', name: 'Sun Graphic', visible: true, locked: false, opacity: 1, x: 650, y: 500, width: 700, height: 700, rotation: 0, zIndex: 1, content: 'https://placehold.co/700x700/f59e0b/ffffff?text=☀' },
        { id: 'l3', type: 'text', name: 'Summer Text', visible: true, locked: false, opacity: 1, x: 400, y: 1300, width: 1200, height: 200, rotation: 0, zIndex: 2, content: 'Summer Vibes', fontSize: 64, fontFamily: 'Poppins', fontWeight: 700, color: '#f59e0b', textAlign: 'center', brandBinding: 'secondary_color' },
      ],
    },
    previewUrl: 'https://placehold.co/400x480/f59e0b/ffffff?text=Summer',
    isPublic: true,
    isSystem: false,
    usageCount: 12,
    category: 'apparel',
    createdAt: '2026-04-15T00:00:00.000Z',
    updatedAt: TS,
  },
];

// ── Products ──

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_001',
    userId: 'user_001',
    brandId: 'brand_001',
    templateId: 'tpl_001',
    name: 'Beach Club Classic Tee',
    mockupUrls: [
      { variant: 'white-front', url: 'https://placehold.co/800x800/06b6d4/ffffff?text=BC+Tee' },
      { variant: 'black-front', url: 'https://placehold.co/800x800/000000/06b6d4?text=BC+Tee' },
    ],
    thumbnailUrl: 'https://placehold.co/200x200/06b6d4/ffffff?text=BC+Tee',
    config: { brandId: 'brand_001', templateId: 'tpl_001', brandColors: { primary: '#06b6d4', secondary: '#f59e0b' }, brandFonts: { heading: 'Poppins', body: 'Inter' } },
    brandScore: 88,
    podConnections: [],
    isArchived: false,
    createdAt: '2026-04-05T10:00:00.000Z',
    updatedAt: TS,
  },
  {
    id: 'prod_002',
    userId: 'user_001',
    brandId: 'brand_001',
    templateId: 'tpl_002',
    name: 'Beach Club Summer Hoodie',
    mockupUrls: [
      { variant: 'white-front', url: 'https://placehold.co/800x800/f59e0b/ffffff?text=BC+Hoodie' },
    ],
    thumbnailUrl: 'https://placehold.co/200x200/f59e0b/ffffff?text=BC+Hoodie',
    config: { brandId: 'brand_001', templateId: 'tpl_002', brandColors: { primary: '#06b6d4', secondary: '#f59e0b' }, brandFonts: { heading: 'Poppins', body: 'Inter' } },
    brandScore: 85,
    podConnections: [],
    isArchived: false,
    createdAt: '2026-04-06T10:00:00.000Z',
    updatedAt: TS,
  },
  {
    id: 'prod_003',
    userId: 'user_001',
    brandId: 'brand_002',
    templateId: 'tpl_001',
    name: 'Urban Classic Tee',
    mockupUrls: [
      { variant: 'black-front', url: 'https://placehold.co/800x800/1e293b/8b5cf6?text=UO+Tee' },
    ],
    thumbnailUrl: 'https://placehold.co/200x200/1e293b/8b5cf6?text=UO+Tee',
    config: { brandId: 'brand_002', templateId: 'tpl_001', brandColors: { primary: '#8b5cf6', secondary: '#1e293b' }, brandFonts: { heading: 'Space Grotesk', body: 'Inter' } },
    brandScore: 76,
    podConnections: [],
    isArchived: false,
    createdAt: '2026-04-12T10:00:00.000Z',
    updatedAt: TS,
  },
  {
    id: 'prod_004',
    userId: 'user_001',
    brandId: 'brand_002',
    templateId: 'tpl_002',
    name: 'Urban Street Hoodie',
    mockupUrls: [
      { variant: 'black-front', url: 'https://placehold.co/800x800/1e293b/f43f5e?text=UO+Hoodie' },
    ],
    thumbnailUrl: 'https://placehold.co/200x200/1e293b/f43f5e?text=UO+Hoodie',
    config: { brandId: 'brand_002', templateId: 'tpl_002', brandColors: { primary: '#8b5cf6', secondary: '#1e293b' }, brandFonts: { heading: 'Space Grotesk', body: 'Inter' } },
    brandScore: 74,
    podConnections: [],
    isArchived: false,
    createdAt: '2026-04-14T10:00:00.000Z',
    updatedAt: TS,
  },
  {
    id: 'prod_005',
    userId: 'user_001',
    brandId: 'brand_003',
    templateId: 'tpl_003',
    name: 'Minimalist Mug',
    mockupUrls: [
      { variant: 'white-front', url: 'https://placehold.co/800x400/000000/ffffff?text=Minimalist' },
    ],
    thumbnailUrl: 'https://placehold.co/200x100/000000/ffffff?text=Mug',
    config: { brandId: 'brand_003', templateId: 'tpl_003', brandColors: { primary: '#000000', secondary: '#ffffff' }, brandFonts: { heading: 'Inter', body: 'Inter' } },
    brandScore: 92,
    podConnections: [],
    isArchived: false,
    createdAt: '2026-04-22T10:00:00.000Z',
    updatedAt: TS,
  },
];

// ── Mockups ──

export const MOCK_MOCKUPS: Mockup[] = [
  {
    id: 'mock_001',
    userId: 'user_001',
    productId: 'prod_001',
    brandId: 'brand_001',
    variantName: 'White / S',
    productColor: 'White',
    imageUrl: 'https://placehold.co/1200x1200/ffffff/06b6d4?text=BC+Tee+White',
    thumbnailUrl: 'https://placehold.co/300x300/ffffff/06b6d4?text=BC',
    imageWidth: 1200,
    imageHeight: 1200,
    fileSize: 245_000,
    format: 'png',
    generationTimeMs: 3200,
    aiEnhanced: false,
    downloadCount: 5,
    lastDownloaded: '2026-05-05T15:00:00.000Z',
    createdAt: '2026-04-05T11:00:00.000Z',
  },
  {
    id: 'mock_002',
    userId: 'user_001',
    productId: 'prod_001',
    brandId: 'brand_001',
    variantName: 'Black / M',
    productColor: 'Black',
    imageUrl: 'https://placehold.co/1200x1200/1a1a1a/06b6d4?text=BC+Tee+Black',
    thumbnailUrl: 'https://placehold.co/300x300/1a1a1a/06b6d4?text=BC',
    imageWidth: 1200,
    imageHeight: 1200,
    fileSize: 210_000,
    format: 'png',
    generationTimeMs: 2900,
    aiEnhanced: true,
    downloadCount: 3,
    lastDownloaded: '2026-05-06T10:00:00.000Z',
    createdAt: '2026-04-05T12:00:00.000Z',
  },
  {
    id: 'mock_003',
    userId: 'user_001',
    productId: 'prod_003',
    brandId: 'brand_002',
    variantName: 'Black / L',
    productColor: 'Black',
    imageUrl: 'https://placehold.co/1200x1200/1a1a1a/8b5cf6?text=UO+Tee+Black',
    thumbnailUrl: 'https://placehold.co/300x300/1a1a1a/8b5cf6?text=UO',
    imageWidth: 1200,
    imageHeight: 1200,
    fileSize: 198_000,
    format: 'png',
    generationTimeMs: 3100,
    aiEnhanced: false,
    downloadCount: 7,
    lastDownloaded: '2026-05-07T08:00:00.000Z',
    createdAt: '2026-04-12T14:00:00.000Z',
  },
  {
    id: 'mock_004',
    userId: 'user_001',
    productId: 'prod_005',
    brandId: 'brand_003',
    variantName: 'White / 11oz',
    productColor: 'White',
    imageUrl: 'https://placehold.co/1200x600/ffffff/000000?text=Minimalist+Mug',
    thumbnailUrl: 'https://placehold.co/300x150/ffffff/000000?text=M',
    imageWidth: 1200,
    imageHeight: 600,
    fileSize: 156_000,
    format: 'jpg',
    generationTimeMs: 1800,
    aiEnhanced: false,
    downloadCount: 2,
    lastDownloaded: null,
    createdAt: '2026-04-22T12:00:00.000Z',
  },
  {
    id: 'mock_005',
    userId: 'user_001',
    productId: 'prod_002',
    brandId: 'brand_001',
    variantName: 'Navy / XL',
    productColor: 'Navy',
    imageUrl: 'https://placehold.co/1200x1200/1e3a5f/06b6d4?text=BC+Hoodie+Navy',
    thumbnailUrl: 'https://placehold.co/300x300/1e3a5f/06b6d4?text=BC',
    imageWidth: 1200,
    imageHeight: 1200,
    fileSize: 278_000,
    format: 'png',
    generationTimeMs: 3500,
    aiEnhanced: false,
    downloadCount: 1,
    lastDownloaded: '2026-04-20T16:00:00.000Z',
    createdAt: '2026-04-06T14:00:00.000Z',
  },
];

// ── Generation Jobs ──

export const MOCK_GENERATION_JOBS: GenerationJob[] = [
  { id: 'job_001', productId: 'prod_001', variantName: 'White / S', status: 'completed', progress: 100 },
  { id: 'job_002', productId: 'prod_001', variantName: 'Black / M', status: 'completed', progress: 100 },
  { id: 'job_003', productId: 'prod_002', variantName: 'White / L', status: 'processing', progress: 60 },
  { id: 'job_004', productId: 'prod_002', variantName: 'Navy / XL', status: 'pending', progress: 0 },
];

// ── Integrations ──

export const MOCK_INTEGRATIONS: Integration[] = [
  {
    id: 'int_001',
    userId: 'user_001',
    platform: 'printful',
    displayName: 'Printful Store',
    accessToken: null,
    refreshToken: null,
    tokenExpiresAt: null,
    apiKey: null,
    platformStoreId: 'pf_store_001',
    platformData: { storeName: 'Cockbrothers Printful' },
    isActive: true,
    lastSyncAt: '2026-05-05T10:00:00.000Z',
    errorMessage: null,
    createdAt: '2026-04-01T10:00:00.000Z',
    updatedAt: TS,
  },
  {
    id: 'int_002',
    userId: 'user_001',
    platform: 'printify',
    displayName: 'Printify Shop',
    accessToken: null,
    refreshToken: null,
    tokenExpiresAt: null,
    apiKey: null,
    platformStoreId: 'pify_shop_001',
    platformData: { shopName: 'Cockbrothers Prints' },
    isActive: true,
    lastSyncAt: '2026-05-06T12:00:00.000Z',
    errorMessage: null,
    createdAt: '2026-04-05T10:00:00.000Z',
    updatedAt: TS,
  },
];

// ── POD Products ──

export const MOCK_POD_PRODUCTS: PODProduct[] = [
  {
    id: 'pod_001',
    name: 'Gildan 5000 Heavy Cotton T-Shirt',
    description: 'Classic heavy cotton tee, available in 30+ colors',
    type: 'tshirt',
    variants: [
      { id: 'var_001', name: 'White / S', color: 'White', size: 'S', price: 11.95, currency: 'USD', isAvailable: true },
      { id: 'var_002', name: 'White / M', color: 'White', size: 'M', price: 11.95, currency: 'USD', isAvailable: true },
      { id: 'var_003', name: 'Black / M', color: 'Black', size: 'M', price: 11.95, currency: 'USD', isAvailable: true },
      { id: 'var_004', name: 'Navy / XL', color: 'Navy', size: 'XL', price: 12.95, currency: 'USD', isAvailable: true },
    ],
    images: [
      { id: 'img_001', url: 'https://placehold.co/600x600/e2e8f0/475569?text=T-Shirt+Front', variantIds: ['var_001', 'var_002', 'var_003', 'var_004'], position: 'front' },
    ],
  },
  {
    id: 'pod_002',
    name: 'Bella+Canvas 3501 Unisex Hoodie',
    description: 'Soft, fleece pullover hoodie',
    type: 'hoodie',
    variants: [
      { id: 'var_005', name: 'Black / M', color: 'Black', size: 'M', price: 29.95, currency: 'USD', isAvailable: true },
      { id: 'var_006', name: 'Navy / L', color: 'Navy', size: 'L', price: 29.95, currency: 'USD', isAvailable: true },
    ],
    images: [
      { id: 'img_002', url: 'https://placehold.co/600x600/e2e8f0/475569?text=Hoodie+Front', variantIds: ['var_005', 'var_006'], position: 'front' },
    ],
  },
];

// ── Variants ──

export const MOCK_VARIANTS = [
  { name: 'Color', colors: ['White', 'Black', 'Navy', 'Gray', 'Red'], sizes: undefined },
  { name: 'Size', colors: undefined, sizes: ['S', 'M', 'L', 'XL', '2XL'] },
];

// ── Payments / Plans ──

export const MOCK_CURRENT_PLAN: CurrentPlan = {
  tier: 'free',
  status: 'active',
  currentPeriodStart: '2026-05-01T00:00:00.000Z',
  currentPeriodEnd: '2026-06-01T00:00:00.000Z',
  trialEnd: null,
  usage: {
    aiGenerationsUsed: 3,
    mockupsGenerated: 48,
    storageBytesUsed: 12_000_000,
  },
};

// ── Helpers ──

export function ok<T>(data: T, meta?: { page?: number; limit?: number; total?: number; hasMore?: boolean }) {
  const body: Record<string, unknown> = { data };
  if (meta) body.meta = meta;
  return Response.json(body);
}

export function created<T>(data: T) {
  return Response.json({ data }, { status: 201 });
}

export function noContent() {
  return new Response(null, { status: 204 });
}

export function badRequest(message: string, code = 'BAD_REQUEST') {
  return Response.json({ error: { code, message } }, { status: 400 });
}

export function notFound(message = 'Not found') {
  return Response.json({ error: { code: 'NOT_FOUND', message } }, { status: 404 });
}

export function serverError(err: unknown) {
  const message = err instanceof Error ? err.message : 'Internal server error';
  return Response.json({ error: { code: 'SERVER_ERROR', message } }, { status: 500 });
}

export function unauthorized(message = 'Not authenticated') {
  return Response.json({ error: { code: 'UNAUTHORIZED', message } }, { status: 401 });
}

/** Helper: parse JSON body */
export async function parseBody<T>(request: Request): Promise<T | null> {
  try {
    return await request.json() as T;
  } catch {
    return null;
  }
}
