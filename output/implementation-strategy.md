# Implementation Strategy & Architecture — Cockbrothers

> **Dátum:** 7. máj 2026
> **Agent:** 3 — Tech Lead
> **Vstup:** Market Research (Agent 1) + Business Strategy (Agent 2)
> **Stack:** Solid.js + Vinxi + Tailwind + TypeScript

---

## 1. Tech Stack

### Core Stack (locked — same as castle-game)

| Vrstva | Technológia | Verzia | Zdôvodnenie |
|--------|------------|--------|-------------|
| **Framework** | Solid.js | 1.9+ | Najrýchlejší reactive UI framework, žiadny virtual DOM, fine-grained reactivity — skvelý pre real-time preview rendering |
| **Meta-framework** | Vinxi | 1.x | SolidStart-based, full-stack (SSR + API routes), file-based routing, server functions |
| **Styling** | Tailwind CSS | 4.x | Utility-first, rýchly development, konzistentný design system |
| **Jazyk** | TypeScript | 5.x | Type safety end-to-end, lepšia DX, menej runtime chýb |
| **Package manager** | pnpm | 10.x | Rýchly, deterministic, workspace-ready |

### Supporting Stack

| Vrstva | Technológia | Zdôvodnenie |
|--------|------------|-------------|
| **Database** | PostgreSQL (Supabase) | Relačná, JSON podpora pre flexibilné brand schemas, row-level security |
| **ORM** | Drizzle | Type-safe, lightweight, SQL-like, lepší DX ako Prisma pre Solid ekosystém |
| **Auth** | Supabase Auth | Built-in row-level security, OAuth (Google, GitHub, Discord), magic link |
| **Storage** | Supabase Storage | Asset storage pre logá, fonty, mockupy. CDN-enabled, row-level security |
| **AI/ML** | OpenAI API (GPT-4o) + Replicate (Stability AI) | Text-to-brand (GPT), text-to-image (Stable Diffusion), logo generation |
| **Image processing** | Sharp + @resvg/resvg-js | Server-side image compositing, SVG rendering, mockup generation |
| **Payments** | Stripe | Subscription management, metered billing, webhooks pre eventy |
| **Hosting** | Vercel | Solid.js-native, edge functions, preview deployments |
| **Queue / Jobs** | Inngest | Reliable job queue pre async image processing, batch exports |
| **CDN** | Vercel Edge + Supabase CDN | Global image delivery, low latency |
| **Monitoring** | Sentry + PostHog | Error tracking, product analytics, feature flags |
| **Email** | Resend | Transactional emails (welcome, invoices, subscription events) |

---

## 2. Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT (Solid.js SSR)                        │
│                                                                     │
│  ┌──────────┐  ┌──────────────┐  ┌──────────┐  ┌───────────────┐   │
│  │ Brand Kit │  │ Template     │  │ Mockup   │  │ Dashboard     │   │
│  │ Creator   │  │ Engine       │  │ Gallery  │  │ & Settings    │   │
│  └────┬─────┘  └──────┬───────┘  └────┬─────┘  └──────┬────────┘   │
│       │               │               │               │            │
│  ┌────┴───────────────┴───────────────┴───────────────┴────────┐   │
│  │                  State Layer (Solid Stores)                   │   │
│  │  brandStore │ templateStore │ mockupStore │ userStore        │   │
│  └────────────────────────────┬─────────────────────────────────┘   │
│                               │                                     │
│  ┌────────────────────────────┴─────────────────────────────────┐   │
│  │                API Client (server functions)                   │   │
│  └────────────────────────────┬─────────────────────────────────┘   │
└───────────────────────────────┼─────────────────────────────────────┘
                                │
┌───────────────────────────────┼─────────────────────────────────────┐
│                      VINXI API ROUTES                                │
│                               │                                     │
│  ┌───────────┐ ┌──────────┐ ┌┴───────┐ ┌────────┐ ┌──────────┐   │
│  │ Brand     │ │ Template │ │ Mockup │ │ User   │ │ Payments │   │
│  │ /api/brand│ │/api/tmpl │ │/api/mkp│ │/api/auth│ │/api/billing│ │
│  └─────┬─────┘ └────┬─────┘ └───┬────┘ └───┬────┘ └─────┬─────┘   │
│        │             │           │          │            │         │
│  ┌─────┴─────────────┴───────────┴──────────┴────────────┴─────┐   │
│  │                    Service Layer                               │   │
│  │  BrandService │ TemplateService │ MockupService │ UserService  │   │
│  │  AIBrandService │ PaymentService │ PODService                  │   │
│  └───────────────────────────┬───────────────────────────────────┘   │
│                              │                                      │
│  ┌───────────────────────────┴───────────────────────────────────┐   │
│  │                    Database (PostgreSQL + Drizzle)              │   │
│  └───────────────────────────┬───────────────────────────────────┘   │
│                              │                                      │
│  ┌───────────────────────────┴───────────────────────────────────┐   │
│  │                    External Integrations                        │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐    │   │
│  │  │ OpenAI   │ │Replicate │ │ Printful │ │ Printify      │    │   │
│  │  │ GPT-4o   │ │Stability │ │ API      │ │ API           │    │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └───────────────┘    │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                      │   │
│  │  │ Stripe   │ │ Supabase │ │ Resend   │                      │   │
│  │  └──────────┘ └──────────┘ └──────────┘                      │   │
│  └───────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Directory Structure

```
cockbrothers/
├── app/
│   ├── routes/                    # File-based routing (Vinxi)
│   │   ├── index.tsx              # Landing page
│   │   ├── login.tsx              # Auth pages
│   │   ├── register.tsx
│   │   ├── dashboard/
│   │   │   ├── index.tsx          # Dashboard home
│   │   │   ├── brands/
│   │   │   │   ├── index.tsx      # Brand list
│   │   │   │   ├── [id].tsx       # Brand detail/edit
│   │   │   │   └── new.tsx        # Create brand
│   │   │   ├── templates/
│   │   │   │   ├── index.tsx      # Template library
│   │   │   │   └── [id].tsx       # Template editor
│   │   │   ├── products/
│   │   │   │   ├── index.tsx      # Product list (branded)
│   │   │   │   └── [id].tsx       # Product detail/generate
│   │   │   ├── mockups/
│   │   │   │   ├── index.tsx      # Mockup gallery
│   │   │   │   └── [id].tsx       # Mockup detail
│   │   │   ├── integrations/
│   │   │   │   ├── index.tsx      # Integration hub
│   │   │   │   ├── printful.tsx   # Printful connect
│   │   │   │   ├── printify.tsx   # Printify connect
│   │   │   │   └── shopify.tsx    # Shopify connect
│   │   │   ├── settings/
│   │   │   │   ├── index.tsx      # Account settings
│   │   │   │   ├── billing.tsx    # Subscription management
│   │   │   │   └── team.tsx       # Team management (Agency)
│   │   │   └── analytics.tsx      # Analytics dashboard
│   │   ├── api/                   # API routes
│   │   │   ├── auth/
│   │   │   │   └── callback.ts    # OAuth callback
│   │   │   ├── brands/
│   │   │   │   ├── index.ts       # CRUD brands
│   │   │   │   ├── [id].ts        # Single brand operations
│   │   │   │   ├── [id]/generate.ts  # AI brand generation
│   │   │   │   └── [id]/preview.ts   # Brand preview
│   │   │   ├── templates/
│   │   │   │   ├── index.ts       # CRUD templates
│   │   │   │   └── [id].ts        # Single template ops
│   │   │   ├── products/
│   │   │   │   ├── index.ts       # List/create products
│   │   │   │   ├── [id].ts        # Product operations
│   │   │   │   ├── [id]/generate.ts # Generate mockups
│   │   │   │   └── batch.ts       # Batch operations
│   │   │   ├── mockups/
│   │   │   │   ├── index.ts       # List mockups
│   │   │   │   ├── [id].ts        # Single mockup ops
│   │   │   │   └── export.ts      # Batch export / ZIP
│   │   │   ├── integrations/
│   │   │   │   ├── printful/
│   │   │   │   │   ├── connect.ts
│   │   │   │   │   ├── products.ts
│   │   │   │   │   └── push.ts
│   │   │   │   └── printify/
│   │   │   │       ├── connect.ts
│   │   │   │       ├── products.ts
│   │   │   │       └── push.ts
│   │   │   ├── payments/
│   │   │   │   ├── subscribe.ts
│   │   │   │   ├── portal.ts      # Stripe customer portal
│   │   │   │   └── webhook.ts     # Stripe webhooks
│   │   │   └── webhooks/
│   │   │       └── inngest.ts     # Inngest handler
│   │   └── share/
│   │       └── [token].tsx        # Shared brand kit (public)
│   ├── components/
│   │   ├── ui/                    # Design system primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── ColorPicker.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── Spinner.tsx
│   │   ├── brand/
│   │   │   ├── BrandKitCreator.tsx
│   │   │   ├── BrandPreview.tsx
│   │   │   ├── BrandColorPicker.tsx
│   │   │   ├── BrandFontSelector.tsx
│   │   │   ├── BrandLogoUploader.tsx
│   │   │   ├── BrandVoiceEditor.tsx
│   │   │   ├── BrandList.tsx
│   │   │   └── BrandCard.tsx
│   │   ├── template/
│   │   │   ├── TemplateGrid.tsx
│   │   │   ├── TemplateCard.tsx
│   │   │   ├── TemplateEditor.tsx
│   │   │   ├── TemplateCanvas.tsx
│   │   │   └── TemplateLayerPanel.tsx
│   │   ├── product/
│   │   │   ├── ProductList.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductConfigurator.tsx
│   │   │   ├── ProductMockupPreview.tsx
│   │   │   ├── BatchProcessor.tsx
│   │   │   └── BrandScoreIndicator.tsx
│   │   ├── mockup/
│   │   │   ├── MockupGallery.tsx
│   │   │   ├── MockupPreview.tsx
│   │   │   ├── MockupExportButton.tsx
│   │   │   └── MockupPlaceholder.tsx
│   │   ├── integration/
│   │   │   ├── IntegrationCard.tsx
│   │   │   ├── IntegrationConnectButton.tsx
│   │   │   ├── PrintfulProductBrowser.tsx
│   │   │   ├── PrintifyProductBrowser.tsx
│   │   │   └── PushToPODModal.tsx
│   │   ├── billing/
│   │   │   ├── PricingCards.tsx
│   │   │   ├── SubscriptionStatus.tsx
│   │   │   └── PlanUpgradeModal.tsx
│   │   ├── layout/
│   │   │   ├── AppShell.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopNav.tsx
│   │   │   ├── BrandSwitcher.tsx
│   │   │   └── Footer.tsx
│   │   └── shared/
│   │       ├── ColorPaletteDisplay.tsx
│   │       ├── FontPreview.tsx
│   │       └── ConfirmDialog.tsx
│   ├── stores/                    # Solid.js stores
│   │   ├── brandStore.ts
│   │   ├── templateStore.ts
│   │   ├── mockupStore.ts
│   │   ├── userStore.ts
│   │   ├── integrationStore.ts
│   │   ├── uiStore.ts
│   │   └── pricingStore.ts
│   ├── lib/                       # Utilities & helpers
│   │   ├── api/
│   │   │   ├── client.ts          # API client base
│   │   │   ├── brands.ts          # Brand API calls
│   │   │   ├── templates.ts
│   │   │   ├── mockups.ts
│   │   │   ├── integrations.ts
│   │   │   └── payments.ts
│   │   ├── ai/
│   │   │   ├── brandGenerator.ts
│   │   │   ├── logoGenerator.ts
│   │   │   ├── colorExtractor.ts
│   │   │   └── imageProcessor.ts
│   │   ├── pod/
│   │   │   ├── types.ts           # Shared POD types
│   │   │   ├── printful.ts        # Printful API adapter
│   │   │   ├── printify.ts        # Printify API adapter
│   │   │   └── mockupRenderer.ts  # Server-side mockup gen
│   │   ├── db/                    # Drizzle schema & queries
│   │   │   ├── schema.ts
│   │   │   ├── migrations/
│   │   │   └── queries/
│   │   │       ├── brands.ts
│   │   │       ├── templates.ts
│   │   │       ├── products.ts
│   │   │       ├── mockups.ts
│   │   │       └── users.ts
│   │   ├── stripe/
│   │   │   ├── client.ts
│   │   │   └── webhooks.ts
│   │   ├── utils/
│   │   │   ├── colors.ts          # Color math, contrast
│   │   │   ├── fonts.ts           # Font loading
│   │   │   ├── canvas.ts          # Canvas operations
│   │   │   ├── zip.ts             # ZIP generation
│   │   │   └── validation.ts
│   │   └── constants.ts
│   ├── providers/
│   │   ├── AuthProvider.tsx
│   │   ├── BrandProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── SubscriptionProvider.tsx
│   ├── hooks/
│   │   ├── useBrand.ts
│   │   ├── useTemplates.ts
│   │   ├── useMockups.ts
│   │   ├── useAuth.ts
│   │   ├── useSubscription.ts
│   │   ├── useIntegration.ts
│   │   ├── useBreakpoints.ts
│   │   └── useDebounce.ts
│   └── styles/
│       ├── global.css
│       └── brand.module.css
├── public/
│   ├── fonts/
│   ├── templates/                 # Default template assets
│   └── mockups/                   # Mockup backgrounds
├── server/                        # Vinxi server config
│   └── config.ts
├── drizzle.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vinxi.config.ts
└── package.json
```

### 2.3 Data Flow Architecture

```
User Action (UI)
    │
    ▼
Solid Store (optimistic update)
    │
    ▼
Server Function (Vinxi)
    │
    ├──→ Validate (Zod schema)
    │
    ├──→ Service Layer
    │       ├──→ Database (Drizzle + PostgreSQL)
    │       ├──→ AI Service (OpenAI / Replicate)
    │       ├──→ Image Processing (Sharp)
    │       └──→ External APIs (Printful/Printify/Stripe)
    │
    ├──→ Response
    │
    ▼
Store Update (reconcile)
    │
    ▼
DOM Reactive Update
```

### 2.4 Database Schema

```sql
-- ==========================================
-- USERS & AUTH
-- ==========================================

CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT UNIQUE NOT NULL,
  name            TEXT,
  avatar_url      TEXT,
  tier            TEXT NOT NULL DEFAULT 'free'
                    CHECK (tier IN ('free', 'starter', 'pro', 'agency', 'enterprise')),
  subscription_id TEXT,  -- Stripe subscription ID
  stripe_customer_id TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE user_sessions (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token     TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tier limits (denormalized for fast queries)
CREATE TABLE tier_limits (
  tier            TEXT PRIMARY KEY,
  max_brands      INT NOT NULL,
  max_products    INT NOT NULL,       -- 0 = unlimited
  max_mockups     INT NOT NULL,       -- 0 = unlimited
  ai_generations  INT NOT NULL,       -- per month, 0 = unlimited
  batch_export    BOOLEAN NOT NULL DEFAULT false,
  api_access      BOOLEAN NOT NULL DEFAULT false,
  integrations    INT NOT NULL DEFAULT 0,  -- max POD integrations
  team_members    INT NOT NULL DEFAULT 1,
  white_label     BOOLEAN NOT NULL DEFAULT false,
  price_monthly   DECIMAL(10,2) NOT NULL
);

-- Seed tiers
INSERT INTO tier_limits VALUES
  ('free',      1,  3,   10,  5,    false, false, 0, 1,  false, 0),
  ('starter',   3,  20,  100, 50,   true,  false, 1, 1,  false, 9.00),
  ('pro',       10, 0,   0,   500,  true,  true,  3, 1,  false, 19.00),
  ('agency',    0,  0,   0,   2000, true,  true,  10, 10, true,  49.00),
  ('enterprise',0, 0,   0,   0,    true,  true,  0,  0,  true,  0);

-- ==========================================
-- BRANDS
-- ==========================================

CREATE TABLE brands (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL,
  description     TEXT,
  
  -- Brand Identity
  logo_url        TEXT,
  logo_thumbnail  TEXT,
  primary_color   TEXT NOT NULL DEFAULT '#000000',
  secondary_color TEXT NOT NULL DEFAULT '#FFFFFF',
  accent_color    TEXT,
  colors          JSONB NOT NULL DEFAULT '[]',      -- Extended palette
  heading_font    TEXT NOT NULL DEFAULT 'Inter',
  body_font       TEXT NOT NULL DEFAULT 'Inter',
  font_weights    JSONB NOT NULL DEFAULT '{}',
  
  -- Brand Voice
  brand_voice     TEXT,           -- Description of brand voice
  brand_tagline   TEXT,
  brand_bio       TEXT,
  
  -- AI Metadata
  ai_generated      BOOLEAN NOT NULL DEFAULT false,
  generation_prompt TEXT,
  generation_model  TEXT,
  
  -- Stats
  brand_score       INT DEFAULT 0,     -- AI consistency score
  products_count    INT DEFAULT 0,
  mockups_count     INT DEFAULT 0,
  
  -- Meta
  is_default      BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(user_id, slug)
);

CREATE INDEX idx_brands_user_id ON brands(user_id);
CREATE INDEX idx_brands_slug ON brands(slug);

-- ==========================================
-- TEMPLATES
-- ==========================================

CREATE TABLE templates (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL,
  description     TEXT,
  
  -- Product type
  product_type    TEXT NOT NULL
                    CHECK (product_type IN (
                      'tshirt', 'hoodie', 'sweatshirt', 'tank_top',
                      'mug', 'poster', 'canvas', 'tote_bag',
                      'phone_case', 'hat', 'pin', 'sticker',
                      'leggings', 'pillow', 'blanket'
                    )),
  -- Template JSON — defines canvas size, layers, zones
  template_data   JSONB NOT NULL DEFAULT '{}',
  
  -- Preview
  preview_url     TEXT,
  
  -- Meta
  is_public       BOOLEAN NOT NULL DEFAULT false,
  is_system       BOOLEAN NOT NULL DEFAULT false,  -- System-provided defaults
  usage_count     INT NOT NULL DEFAULT 0,
  category        TEXT,
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(user_id, slug)
);

CREATE INDEX idx_templates_product_type ON templates(product_type);
CREATE INDEX idx_templates_public ON templates(is_public) WHERE is_public = true;

-- ==========================================
-- PRODUCTS (Brand + Template + Variants)
-- ==========================================

CREATE TABLE products (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  brand_id          UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  template_id       UUID NOT NULL REFERENCES templates(id) ON DELETE RESTRICT,
  name              TEXT NOT NULL,
  
  -- Generated imagery
  mockup_urls       JSONB NOT NULL DEFAULT '[]',  -- Array of {variant, url}
  thumbnail_url     TEXT,
  
  -- Config snapshot (what brand elements were applied how)
  config            JSONB NOT NULL DEFAULT '{}',
  
  -- Brand score
  brand_score       INT DEFAULT 0,
  
  -- POD integration links
  pod_connections   JSONB NOT NULL DEFAULT '[]',  -- [{platform, product_id, variant_id, url}]
  
  -- Meta
  is_archived       BOOLEAN NOT NULL DEFAULT false,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_brand_id ON products(brand_id);
CREATE INDEX idx_products_user_id ON products(user_id);

-- ==========================================
-- MOCKUPS (Rendered outputs)
-- ==========================================

CREATE TABLE mockups (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id      UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  brand_id        UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  
  -- Variant info
  variant_name    TEXT NOT NULL,        -- "black-tshirt-front", "white-mug-side"
  product_color   TEXT,                 -- Base product color if applicable
  
  -- Asset
  image_url       TEXT NOT NULL,
  thumbnail_url   TEXT,
  image_width     INT,
  image_height    INT,
  file_size       INT,                  -- bytes
  format          TEXT NOT NULL DEFAULT 'png'
                    CHECK (format IN ('png', 'jpg', 'webp')),
  
  -- Generation metadata
  generation_time_ms INT,
  ai_enhanced     BOOLEAN NOT NULL DEFAULT false,
  
  -- Export
  download_count  INT NOT NULL DEFAULT 0,
  last_downloaded TIMESTAMPTZ,
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_mockups_product_id ON mockups(product_id);
CREATE INDEX idx_mockups_user_id ON mockups(user_id);

-- ==========================================
-- INTEGRATIONS (POD Platform Connections)
-- ==========================================

CREATE TABLE integrations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform        TEXT NOT NULL
                    CHECK (platform IN ('printful', 'printify', 'shopify', 'etsy', 'gelato', 'spod')),
  display_name    TEXT,
  
  -- OAuth / API keys (encrypted at rest)
  access_token    TEXT,     -- encrypted
  refresh_token   TEXT,     -- encrypted
  token_expires_at TIMESTAMPTZ,
  api_key         TEXT,     -- encrypted (for platforms using API keys)
  
  -- Platform-specific data
  platform_store_id TEXT,   -- Shopify store ID, Printify shop ID, etc.
  platform_data     JSONB, -- Cached platform info
  
  -- Status
  is_active       BOOLEAN NOT NULL DEFAULT true,
  last_sync_at    TIMESTAMPTZ,
  error_message   TEXT,
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(user_id, platform)
);

-- ==========================================
-- AI GENERATION LOGS (usage tracking)
-- ==========================================

CREATE TABLE ai_generations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  generation_type TEXT NOT NULL
                    CHECK (generation_type IN (
                      'brand_kit', 'logo', 'color_palette',
                      'brand_voice', 'mockup', 'enhancement',
                      'brand_score'
                    )),
  model_used      TEXT NOT NULL,
  prompt          TEXT,
  tokens_used     INT,
  cost_usd        DECIMAL(10,6),
  response_data   JSONB,
  duration_ms     INT,
  success         BOOLEAN NOT NULL DEFAULT true,
  error_message   TEXT,
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ai_generations_user_id ON ai_generations(user_id);
CREATE INDEX idx_ai_generations_created ON ai_generations(created_at);

-- ==========================================
-- SUBSCRIPTION / BILLING
-- ==========================================

CREATE TABLE subscriptions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_id         TEXT UNIQUE,        -- Stripe subscription ID
  stripe_customer_id TEXT,
  
  tier              TEXT NOT NULL REFERENCES tier_limits(tier),
  status            TEXT NOT NULL DEFAULT 'active'
                      CHECK (status IN (
                        'active', 'canceled', 'past_due',
                        'incomplete', 'trialing', 'paused'
                      )),
  
  -- Billing
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end   TIMESTAMPTZ NOT NULL,
  trial_end         TIMESTAMPTZ,
  canceled_at       TIMESTAMPTZ,
  
  -- Usage (for metered billing)
  ai_generations_used INT NOT NULL DEFAULT 0,
  mockups_generated   INT NOT NULL DEFAULT 0,
  storage_bytes_used  BIGINT NOT NULL DEFAULT 0,
  
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==========================================
-- TEAM (for Agency tier)
-- ==========================================

CREATE TABLE team_members (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role            TEXT NOT NULL DEFAULT 'member'
                    CHECK (role IN ('admin', 'editor', 'viewer')),
  invited_by      UUID NOT NULL REFERENCES users(id),
  status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'active', 'declined', 'removed')),
  joined_at       TIMESTAMPTZ,
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(subscription_id, user_id)
);

-- ==========================================
-- TEMPLATE MARKETPLACE (Phase 4)
-- ==========================================

CREATE TABLE marketplace_templates (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id     UUID NOT NULL REFERENCES templates(id) ON DELETE CASCADE,
  author_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  price_usd       DECIMAL(10,2) NOT NULL DEFAULT 0,  -- 0 = free
  revenue_share   DECIMAL(5,2) NOT NULL DEFAULT 70,  -- % to author
  download_count  INT NOT NULL DEFAULT 0,
  rating_avg      DECIMAL(3,2),
  rating_count    INT NOT NULL DEFAULT 0,
  
  is_published    BOOLEAN NOT NULL DEFAULT false,
  published_at    TIMESTAMPTZ,
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==========================================
-- EVENTS / AUDIT LOG
-- ==========================================

CREATE TABLE audit_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action          TEXT NOT NULL,
  entity_type     TEXT NOT NULL,
  entity_id       UUID,
  metadata        JSONB,
  ip_address      INET,
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX idx_audit_log_created ON audit_log(created_at);
```

---

## 3. Release Roadmap

### Phase 1: MVP Launch (M1) — "Brand in a Box"

**Cieľ:** Funkčný produkt pre prvých 500 užívateľov. Overenie core flow.

| Feature | Frontend | Backend | AI | Integrations |
|---------|----------|---------|-----|-------------|
| Brand kit creator (logo upload, colors, fonts) | ✅ | ✅ | – | – |
| AI brand assistant (text → brand kit) | ✅ | ✅ | ✅ GPT-4o | – |
| 5 product templates (tshirt, hoodie, mug, poster, tote) | ✅ | ✅ | – | – |
| Brand → template application | ✅ | ✅ | – | – |
| Mockup generation & PNG export | ✅ | ✅ | ✅ Sharp | – |
| Single brand kit (Free tier) | ✅ | ✅ | – | – |
| Email + Google OAuth auth | ✅ | ✅ | – | ✅ Supabase Auth |
| Landing page + pricing | ✅ | – | – | – |
| Stripe subscriptions | ✅ | ✅ | – | ✅ Stripe |

**Tech milestone:** Brand → Template → Export flow kompletný v produkcii.

### Phase 2: Growth & Integrations (M2-M4)

**Cieľ:** Multi-brand, POD API integrácie, batch processing.

| Feature | Frontend | Backend | AI | Integrations |
|---------|----------|---------|-----|-------------|
| Multi-brand management (3-10 brands) | ✅ | ✅ | – | – |
| Batch processing (1 brand → N products) | ✅ | ✅ | – | – |
| Printify API integrácia (push designs) | ✅ | ✅ | – | ✅ Printify |
| Printful API integrácia (push designs) | ✅ | ✅ | – | ✅ Printful |
| Shopify App | ✅ | ✅ | – | ✅ Shopify |
| Template library (50+ templates) | ✅ | ✅ | – | – |
| Brand consistency score | ✅ | ✅ | ✅ GPT-4o | – |
| Collection management (seasonal) | ✅ | ✅ | – | – |
| Brand switcher UI | ✅ | – | – | – |
| ZIP batch export | ✅ | ✅ | – | – |

**Tech milestone:** Všetky 3 POD integrácie (Printful, Printify, Shopify) funkčné.

### Phase 3: Power User & AI Moat (M5-M8)

**Cieľ:** AI features, white-label, API-first platform.

| Feature | Frontend | Backend | AI | Integrations |
|---------|----------|---------|-----|-------------|
| AI brand voice generator | ✅ | ✅ | ✅ GPT-4o | – |
| AI product descriptions | ✅ | ✅ | ✅ GPT-4o | – |
| White-label (Agency rebranding) | ✅ | ✅ | – | – |
| Public REST API | ✅ (docs) | ✅ | – | – |
| Social media export (TikTok, IG, Reels) | ✅ | ✅ | – | – |
| Webhook automations | – | ✅ | – | – |
| Multi-language support (EN, DE, FR, ES) | ✅ | ✅ | ✅ GPT-4o | – |
| Team collaboration (multi-user) | ✅ | ✅ | – | – |
| Analytics dashboard | ✅ | ✅ | – | – |
| Embeddable brand widget | ✅ | ✅ | – | – |

**Tech milestone:** Public API dokumentovaná + white-label ready.

### Phase 4: Platform & Scale (M9-M12+)

**Cieľ:** Plná platforma, marketplace, enterprise features.

| Feature | Frontend | Backend | AI | Integrations |
|---------|----------|---------|-----|-------------|
| Direct POD fulfillment (create → print → ship) | ✅ | ✅ | – | ✅ Multi-POD |
| AI product photography (lifestyle mockups) | ✅ | ✅ | ✅ Replicate | – |
| Template marketplace (community) | ✅ | ✅ | – | – |
| Enterprise SSO/SAML | ✅ | ✅ | – | ✅ Auth0/Okta |
| Custom AI model fine-tuning | ✅ | ✅ | ✅ Custom | – |
| Mobile responsive (PWA) | ✅ | – | – | – |
| Revenue sharing payouts | ✅ | ✅ | – | ✅ Stripe Connect |
| Advanced analytics (brand performance) | ✅ | ✅ | ✅ AI | – |

**Tech milestone:** Platform mode — external developers build on top of API.

---

## 4. Component Design

### 4.1 Component Hierarchy (Desktop)

```
<AuthProvider>
  <SubscriptionProvider>
    <BrandProvider>
      <ThemeProvider>
        <AppShell>
          ├── <Sidebar>
          │   ├── <BrandSwitcher />        // Multi-brand quick switch
          │   ├── <NavMenu />              // Dashboard navigation
          │   └── <UpgradePrompt />        // Conditional upgrade CTA
          │
          ├── <TopNav>
          │   ├── <Breadcrumbs />
          │   ├── <SearchCommand />        // ⌘K command palette
          │   └── <UserMenu />             // Avatar + dropdown
          │
          └── <main>  ← Route outlet
              │
              ├── [Dashboard]
              │   ├── <BrandScoreCard />   // Overall brand health
              │   ├── <RecentProducts />
              │   ├── <QuickActions />
              │   └── <IntegrationStatus />
              │
              ├── [BrandKitCreator] ← /dashboard/brands/new
              │   ├── <BrandForm />
              │   │   ├── <BrandLogoUploader />
              │   │   ├── <BrandColorPicker />
              │   │   │   ├── <ColorInput /> x 3
              │   │   │   └── <PaletteSuggestion />  // AI suggested colors
              │   │   ├── <BrandFontSelector />
              │   │   └── <BrandVoiceEditor />
              │   ├── <BrandPreview />     // Live preview panel
              │   │   ├── <ColorPaletteDisplay />
              │   │   ├── <FontPreview />
              │   │   └── <LogoPreview />
              │   └── <AIAssistButton />   // "Generate brand with AI"
              │       └── → <AIModal />    // Prompt → brand generation
              │
              ├── [TemplateEditor]
              │   ├── <TemplateCanvas />    // Core canvas component
              │   ├── <TemplateLayerPanel />
              │   │   ├── <LayerList />
              │   │   └── <LayerProperties />
              │   └── <BrandApplicationPanel />
              │       ├── <BrandSelector />
              │       └── <ApplyButton />
              │
              ├── [ProductConfigurator] ← /dashboard/products/new
              │   ├── <BrandSelector />
              │   ├── <TemplateSelector />
              │   │   └── <TemplateGrid />
              │   ├── <ProductMockupPreview />  // Live WYSIWYG
              │   ├── <VariantSelector />        // Color, size, orientation
              │   └── <GenerateButton />         // Batch generate
              │
              ├── [MockupGallery]
              │   ├── <MockupGrid />
              │   │   └── <MockupPreview /> x N
              │   ├── <MockupFilterBar />
              │   └── <ExportToolbar />
              │       ├── <BatchDownloadButton />
              │       └── <PushToPODButton />
              │
              └── [IntegrationHub]
                  ├── <IntegrationCard /> x N
                  │   ├── <IntegrationStatus />
                  │   ├── <IntegrationConnectButton />
                  │   └── <SyncNowButton />
                  └── <PushToPODModal />   // Multi-platform push dialog

        </AppShell>
      </ThemeProvider>
    </BrandProvider>
  </SubscriptionProvider>
</AuthProvider>
```

### 4.2 Key Components & Responsibilities

| Component | Responsibility | State Dependencies |
|-----------|---------------|-------------------|
| **BrandKitCreator** | Orchestrates the entire brand creation flow. Manages multi-step form (logo → colors → fonts → voice). Handles validation, AI assist trigger, preview updates. | brandStore, userStore (tier limits) |
| **BrandPreview** | Pure display component showing live brand preview. Reflects all brand properties in real-time. Used in creator, detail view, and template editor. | brandStore (selected brand) |
| **BrandColorPicker** | Color input component with hex input, swatches, contrast checker (WCAG), and AI suggested palette generation. | brandStore (colors slice) |
| **TemplateCanvas** | SVG/Canvas-based editor for product templates. Handles drag-and-drop layers, zoom, grid snapping. Core of the mockup generation pipeline. | templateStore, brandStore |
| **ProductMockupPreview** | WYSIWYG preview showing how a brand looks on a specific product variant. Uses server-generated thumbnail but supports client-side quick preview via Canvas API for performance. | mockupStore, brandStore, templateStore |
| **BrandSwitcher** | Dropdown/command palette for switching between brands. Critical for multi-brand power users. Shows brand avatar, name, product count. | brandStore (list), userStore (tier max) |
| **BatchProcessor** | Wizard-style flow: select brand → select templates → select variants → generate all. Progress tracking with Inngest. | brandStore, templateStore, mockupStore |
| **BrandScoreIndicator** | Circular gauge showing brand consistency score (0-100). Click opens detailed breakdown: color consistency, font usage, logo placement. | mockupStore (aggregated data) |
| **PushToPODModal** | Dialog for pushing designs to connected POD platforms. Shows platform-specific product catalogs, maps variants, handles OAuth re-auth if needed. | integrationStore, mockupStore |
| **TemplateGrid** | Searchable, filterable grid of templates. Supports category filtering (apparel, home, accessories), preview on hover, drag to canvas. | templateStore |
| **AIModal** | Chat-like interface for AI brand generation. User describes their brand, AI generates complete brand kit. Shows generation progress, allows regeneration. | brandStore (create action) |
| **IntegrationCard** | Card showing a connected/disconnected POD platform. Shows sync status, last sync time, disconnect/connect action. | integrationStore |

---

## 5. API Design

### 5.1 REST API Endpoints

All endpoints are prefixed with `/api`. Auth required unless marked `[public]`.

#### Brands

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/brands` | List user's brands (pagination, search) |
| `POST` | `/api/brands` | Create brand |
| `GET` | `/api/brands/:id` | Get brand detail |
| `PATCH` | `/api/brands/:id` | Update brand |
| `DELETE` | `/api/brands/:id` | Delete brand |
| `POST` | `/api/brands/:id/duplicate` | Duplicate brand |
| `POST` | `/api/brands/:id/generate` | [AI] Generate/regenerate brand kit |
| `GET` | `/api/brands/:id/preview` | Get brand preview data (for embed) |
| `POST` | `/api/brands/generate-from-prompt` | [AI] Generate brand from text prompt |
| `GET` | `/api/brands/:id/score` | Get brand consistency score |
| `GET` | `/api/brands/:id/export` | Export brand kit as JSON |

#### Templates

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/templates` | List templates (system + user) |
| `POST` | `/api/templates` | Create template |
| `GET` | `/api/templates/:id` | Get template detail |
| `PATCH` | `/api/templates/:id` | Update template |
| `DELETE` | `/api/templates/:id` | Delete template |
| `GET` | `/api/templates/:id/render` | Render template preview |
| `POST` | `/api/templates/:id/apply-brand` | Apply brand to template (dry run) |
| `GET` | `/api/templates/public` | [public] List public templates |
| `GET` | `/api/templates/products` | Get template options by product type |

#### Products (Branded)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | List user's products |
| `POST` | `/api/products` | Create product (link brand + template) |
| `GET` | `/api/products/:id` | Get product detail |
| `PATCH` | `/api/products/:id` | Update product config |
| `DELETE` | `/api/products/:id` | Delete product |
| `POST` | `/api/products/:id/generate` | Generate mockups for product |
| `POST` | `/api/products/batch` | Batch create (brand → multiple templates) |
| `POST` | `/api/products/batch/generate` | Batch generate mockups |
| `GET` | `/api/products/:id/variants` | Get product variant options |
| `POST` | `/api/products/:id/push` | Push to connected POD platform |

#### Mockups

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/mockups` | List user's mockups (pagination, filters) |
| `GET` | `/api/mockups/:id` | Get mockup detail |
| `DELETE` | `/api/mockups/:id` | Delete mockup |
| `POST` | `/api/mockups/export` | Batch export (ZIP download) |
| `POST` | `/api/mockups/:id/regenerate` | Regenerate single mockup |
| `GET` | `/api/mockups/:id/download` | Download mockup file |
| `POST` | `/api/mockups/:id/ai-enhance` | [AI] Enhance mockup quality |

#### Integrations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/integrations` | List user's integrations |
| `POST` | `/api/integrations/:platform/connect` | Start OAuth flow |
| `GET` | `/api/integrations/:platform/callback` | [public] OAuth callback |
| `DELETE` | `/api/integrations/:platform` | Disconnect platform |
| `POST` | `/api/integrations/:platform/sync` | Trigger sync |
| `GET` | `/api/integrations/:platform/products` | List platform's product catalog |
| `POST` | `/api/integrations/:platform/push` | Push product designs to platform |
| `GET` | `/api/integrations/:platform/status` | Get platform connection status |

#### Auth & Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | [public] Register with email |
| `POST` | `/api/auth/login` | [public] Login |
| `POST` | `/api/auth/logout` | Logout |
| `GET` | `/api/auth/me` | Get current user |
| `PATCH` | `/api/auth/me` | Update profile |
| `GET` | `/api/auth/session` | Check session validity |

#### Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/payments/subscribe` | Create/change subscription |
| `POST` | `/api/payments/cancel` | Cancel subscription |
| `GET` | `/api/payments/portal` | Get Stripe customer portal URL |
| `POST` | `/api/payments/webhook` | [public] Stripe webhook |
| `GET` | `/api/payments/current-plan` | Get current plan + usage |

#### Team (Agency)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/team` | List team members |
| `POST` | `/api/team/invite` | Invite team member |
| `DELETE` | `/api/team/:userId` | Remove team member |
| `PATCH` | `/api/team/:userId/role` | Change role |

#### Analytics (Phase 3+)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/analytics/brands` | Brand usage stats |
| `GET` | `/api/analytics/products` | Product generation stats |
| `GET` | `/api/analytics/integrations` | Integration usage stats |
| `GET` | `/api/analytics/mockups` | Mockup download stats |

#### Public API (Developer, Phase 3+)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/public/v1/brands` | List brands (API key auth) |
| `POST` | `/api/public/v1/brands` | Create brand via API |
| `GET` | `/api/public/v1/templates` | List templates |
| `POST` | `/api/public/v1/products/generate` | Generate product mockup |
| `POST` | `/api/public/v1/products/push` | Push to POD via API |
| `GET` | `/api/public/v1/me` | Get API key info |

### 5.2 API Response Format

```typescript
// Success
{
  "data": T,
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "hasMore": true
  }
}

// Error
{
  "error": {
    "code": "BRAND_LIMIT_EXCEEDED",
    "message": "You have reached the maximum number of brands for your tier.",
    "details": {
      "current": 3,
      "limit": 3,
      "tier": "starter",
      "upgradeUrl": "/dashboard/settings/billing"
    }
  }
}
```

### 5.3 Webhook Events

```typescript
// Events fired by Cockbrothers (for external consumers via webhooks)
type CockbrothersEvent =
  | "brand.created"
  | "brand.updated"
  | "brand.deleted"
  | "product.created"
  | "product.generated"
  | "mockup.exported"
  | "integration.connected"
  | "integration.disconnected"
  | "product.pushed"       // Push to POD succeeded
  | "product.push_failed"  // Push to POD failed
  | "subscription.changed"
  | "ai.generation.completed";

// Events consumed by Cockbrothers (incoming webhooks)
type IncomingWebhook =
  | "stripe.subscription.created"
  | "stripe.subscription.updated"
  | "stripe.subscription.deleted"
  | "stripe.invoice.paid"
  | "stripe.invoice.payment_failed"
  | "printful.order.created"     // Notify when POD order status changes
  | "printify.order.status_changed";
```

---

## 6. State Management

### 6.1 Store Architecture

Solid.js uses fine-grained reactivity with `createStore` and `createSignal`. We'll structure stores as follows:

```typescript
// === brandStore.ts ===
// Core brand state management

interface BrandState {
  brands: Brand[];
  selectedBrandId: string | null;
  loading: boolean;
  error: string | null;
  
  // UI state
  creating: boolean;
  editing: boolean;
  dirty: boolean;  // Unsaved changes
}

// Actions
interface BrandActions {
  fetchBrands: () => Promise<void>;
  selectBrand: (id: string) => void;
  createBrand: (data: CreateBrandInput) => Promise<Brand>;
  updateBrand: (id: string, data: Partial<Brand>) => Promise<Brand>;
  deleteBrand: (id: string) => Promise<void>;
  generateBrand: (prompt: string) => Promise<Brand>;
  duplicateBrand: (id: string) => Promise<Brand>;
}

// === templateStore.ts ===

interface TemplateState {
  templates: Template[];
  selectedTemplateId: string | null;
  systemTemplates: Template[];  // Default templates
  userTemplates: Template[];    // User-created
  filter: {
    productType: string | null;
    search: string;
  };
  loading: boolean;
}

// === mockupStore.ts ===

interface MockupState {
  mockups: Mockup[];
  selectedMockupId: string | null;
  generationQueue: GenerationJob[];  // Pending/in-progress jobs
  filter: {
    brandId: string | null;
    productId: string | null;
    dateRange: [Date, Date] | null;
  };
  loading: boolean;
}

// === userStore.ts ===

interface UserState {
  user: User | null;
  session: Session | null;
  tier: Tier | null;
  tierLimits: TierLimits | null;
  loading: boolean;
}

// === integrationStore.ts ===

interface IntegrationState {
  integrations: Integration[];
  syncing: Set<string>;   // Platforms currently syncing
  pushQueue: PushJob[];
  loading: boolean;
}

// === uiStore.ts ===

interface UIState {
  sidebar: 'expanded' | 'collapsed';
  theme: 'light' | 'dark' | 'system';
  activeModal: string | null;
  toasts: Toast[];
  commandPalette: boolean;
}
```

### 6.2 Store Implementation Pattern

```typescript
// Example: brandStore.ts implementation pattern
import { createStore, produce } from 'solid-js/store';
import { createResource } from 'solid-js';
import { api } from '~/lib/api/client';

function createBrandStore() {
  const [state, setState] = createStore<BrandState>({
    brands: [],
    selectedBrandId: null,
    loading: false,
    error: null,
    creating: false,
    editing: false,
    dirty: false,
  });

  // Derived signals
  const selectedBrand = () => 
    state.brands.find(b => b.id === state.selectedBrandId) ?? null;
  
  const brandsCount = () => state.brands.length;
  
  const hasReachedLimit = (limit: number) => 
    state.brands.length >= limit;

  // Actions
  const fetchBrands = async () => {
    setState('loading', true);
    try {
      const brands = await api.brands.list();
      setState(produce(s => { s.brands = brands; s.loading = false; }));
    } catch (e) {
      setState({ loading: false, error: (e as Error).message });
    }
  };

  const selectBrand = (id: string) => {
    setState('selectedBrandId', id);
  };

  const createBrand = async (data: CreateBrandInput) => {
    setState('creating', true);
    try {
      const brand = await api.brands.create(data);
      setState(produce(s => { 
        s.brands.push(brand); 
        s.selectedBrandId = brand.id;
        s.creating = false;
        s.dirty = false;
      }));
      return brand;
    } catch (e) {
      setState({ creating: false, error: (e as Error).message });
      throw e;
    }
  };

  return {
    state,
    selectedBrand,
    brandsCount,
    hasReachedLimit,
    fetchBrands,
    selectBrand,
    createBrand,
    /* ... more actions */
  };
}

export const brandStore = createBrandStore();
```

### 6.3 Context Providers

```typescript
// providers/AuthProvider.tsx
// Provides auth state + methods to entire app tree
function AuthProvider(props: { children: JSX.Element }) {
  const [user, setUser] = createSignal<User | null>(null);
  const [session, setSession] = createSignal<Session | null>(null);
  
  // On mount, check session
  onMount(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);
    
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  });
  
  return (
    <AuthContext.Provider value={{ user, session, login, logout, register }}>
      {props.children}
    </AuthContext.Provider>
  );
}

// providers/BrandProvider.tsx
// Provides brand store and handles tier-based limits
function BrandProvider(props: { children: JSX.Element }) {
  const brands = brandStore;
  const [tierLimits] = useResource(() => api.tiers.getLimits());
  
  // Pre-fetch brands on mount
  onMount(() => brands.fetchBrands());
  
  return (
    <BrandContext.Provider value={{ ...brands, tierLimits }}>
      {props.children}
    </BrandContext.Provider>
  );
}

// providers/SubscriptionProvider.tsx
// Provides subscription status, plan limits, redirects
function SubscriptionProvider(props: { children: JSX.Element }) {
  const [subscription, setSubscription] = createSignal<Subscription | null>(null);
  
  onMount(async () => {
    const sub = await api.payments.currentPlan();
    setSubscription(sub);
  });
  
  return (
    <SubscriptionContext.Provider value={{ subscription, upgrade, cancel }}>
      {props.children}
    </SubscriptionContext.Provider>
  );
}
```

### 6.4 Optimistic Updates Pattern

```typescript
// Pattern for optimistic UI updates with rollback
async function deleteBrand(id: string) {
  // 1. Snapshot current state
  const previousBrands = [...state.brands];
  
  // 2. Optimistic update
  setState(produce(s => {
    s.brands = s.brands.filter(b => b.id !== id);
  }));
  
  try {
    // 3. Server call
    await api.brands.delete(id);
  } catch (e) {
    // 4. Rollback on error
    setState(produce(s => {
      s.brands = previousBrands;
      s.error = `Failed to delete: ${(e as Error).message}`;
    }));
  }
}
```

---

## 7. Route Design

### 7.1 Route Structure

| Route | Page | Auth | Tier Restriction |
|-------|------|------|-----------------|
| `/` | Landing page | No | — |
| `/login` | Login page | No | — |
| `/register` | Registration | No | — |
| `/pricing` | Pricing page | No | — |
| `/dashboard` | Dashboard home | Yes | — |
| `/dashboard/brands` | Brand list | Yes | — |
| `/dashboard/brands/new` | Create brand | Yes | free only (1 brand max) |
| `/dashboard/brands/[id]` | Brand detail/edit | Yes | owner only |
| `/dashboard/templates` | Template library | Yes | — |
| `/dashboard/templates/[id]` | Template editor | Yes | — |
| `/dashboard/products` | Product list | Yes | — |
| `/dashboard/products/new` | Create product | Yes | — |
| `/dashboard/products/[id]` | Product detail/generate | Yes | — |
| `/dashboard/products/batch` | Batch generation wizard | Yes | starter+ |
| `/dashboard/mockups` | Mockup gallery | Yes | — |
| `/dashboard/mockups/[id]` | Mockup detail | Yes | — |
| `/dashboard/integrations` | Integration hub | Yes | — |
| `/dashboard/integrations/printful` | Printful connect | Yes | — |
| `/dashboard/integrations/printify` | Printify connect | Yes | — |
| `/dashboard/integrations/shopify` | Shopify connect | Yes | — |
| `/dashboard/settings` | Account settings | Yes | — |
| `/dashboard/settings/billing` | Billing & subscription | Yes | — |
| `/dashboard/settings/team` | Team management | Yes | agency+ |
| `/dashboard/settings/api` | API keys (public API) | Yes | pro+ |
| `/dashboard/analytics` | Analytics dashboard | Yes | pro+ |
| `/share/[token]` | Shared brand kit | No (public) | — |
| `/api/*` | API routes | Varies | — |

### 7.2 Route Guards (Middleware)

```typescript
// Route guard logic implemented in Vinxi route loaders

// Example: Loader for /dashboard/brands
export function routeLoader() {
  // Check auth
  const session = getSession();
  if (!session) throw redirect('/login');
  
  // Check tier limits for creation routes
  if (isCreateRoute() && !canCreateBrand(session.user.tier)) {
    throw redirect('/dashboard/settings/billing?upgrade=brand_limit');
  }
  
  return { user: session.user };
}

// Example: Loader for /share/[token]
export function shareLoader({ params }) {
  // Public share — no auth required
  const brand = await api.brands.getByShareToken(params.token);
  if (!brand) throw notFound();
  return { brand };
}
```

### 7.3 Navigation Structure

```typescript
// Dashboard sidebar navigation — adapts based on tier
const navItems = {
  main: [
    { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Brands', href: '/dashboard/brands', icon: 'Palette' },
    { label: 'Templates', href: '/dashboard/templates', icon: 'FileImage' },
    { label: 'Products', href: '/dashboard/products', icon: 'Shirt' },
    { label: 'Mockups', href: '/dashboard/mockups', icon: 'Image' },
  ],
  integrations: [
    { label: 'Integrations', href: '/dashboard/integrations', icon: 'Link' },
  ],
  analytics: { label: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart3', minTier: 'pro' },
  settings: [
    { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
    { label: 'Billing', href: '/dashboard/settings/billing', icon: 'CreditCard' },
    { label: 'Team', href: '/dashboard/settings/team', icon: 'Users', minTier: 'agency' },
    { label: 'API Keys', href: '/dashboard/settings/api', icon: 'Key', minTier: 'pro' },
  ],
};
```

---

## 8. POD API Integrations

### 8.1 Integration Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    POD Integration Layer                   │
│                                                          │
│  ┌───────────────────┐    ┌─────────────────────────┐    │
│  │   PODService       │    │   IntegrationManager    │    │
│  │   (abstraction)    │    │   (auth, sync, push)    │    │
│  └────────┬──────────┘    └─────────────┬───────────┘    │
│           │                             │                │
│  ┌────────┴─────────────────────────────┴───────────┐   │
│  │             POD Adapter Interface                  │   │
│  │  { connect, disconnect, sync, push, getProducts } │   │
│  └────────┬─────────────────────────────────┬───────┘   │
│           │                                 │           │
│  ┌────────┴────────┐            ┌───────────┴───────┐   │
│  │  PrintfulAdapter │            │   PrintifyAdapter  │   │
│  └─────────────────┘            └───────────────────┘   │
│                                                          │
│  ┌────────┴────────┐            ┌───────────┴───────┐   │
│  │   ShopifyAdapter │            │    GelatoAdapter   │   │
│  └─────────────────┘            └───────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 8.2 POD Adapter Interface

```typescript
// === lib/pod/types.ts ===

interface PODProduct {
  id: string;
  name: string;
  description: string;
  type: string;            // "tshirt", "hoodie", "mug", etc.
  variants: PODVariant[];
  images: PODImage[];
}

interface PODVariant {
  id: string;
  name: string;
  color: string;
  size: string;
  price: number;
  currency: string;
  isAvailable: boolean;
}

interface PODImage {
  id: string;
  url: string;
  variantIds: string[];
  position: 'front' | 'back' | 'left' | 'right';
}

interface PODPushPayload {
  productId: string;           // Cockbrothers product ID
  externalProductId: string;   // POD platform product ID
  variantMapping: {
    externalVariantId: string;
    mockupUrl: string;         // Generated mockup to push
    position: string;
  }[];
  title: string;
  description: string;
  tags: string[];
  publish: boolean;            // Push as published or draft
}

interface PODPushResult {
  success: boolean;
  externalProductId: string;
  externalUrl: string;
  errors?: { variantId: string; message: string }[];
}

interface PODAdapter {
  platform: string;
  
  // Connection
  connect(credentials: PODCredentials): Promise<PODConnection>;
  disconnect(): Promise<void>;
  getConnectionStatus(): Promise<PODConnectionStatus>;
  
  // Catalog
  getProducts(options?: PODCatalogOptions): Promise<PODProduct[]>;
  getProduct(productId: string): Promise<PODProduct>;
  getCategories(): Promise<PODCategory[]>;
  
  // Push designs
  pushDesign(payload: PODPushPayload): Promise<PODPushResult>;
  updateDesign(productId: string, payload: Partial<PODPushPayload>): Promise<PODPushResult>;
  deleteDesign(productId: string): Promise<void>;
  
  // Webhooks
  registerWebhook(url: string, events: string[]): Promise<void>;
  handleWebhook(payload: unknown): Promise<void>;
}
```

### 8.3 Printful API Integration

```typescript
// === lib/pod/printful.ts ===

// OAuth flow
// 1. User clicks "Connect Printful" → redirect to Printful OAuth
// 2. Printful returns auth code → our backend exchanges for access token
// 3. Store encrypted token in integrations table
// 4. Use token for API calls

const PRINTFUL_API_BASE = 'https://api.printful.com';

class PrintfulAdapter implements PODAdapter {
  platform = 'printful';
  private apiKey: string;   // Printful uses API key (x store-based)
  private storeId: string;
  
  async connect(credentials: { apiKey: string; storeId: string }): Promise<PODConnection> {
    this.apiKey = credentials.apiKey;
    this.storeId = credentials.storeId;
    
    // Verify connection
    const store = await this.get('/store');
    return {
      platform: 'printful',
      connected: true,
      storeName: store.name,
      storeId: this.storeId,
    };
  }
  
  async getProducts(options?: { limit?: number; offset?: number }): Promise<PODProduct[]> {
    // Printful: GET /store/products
    const response = await this.get('/store/products', {
      limit: options?.limit ?? 100,
      offset: options?.offset ?? 0,
    });
    
    return response.result.map(mapPrintfulProduct);
  }
  
  async pushDesign(payload: PODPushPayload): Promise<PODPushResult> {
    // Printful: POST /orders (create mockup generation task)
    // Or: POST /products/{id}/variants/{variant_id} (for existing products)
    
    // Step 1: Get product template data
    const templateId = await this.getProductTemplate(payload.externalProductId);
    
    // Step 2: Push design for each variant
    const results = await Promise.allSettled(
      payload.variantMapping.map(variant => 
        this.post(`/products/${templateId}/variants/${variant.externalVariantId}`, {
          mockup_style: 'simple',   // Printful specific
          print_area: variant.position,
          ...
        })
      )
    );
    
    return {
      success: results.every(r => r.status === 'fulfilled'),
      externalProductId: payload.externalProductId,
      externalUrl: `https://www.printful.com/...`,
    };
  }
  
  // Printful specific: Mockup generation
  async generateMockup(productId: string, productData: {
    templateId: string;
    variantIds: string[];
    designUrl: string;
    branding: { logoUrl?: string; patternUrl?: string };
  }) {
    // Printful: POST /mockup-generator/create-task/{product_id}
    return this.post(`/mockup-generator/create-task/${productId}`, {
      product_id: productData.templateId,
      variant_ids: productData.variantIds,
      format: 'png',
      files: [{
        placement: 'front',
        image_url: productData.designUrl,
      }],
    });
  }
  
  private async get(endpoint: string, params?: Record<string, unknown>) {
    const res = await fetch(`${PRINTFUL_API_BASE}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'X-PF-Store-Id': this.storeId,
      },
    });
    return res.json();
  }
  
  private async post(endpoint: string, body: unknown) {
    const res = await fetch(`${PRINTFUL_API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res.json();
  }
}
```

### 8.4 Printify API Integration

```typescript
// === lib/pod/printify.ts ===

// OAuth flow: Printify uses OAuth 2.0
// 1. User clicks "Connect Printify" → redirect to Printify OAuth
// 2. Printify returns auth code → exchange for access + refresh token
// 3. Store tokens encrypted in integrations table
// 4. Refresh token automatically when expired

const PRINTIFY_API_BASE = 'https://api.printify.com/v1';

class PrintifyAdapter implements PODAdapter {
  platform = 'printify';
  private accessToken: string;
  private shopId: string;
  
  async connect(credentials: { accessToken: string; shopId: string }): Promise<PODConnection> {
    this.accessToken = credentials.accessToken;
    this.shopId = credentials.shopId;
    
    // Verify connection
    const shop = await this.get(`/shops/${this.shopId}.json`);
    return {
      platform: 'printify',
      connected: true,
      storeName: shop.title,
      storeId: this.shopId,
    };
  }
  
  async getProducts(options?: { limit?: number; page?: number }): Promise<PODProduct[]> {
    const response = await this.get(`/shops/${this.shopId}/products.json`, {
      limit: options?.limit ?? 100,
      page: options?.page ?? 1,
    });
    
    return response.data.map(mapPrintifyProduct);
  }
  
  async pushDesign(payload: PODPushPayload): Promise<PODPushResult> {
    // Printify: POST /shops/{shop_id}/products.json
    // Creates a new product on Printify
    
    const body = {
      title: payload.title,
      description: payload.description,
      tags: payload.tags,
      blueprint_id: payload.externalProductId,
      print_areas: payload.variantMapping.map(variant => ({
        variant_ids: [variant.externalVariantId],
        placeholders: [{
          position: variant.position,
          images: [{ src: variant.mockupUrl }],
        }],
      })),
      is_published: payload.publish ?? true,
    };
    
    const product = await this.post(`/shops/${this.shopId}/products.json`, body);
    
    return {
      success: true,
      externalProductId: product.id,
      externalUrl: `https://printify.com/...`,
    };
  }
  
  // Printify specific: Blueprint catalog
  async getBlueprints(category?: string): Promise<Blueprint[]> {
    const blueprints = await this.get('/blueprints.json');
    if (category) {
      return blueprints.filter(b => b.category === category);
    }
    return blueprints;
  }
  
  // Printify specific: Get print providers for a blueprint
  async getPrintProviders(blueprintId: string): Promise<PrintProvider[]> {
    return this.get(`/blueprints/${blueprintId}/print_providers.json`);
  }
  
  // Printify specific: Get variants for a blueprint + print provider
  async getBlueprintVariants(blueprintId: string, printProviderId: string): Promise<Variant[]> {
    return this.get(
      `/blueprints/${blueprintId}/print_providers/${printProviderId}/variants.json`
    );
  }
  
  // Printify specific: Create a new product from scratch
  async createProduct(blueprintId: string, printProviderId: string, config: {
    title: string;
    description: string;
    variants: { id: number; price: number }[];
    printAreas: { variantIds: number[]; placement: string; imageUrl: string }[];
  }) {
    return this.post(`/shops/${this.shopId}/products.json`, {
      title: config.title,
      description: config.description,
      blueprint_id: blueprintId,
      print_provider_id: printProviderId,
      variants: config.variants,
      print_areas: config.printAreas.map(pa => ({
        variant_ids: pa.variantIds,
        placeholders: [{ position: pa.placement, images: [{ src: pa.imageUrl }] }],
      })),
    });
  }
  
  // Printify specific: Update existing product design
  async updateProductDesign(productId: string, config: {
    printAreas: { variantIds: number[]; placement: string; imageUrl: string }[];
  }) {
    return this.put(`/shops/${this.shopId}/products/${productId}.json`, {
      print_areas: config.printAreas.map(pa => ({
        variant_ids: pa.variantIds,
        placeholders: [{ position: pa.placement, images: [{ src: pa.imageUrl }] }],
      })),
    });
  }
  
  // Printify specific: Publish product
  async publishProduct(productId: string, publishConfig: {
    title?: boolean;
    description?: boolean;
    images?: boolean;
    variants?: boolean;
  }) {
    return this.post(`/shops/${this.shopId}/products/${productId}/publish.json`, {
      title: publishConfig.title ?? true,
      description: publishConfig.description ?? true,
      images: publishConfig.images ?? true,
      variants: publishConfig.variants ?? true,
    });
  }
  
  private async get(endpoint: string, params?: Record<string, unknown>) {
    const url = new URL(`${PRINTIFY_API_BASE}${endpoint}`);
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
    
    const res = await fetch(url.toString(), {
      headers: { 'Authorization': `Bearer ${this.accessToken}` },
    });
    return res.json();
  }
  
  private async post(endpoint: string, body: unknown) {
    const res = await fetch(`${PRINTIFY_API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res.json();
  }
  
  private async put(endpoint: string, body: unknown) {
    const res = await fetch(`${PRINTIFY_API_BASE}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res.json();
  }
}
```

### 8.5 Shopify Integration

```typescript
// === lib/pod/shopify.ts ===

// Shopify uses OAuth 2.0 with online/offline access tokens
// Flow:
// 1. User installs Shopify app → OAuth redirect
// 2. We receive shop + code → exchange for access token
// 3. Store token + shop domain → use Admin REST/GraphQL API
// 4. Handle webhooks (app/uninstalled, orders/create)

class ShopifyAdapter {
  private shopDomain: string;
  private accessToken: string;
  private apiVersion = '2024-10';
  
  async connect(credentials: { shopDomain: string; accessToken: string }) {
    this.shopDomain = credentials.shopDomain;
    this.accessToken = credentials.accessToken;
    
    // Verify
    const shop = await this.graphql(`{ shop { name email } }`);
    return {
      platform: 'shopify',
      connected: true,
      storeName: shop.data.shop.name,
      storeId: this.shopDomain,
    };
  }
  
  // Create a product draft with brand kit mockups
  async createProductDraft(data: {
    title: string;
    description: string;
    images: { src: string; position: number }[];
    variants: { price: string; optionValues: { name: string; value: string }[] }[];
  }) {
    return this.rest(`/products.json`, 'POST', { product: data });
  }
  
  // Upload image to a product
  async uploadProductImage(productId: number, imageUrl: string) {
    return this.rest(`/products/${productId}/images.json`, 'POST', {
      image: { src: imageUrl },
    });
  }
  
  private async rest(endpoint: string, method: string, body?: unknown) {
    const res = await fetch(
      `https://${this.shopDomain}/admin/api/${this.apiVersion}${endpoint}`,
      {
        method,
        headers: {
          'X-Shopify-Access-Token': this.accessToken,
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      }
    );
    return res.json();
  }
  
  private async graphql(query: string, variables?: Record<string, unknown>) {
    const res = await fetch(
      `https://${this.shopDomain}/admin/api/${this.apiVersion}/graphql.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': this.accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      }
    );
    return res.json();
  }
}
```

### 8.6 Mockup Generation Pipeline

```typescript
// === lib/pod/mockupRenderer.ts ===

// Core mockup generation — runs server-side via Inngest queue

interface MockupJob {
  productId: string;
  brandId: string;
  templateId: string;
  variantName: string;
  brand: Brand;
  template: Template;
}

// Generation pipeline:
// 1. Load template SVG/canvas definition
// 2. Load brand assets (logo, colors, fonts)
// 3. Composite: apply brand elements onto template
// 4. Overlay on mockup background (product photo)
// 5. Render to PNG via Sharp
// 6. Upload to Supabase Storage
// 7. Update database record

async function generateMockup(job: MockupJob): Promise<MockupResult> {
  const startTime = Date.now();
  
  // 1. Load template
  const template = await getTemplateData(job.templateId);
  
  // 2. Create SVG composition
  const svg = buildSvgComposition({
    template: template.data,
    brand: job.brand,
    variant: job.variantName,
  });
  
  // 3. Convert SVG to PNG via @resvg/resvg-js
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  });
  const pngBuffer = resvg.render().asPng();
  
  // 4. Overlay on mockup background (for realistic look)
  const mockupBg = await loadMockupBackground(job.templateId, job.variantName);
  const composited = await compositeWithBackground(pngBuffer, mockupBg);
  
  // 5. Optimize with Sharp
  const optimized = await sharp(composited)
    .png({ quality: 90 })
    .toBuffer();
  
  // 6. Upload to storage
  const filePath = `mockups/${job.userId}/${job.productId}/${job.variantName}.png`;
  const { data: upload } = await supabase.storage
    .from('mockups')
    .upload(filePath, optimized, {
      contentType: 'image/png',
      upsert: true,
    });
  
  // 7. Return result
  return {
    productId: job.productId,
    variantName: job.variantName,
    imageUrl: supabase.storage.from('mockups').getPublicUrl(filePath).data.publicUrl,
    generationTimeMs: Date.now() - startTime,
  };
}

// Batch mockup generation via Inngest
export const batchMockupGeneration = inngest.createFunction(
  { id: 'mockup-batch-generation' },
  { event: 'mockups/generate-batch' },
  async ({ event, step }) => {
    const { productIds, brandId } = event.data;
    
    const results = await step.run('generate-mockups', async () => {
      const all = productIds.flatMap(productId => 
        // Get all variants for product, generate per variant
        getProductVariants(productId).map(variant => 
          generateMockup({ productId, brandId, templateId: variant.templateId, variantName: variant.name })
        )
      );
      return Promise.all(all);
    });
    
    return { generated: results.length, urls: results.map(r => r.imageUrl) };
  }
);
```

---

## 9. Key Architectural Decisions Summary

### Decision 1: Solid.js + Vinxi over Next.js
**Prečo:** Fine-grained reactivity je ideálny pre real-time preview rendering (brand → template → mockup). Vinxi poskytuje SSR, file-based routing a API routes v jednom frameworku bez preplácania za funkcie, ktoré nepotrebujeme (ako Next.js App Router komplexita).

### Decision 2: PostgreSQL + Drizzle over MongoDB or Prisma
**Prečo:** Brand kit data je vysoko relačná (brand → products → mockups → integrations → users). JSONB stĺpce poskytujú flexibilitu pre variantné dáta (template layers, product configs). Drizzle je TypeScript-first a ľahší ako Prisma, čo sedí k filozofii stacku.

### Decision 3: Supabase for auth, DB, and storage
**Prečo:** Jeden provider pokryje 3 kritické potreby s row-level security, ktorá je perfektná pre multi-tenant brand data. Redukujeme počet externých služieb v MVP fáze.

### Decision 4: POD Adapter Pattern (Strategy pattern)
**Prečo:** Každá POD platforma má iné API (Printful = API keys + store-based, Printify = OAuth + shop-based, Shopify = OAuth + store-based). Adapter pattern umožňuje pridať novú platformu implementáciou jednotného `PODAdapter` interfacu bez zmeny business logiky.

### Decision 5: Server-side mockup rendering over client-side Canvas
**Prečo:** Kvalitné mockupy vyžadujú Sharp/@resvg server-side rendering pre konzistentné výstupy. Canvas na klientovi je fajn pre live preview, ale produkčné mockupy idú cez Inngest queue s retry a monitoringom.

### Decision 6: Inngest for async job queue
**Prečo:** Batch mockup generácia, POD push, AI brand generácia — všetko async operácie, ktoré môžu trvať sekundy až minúty. Inngest poskytuje reliable queue, retry, monitoring bez potreby Redis alebo RabbitMQ.

### Decision 7: Optimistic updates everywhere
**Prečo:** Pre UX kľúčové — používateľ vidí okamžitú odozvu (brand created, product added) ešte pred potvrdením servera. Solid.js store umožňuje jednoduchý rollback pattern v prípade chyby.

### Decision 8: Column-level encryption for integration tokens
**Prečo:** POD API kľúče a OAuth tokeny sú citlivé dáta. Šifrujeme na aplikačnej vrstve pred uložením do databázy pomocou Supabase Vault alebo pgcrypto.

### Decision 9: Multi-tenant data isolation via RLS
**Prečo:** Každý užívateľ vidí len svoje brandy, produkty, mockupy a integrácie. Row-Level Security v PostgreSQL to vynucuje na databázovej vrstve — bezpečnostná poistka aj keby API route mal bug.

### Decision 10: Brand consistency score as gamification + moat
**Prečo:** Je to unikátny dataset (nikto iný nemá "čo robí brand konzistentným v POD"), dá sa monetizovať (higher score = higher perceived value) a je to signál pre upgrade (free tier má limited score analysis).

---

## 10. Performance Considerations

| Area | Strategy |
|------|----------|
| **Image delivery** | Supabase CDN + Vercel Edge for mockup assets, WebP format auto-conversion |
| **Mockup caching** | LRU cache na serveri pre často generované mockupy (brand + template hash = cache key) |
| **AI API costs** | Cache AI brand generácie na 24h, podobné prompty vracajú cached výsledok |
| **Database queries** | Drizzle prepared statements, materialized views pre analytics, connection pooling via Supabase |
| **Bundle size** | Solid.js (∼7KB gzipped) + code splitting per route, lazy load heavy components (canvas editor, AI modals) |
| **SSR vs CSR** | Landing page, login, pricing → SSR pre SEO. Dashboard → CSR/SPA pre rýchlu interakciu. Mixed mode podľa potreby. |
| **Rate limiting** | API routes: 100 req/min pre free, 500/min pre paid, tier-based. Inngest handles backpressure. |

---

*Vygenerované: Agent 3 — Tech Lead | Cockbrothers Project | 7. máj 2026*
