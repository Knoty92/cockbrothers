import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  decimal,
  jsonb,
  unique,
  index,
  primaryKey,
  check,
  bigint,
  inet,
} from "drizzle-orm/pg-core";

// ==========================================
// USERS & AUTH
// ==========================================

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  tier: text("tier").notNull().default("free"),
  subscriptionId: text("subscription_id"),
  stripeCustomerId: text("stripe_customer_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  tierCheck: check("tier_check", sql`${table.tier} IN ('free', 'starter', 'pro', 'agency', 'enterprise')`),
}));

export const userSessions = pgTable("user_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ==========================================
// TIER LIMITS
// ==========================================

export const tierLimits = pgTable("tier_limits", {
  tier: text("tier").primaryKey(),
  maxBrands: integer("max_brands").notNull(),
  maxProducts: integer("max_products").notNull(), // 0 = unlimited
  maxMockups: integer("max_mockups").notNull(), // 0 = unlimited
  aiGenerations: integer("ai_generations").notNull(), // per month, 0 = unlimited
  batchExport: boolean("batch_export").notNull().default(false),
  apiAccess: boolean("api_access").notNull().default(false),
  integrations: integer("integrations").notNull().default(0),
  teamMembers: integer("team_members").notNull().default(1),
  whiteLabel: boolean("white_label").notNull().default(false),
  priceMonthly: decimal("price_monthly", { precision: 10, scale: 2 }).notNull(),
});

// ==========================================
// BRANDS
// ==========================================

export const brands = pgTable("brands", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),

  // Brand Identity
  logoUrl: text("logo_url"),
  logoThumbnail: text("logo_thumbnail"),
  primaryColor: text("primary_color").notNull().default("#000000"),
  secondaryColor: text("secondary_color").notNull().default("#FFFFFF"),
  accentColor: text("accent_color"),
  colors: jsonb("colors").notNull().default([]),
  headingFont: text("heading_font").notNull().default("Inter"),
  bodyFont: text("body_font").notNull().default("Inter"),
  fontWeights: jsonb("font_weights").notNull().default({}),

  // Brand Voice
  brandVoice: text("brand_voice"),
  brandTagline: text("brand_tagline"),
  brandBio: text("brand_bio"),

  // AI Metadata
  aiGenerated: boolean("ai_generated").notNull().default(false),
  generationPrompt: text("generation_prompt"),
  generationModel: text("generation_model"),

  // Stats
  brandScore: integer("brand_score").default(0),
  productsCount: integer("products_count").default(0),
  mockupsCount: integer("mockups_count").default(0),

  // Meta
  isDefault: boolean("is_default").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  userSlugUnique: unique().on(table.userId, table.slug),
  userIdIdx: index("idx_brands_user_id").on(table.userId),
  slugIdx: index("idx_brands_slug").on(table.slug),
}));

// ==========================================
// TEMPLATES
// ==========================================

export const templates = pgTable("templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),

  // Product type
  productType: text("product_type").notNull(),

  // Template JSON
  templateData: jsonb("template_data").notNull().default({}),

  // Preview
  previewUrl: text("preview_url"),

  // Meta
  isPublic: boolean("is_public").notNull().default(false),
  isSystem: boolean("is_system").notNull().default(false),
  usageCount: integer("usage_count").notNull().default(0),
  category: text("category"),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  userSlugUnique: unique().on(table.userId, table.slug),
  productTypeIdx: index("idx_templates_product_type").on(table.productType),
  publicIdx: index("idx_templates_public").on(table.isPublic).where(sql`is_public = true`),
}));

// ==========================================
// PRODUCTS (Brand + Template + Variants)
// ==========================================

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  brandId: uuid("brand_id").notNull().references(() => brands.id, { onDelete: "cascade" }),
  templateId: uuid("template_id").notNull().references(() => templates.id, { onDelete: "restrict" }),
  name: text("name").notNull(),

  // Generated imagery
  mockupUrls: jsonb("mockup_urls").notNull().default([]),
  thumbnailUrl: text("thumbnail_url"),

  // Config snapshot
  config: jsonb("config").notNull().default({}),

  // Brand score
  brandScore: integer("brand_score").default(0),

  // POD integration links
  podConnections: jsonb("pod_connections").notNull().default([]),

  // Meta
  isArchived: boolean("is_archived").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  brandIdIdx: index("idx_products_brand_id").on(table.brandId),
  userIdIdx: index("idx_products_user_id").on(table.userId),
}));

// ==========================================
// MOCKUPS (Rendered outputs)
// ==========================================

export const mockups = pgTable("mockups", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  brandId: uuid("brand_id").notNull().references(() => brands.id, { onDelete: "cascade" }),

  // Variant info
  variantName: text("variant_name").notNull(),
  productColor: text("product_color"),

  // Asset
  imageUrl: text("image_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  imageWidth: integer("image_width"),
  imageHeight: integer("image_height"),
  fileSize: integer("file_size"),
  format: text("format").notNull().default("png"),

  // Generation metadata
  generationTimeMs: integer("generation_time_ms"),
  aiEnhanced: boolean("ai_enhanced").notNull().default(false),

  // Export
  downloadCount: integer("download_count").notNull().default(0),
  lastDownloaded: timestamp("last_downloaded", { withTimezone: true }),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  productIdIdx: index("idx_mockups_product_id").on(table.productId),
  userIdIdx: index("idx_mockups_user_id").on(table.userId),
  formatCheck: check("format_check", sql`${table.format} IN ('png', 'jpg', 'webp')`),
}));

// ==========================================
// INTEGRATIONS (POD Platform Connections)
// ==========================================

export const integrations = pgTable("integrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  platform: text("platform").notNull(),
  displayName: text("display_name"),

  // OAuth / API keys
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  tokenExpiresAt: timestamp("token_expires_at", { withTimezone: true }),
  apiKey: text("api_key"),

  // Platform-specific data
  platformStoreId: text("platform_store_id"),
  platformData: jsonb("platform_data"),

  // Status
  isActive: boolean("is_active").notNull().default(true),
  lastSyncAt: timestamp("last_sync_at", { withTimezone: true }),
  errorMessage: text("error_message"),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  userPlatformUnique: unique().on(table.userId, table.platform),
}));

// ==========================================
// AI GENERATION LOGS
// ==========================================

export const aiGenerations = pgTable("ai_generations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  generationType: text("generation_type").notNull(),
  modelUsed: text("model_used").notNull(),
  prompt: text("prompt"),
  tokensUsed: integer("tokens_used"),
  costUsd: decimal("cost_usd", { precision: 10, scale: 6 }),
  responseData: jsonb("response_data"),
  durationMs: integer("duration_ms"),
  success: boolean("success").notNull().default(true),
  errorMessage: text("error_message"),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index("idx_ai_generations_user_id").on(table.userId),
  createdAtIdx: index("idx_ai_generations_created").on(table.createdAt),
}));

// ==========================================
// SUBSCRIPTIONS
// ==========================================

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  stripeId: text("stripe_id").unique(),
  stripeCustomerId: text("stripe_customer_id"),

  tier: text("tier").notNull().references(() => tierLimits.tier),
  status: text("status").notNull().default("active"),

  // Billing
  currentPeriodStart: timestamp("current_period_start", { withTimezone: true }).notNull(),
  currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }).notNull(),
  trialEnd: timestamp("trial_end", { withTimezone: true }),
  canceledAt: timestamp("canceled_at", { withTimezone: true }),

  // Usage (for metered billing)
  aiGenerationsUsed: integer("ai_generations_used").notNull().default(0),
  mockupsGenerated: integer("mockups_generated").notNull().default(0),
  storageBytesUsed: bigint("storage_bytes_used", { mode: "number" }).notNull().default(0),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// ==========================================
// TEAM MEMBERS (for Agency tier)
// ==========================================

export const teamMembers = pgTable("team_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  subscriptionId: uuid("subscription_id").notNull().references(() => subscriptions.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: text("role").notNull().default("member"),
  invitedBy: uuid("invited_by").notNull().references(() => users.id),
  status: text("status").notNull().default("pending"),
  joinedAt: timestamp("joined_at", { withTimezone: true }),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  subscriptionUserUnique: unique().on(table.subscriptionId, table.userId),
}));

// ==========================================
// AUDIT LOG
// ==========================================

export const auditLog = pgTable("audit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: uuid("entity_id"),
  metadata: jsonb("metadata"),
  ipAddress: inet("ip_address"),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index("idx_audit_log_user_id").on(table.userId),
  createdAtIdx: index("idx_audit_log_created").on(table.createdAt),
}));

// ==========================================
// RELATIONS
// ==========================================

import { relations, sql } from "drizzle-orm";

export const usersRelations = relations(users, ({ many, one }) => ({
  sessions: many(userSessions),
  brands: many(brands),
  templates: many(templates),
  products: many(products),
  mockups: many(mockups),
  integrations: many(integrations),
  aiGenerations: many(aiGenerations),
  subscription: one(subscriptions),
  auditLogs: many(auditLog),
  invitedTeamMembers: many(teamMembers, { relationName: "invitedBy" }),
}));

export const brandsRelations = relations(brands, ({ one, many }) => ({
  user: one(users, { fields: [brands.userId], references: [users.id] }),
  products: many(products),
  mockups: many(mockups),
}));

export const templatesRelations = relations(templates, ({ one, many }) => ({
  user: one(users, { fields: [templates.userId], references: [users.id] }),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  user: one(users, { fields: [products.userId], references: [users.id] }),
  brand: one(brands, { fields: [products.brandId], references: [brands.id] }),
  template: one(templates, { fields: [products.templateId], references: [templates.id] }),
  mockups: many(mockups),
}));

export const mockupsRelations = relations(mockups, ({ one }) => ({
  user: one(users, { fields: [mockups.userId], references: [users.id] }),
  product: one(products, { fields: [mockups.productId], references: [products.id] }),
  brand: one(brands, { fields: [mockups.brandId], references: [brands.id] }),
}));

export const integrationsRelations = relations(integrations, ({ one }) => ({
  user: one(users, { fields: [integrations.userId], references: [users.id] }),
}));

export const aiGenerationsRelations = relations(aiGenerations, ({ one }) => ({
  user: one(users, { fields: [aiGenerations.userId], references: [users.id] }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one, many }) => ({
  user: one(users, { fields: [subscriptions.userId], references: [users.id] }),
  teamMembers: many(teamMembers),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  subscription: one(subscriptions, { fields: [teamMembers.subscriptionId], references: [subscriptions.id] }),
  user: one(users, { fields: [teamMembers.userId], references: [users.id] }),
  inviter: one(users, { fields: [teamMembers.invitedBy], references: [users.id], relationName: "invitedBy" }),
}));

// ==========================================
// TYPES
// ==========================================

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Brand = typeof brands.$inferSelect;
export type NewBrand = typeof brands.$inferInsert;
export type Template = typeof templates.$inferSelect;
export type NewTemplate = typeof templates.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Mockup = typeof mockups.$inferSelect;
export type NewMockup = typeof mockups.$inferInsert;
export type Integration = typeof integrations.$inferSelect;
export type NewIntegration = typeof integrations.$inferInsert;
export type AiGeneration = typeof aiGenerations.$inferSelect;
export type NewAiGeneration = typeof aiGenerations.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type TierLimit = typeof tierLimits.$inferSelect;
export type NewTierLimit = typeof tierLimits.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type AuditLog = typeof auditLog.$inferSelect;
export type NewAuditLog = typeof auditLog.$inferInsert;
export type UserSession = typeof userSessions.$inferSelect;
export type NewUserSession = typeof userSessions.$inferInsert;
