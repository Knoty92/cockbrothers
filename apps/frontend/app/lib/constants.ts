// ==========================================
// App Constants
// ==========================================

export const APP_NAME = "Cockbrothers";
export const APP_URL = process.env.APP_URL ?? "http://localhost:3000";

// ==========================================
// Tiers
// ==========================================

export const TIERS = {
  FREE: "free",
  STARTER: "starter",
  PRO: "pro",
  AGENCY: "agency",
  ENTERPRISE: "enterprise",
} as const;

export type Tier = (typeof TIERS)[keyof typeof TIERS];

export const TIER_LABELS: Record<Tier, string> = {
  free: "Free",
  starter: "Starter",
  pro: "Pro",
  agency: "Agency",
  enterprise: "Enterprise",
};

export const TIER_ORDER: Tier[] = ["free", "starter", "pro", "agency", "enterprise"];

// ==========================================
// Tier Limits (defaults — overridden by DB)
// ==========================================

export const DEFAULT_TIER_LIMITS: Record<
  Tier,
  {
    maxBrands: number;
    maxProducts: number;
    maxMockups: number;
    aiGenerationsPerMonth: number;
    batchExport: boolean;
    apiAccess: boolean;
    maxIntegrations: number;
    maxTeamMembers: number;
    whiteLabel: boolean;
    priceMonthly: number;
  }
> = {
  free: {
    maxBrands: 1,
    maxProducts: 3,
    maxMockups: 10,
    aiGenerationsPerMonth: 5,
    batchExport: false,
    apiAccess: false,
    maxIntegrations: 0,
    maxTeamMembers: 1,
    whiteLabel: false,
    priceMonthly: 0,
  },
  starter: {
    maxBrands: 3,
    maxProducts: 20,
    maxMockups: 100,
    aiGenerationsPerMonth: 50,
    batchExport: true,
    apiAccess: false,
    maxIntegrations: 1,
    maxTeamMembers: 1,
    whiteLabel: false,
    priceMonthly: 9.0,
  },
  pro: {
    maxBrands: 10,
    maxProducts: 0, // unlimited
    maxMockups: 0, // unlimited
    aiGenerationsPerMonth: 500,
    batchExport: true,
    apiAccess: true,
    maxIntegrations: 3,
    maxTeamMembers: 1,
    whiteLabel: false,
    priceMonthly: 19.0,
  },
  agency: {
    maxBrands: 0, // unlimited
    maxProducts: 0, // unlimited
    maxMockups: 0, // unlimited
    aiGenerationsPerMonth: 2000,
    batchExport: true,
    apiAccess: true,
    maxIntegrations: 10,
    maxTeamMembers: 10,
    whiteLabel: true,
    priceMonthly: 49.0,
  },
  enterprise: {
    maxBrands: 0, // unlimited
    maxProducts: 0, // unlimited
    maxMockups: 0, // unlimited
    aiGenerationsPerMonth: 0, // unlimited
    batchExport: true,
    apiAccess: true,
    maxIntegrations: 0, // unlimited
    maxTeamMembers: 0, // unlimited
    whiteLabel: true,
    priceMonthly: 0, // custom pricing
  },
};

// ==========================================
// Product Types
// ==========================================

export const PRODUCT_TYPES = [
  "tshirt",
  "hoodie",
  "sweatshirt",
  "tank_top",
  "mug",
  "poster",
  "canvas",
  "tote_bag",
  "phone_case",
  "hat",
  "pin",
  "sticker",
  "leggings",
  "pillow",
  "blanket",
] as const;

export type ProductType = (typeof PRODUCT_TYPES)[number];

// ==========================================
// Integration Platforms
// ==========================================

export const INTEGRATION_PLATFORMS = [
  "printful",
  "printify",
  "shopify",
  "etsy",
  "gelato",
  "spod",
] as const;

export type IntegrationPlatform = (typeof INTEGRATION_PLATFORMS)[number];

// ==========================================
// AI Generation Types
// ==========================================

export const AI_GENERATION_TYPES = [
  "brand_kit",
  "logo",
  "color_palette",
  "brand_voice",
  "mockup",
  "enhancement",
  "brand_score",
] as const;

export type AiGenerationType = (typeof AI_GENERATION_TYPES)[number];

// ==========================================
// Subscription Statuses
// ==========================================

export const SUBSCRIPTION_STATUSES = [
  "active",
  "canceled",
  "past_due",
  "incomplete",
  "trialing",
  "paused",
] as const;

export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];

// ==========================================
// Team Roles
// ==========================================

export const TEAM_ROLES = ["admin", "editor", "viewer"] as const;
export type TeamRole = (typeof TEAM_ROLES)[number];

export const TEAM_MEMBER_STATUSES = ["pending", "active", "declined", "removed"] as const;
export type TeamMemberStatus = (typeof TEAM_MEMBER_STATUSES)[number];

// ==========================================
// Mockup Formats
// ==========================================

export const MOCKUP_FORMATS = ["png", "jpg", "webp"] as const;
export type MockupFormat = (typeof MOCKUP_FORMATS)[number];

// ==========================================
// Pagination
// ==========================================

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// ==========================================
// Feature Flags
// ==========================================

export const FEATURES = {
  BATCH_EXPORT: "batch_export",
  API_ACCESS: "api_access",
  WHITE_LABEL: "white_label",
  AI_ASSISTANT: "ai_assistant",
  TEAM_MANAGEMENT: "team_management",
  PRIORITY_SUPPORT: "priority_support",
} as const;

// ==========================================
// Brand Score Ranges
// ==========================================

export const BRAND_SCORE = {
  MIN: 0,
  MAX: 100,
  GOOD: 70,
  EXCELLENT: 85,
} as const;

// ==========================================
// Storage & Limits
// ==========================================

export const MAX_LOGO_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
export const MAX_ASSET_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
export const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
] as const;

export const MOCKUP_MAX_DIMENSION = 4096; // px
export const THUMBNAIL_WIDTH = 400; // px
