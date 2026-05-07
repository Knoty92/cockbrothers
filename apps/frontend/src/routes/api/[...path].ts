// Catch-all API route — returns mock data for all endpoints
// This makes the frontend demo fully functional without a database

const BASE_URL = '/api';
const headers = { 'Content-Type': 'application/json' };

// --- In-memory storage for mutations ---
const db = {
  brands: [
    { id: '1', name: 'Beach Club', primaryColor: '#0ea5e9', secondaryColor: '#06b6d4', logoUrl: null, voice: 'Playful, summer vibes', createdAt: '2026-04-01T10:00:00Z', updatedAt: '2026-05-06T14:00:00Z', consistencyScore: 85, productCount: 4 },
    { id: '2', name: 'Urban Outfitters', primaryColor: '#18181b', secondaryColor: '#f97316', logoUrl: null, voice: 'Bold, streetwear', createdAt: '2026-04-05T10:00:00Z', updatedAt: '2026-05-05T12:00:00Z', consistencyScore: 72, productCount: 3 },
    { id: '3', name: 'Minimalist Co.', primaryColor: '#64748b', secondaryColor: '#f8fafc', logoUrl: null, voice: 'Clean, minimal', createdAt: '2026-04-10T10:00:00Z', updatedAt: '2026-05-01T09:00:00Z', consistencyScore: 94, productCount: 5 },
  ],
  brandIdCounter: 4,
  templates: [
    { id: '1', name: 'Standard T-Shirt', category: 'apparel', isSystem: true, thumbnail: null, createdAt: '2026-03-01T00:00:00Z', updatedAt: '2026-03-01T00:00:00Z' },
    { id: '2', name: 'Classic Hoodie', category: 'apparel', isSystem: true, thumbnail: null, createdAt: '2026-03-01T00:00:00Z', updatedAt: '2026-03-01T00:00:00Z' },
    { id: '3', name: 'Tote Bag', category: 'accessories', isSystem: true, thumbnail: null, createdAt: '2026-03-01T00:00:00Z', updatedAt: '2026-03-01T00:00:00Z' },
    { id: '4', name: 'Cap', category: 'headwear', isSystem: true, thumbnail: null, createdAt: '2026-03-01T00:00:00Z', updatedAt: '2026-03-01T00:00:00Z' },
  ],
  templateIdCounter: 5,
  products: [
    { id: '1', name: 'Summer Vibes T-Shirt', brandId: '1', templateId: '1', status: 'completed', variants: [], thumbnail: null, createdAt: '2026-05-01T08:00:00Z', updatedAt: '2026-05-06T14:00:00Z' },
    { id: '2', name: 'Beach Club Hoodie', brandId: '1', templateId: '2', status: 'completed', variants: [], thumbnail: null, createdAt: '2026-05-02T08:00:00Z', updatedAt: '2026-05-05T12:00:00Z' },
    { id: '3', name: 'Street Cap Black', brandId: '2', templateId: '4', status: 'draft', variants: [], thumbnail: null, createdAt: '2026-05-03T08:00:00Z', updatedAt: '2026-05-03T08:00:00Z' },
    { id: '4', name: 'Urban Tote', brandId: '2', templateId: '3', status: 'completed', variants: [], thumbnail: null, createdAt: '2026-05-04T08:00:00Z', updatedAt: '2026-05-06T10:00:00Z' },
    { id: '5', name: 'Clean T-Shirt White', brandId: '3', templateId: '1', status: 'draft', variants: [], thumbnail: null, createdAt: '2026-05-05T08:00:00Z', updatedAt: '2026-05-05T08:00:00Z' },
  ],
  productIdCounter: 6,
  mockups: [],
  mockupIdCounter: 1,
  user: { id: '1', name: 'Matúš', email: 'matej@cockbrothers.app', avatarUrl: null, tier: 'free' },
};

function ok(data: unknown) {
  return new Response(JSON.stringify({ data, error: null }), { status: 200, headers });
}
function created(data: unknown) {
  return new Response(JSON.stringify({ data, error: null }), { status: 201, headers });
}
function notFound(msg = 'Not found') {
  return new Response(JSON.stringify({ data: null, error: { code: 'NOT_FOUND', message: msg } }), { status: 404, headers });
}
function badRequest(msg: string) {
  return new Response(JSON.stringify({ data: null, error: { code: 'BAD_REQUEST', message: msg } }), { status: 400, headers });
}

function getId(path: string, prefix: string): string | null {
  const re = new RegExp(`^${prefix}/([^/]+)`);
  const m = path.match(re);
  return m ? m[1] : null;
}

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const path = url.pathname.replace(BASE_URL, '').replace(/\/$/, '');
  const params = Object.fromEntries(url.searchParams);

  // GET /api/brands
  if (path === '/brands') {
    return ok(db.brands);
  }

  // GET /api/brands/:id
  const brandId = getId(path, '/brands');
  if (brandId) {
    const brand = db.brands.find(b => b.id === brandId);
    return brand ? ok(brand) : notFound('Brand not found');
  }

  // GET /api/templates
  if (path === '/templates' || path === '/templates/public') {
    return ok(db.templates);
  }

  // GET /api/templates/products
  if (path === '/templates/products') {
    return ok(db.templates);
  }

  // GET /api/templates/:id
  const templateId = getId(path, '/templates');
  if (templateId) {
    const template = db.templates.find(t => t.id === templateId);
    return template ? ok(template) : notFound('Template not found');
  }

  // GET /api/products
  if (path === '/products') {
    let list = db.products;
    if (params.brandId) list = list.filter(p => p.brandId === params.brandId);
    if (params.status) list = list.filter(p => p.status === params.status);
    return ok(list);
  }

  // GET /api/products/:id
  const productId = getId(path, '/products');
  if (productId) {
    const product = db.products.find(p => p.id === productId);
    return product ? ok(product) : notFound('Product not found');
  }

  // GET /api/mockups
  if (path === '/mockups') {
    let list = db.mockups;
    if (params.productId) list = list.filter(m => m.productId === params.productId);
    return ok(list);
  }

  // GET /api/mockups/:id
  const mockupId = getId(path, '/mockups');
  if (mockupId) {
    const mockup = db.mockups.find(m => m.id === mockupId);
    return mockup ? ok(mockup) : notFound('Mockup not found');
  }

  // GET /api/integrations
  if (path === '/integrations') {
    return ok([
      { platform: 'printful', connected: false, storeName: null },
      { platform: 'printify', connected: false, storeName: null },
    ]);
  }

  // GET /api/integrations/:platform/status
  const intMatch = path.match(/^\/integrations\/(\w+)\/status$/);
  if (intMatch) {
    return ok({ connected: false, storeName: null, error: null });
  }

  // GET /api/integrations/:platform/products
  const intProducts = path.match(/^\/integrations\/(\w+)\/products$/);
  if (intProducts) {
    return ok([]);
  }

  // GET /api/payments/current-plan
  if (path === '/payments/current-plan') {
    return ok({ tier: 'free', status: 'active', currentPeriodEnd: '2026-06-01T00:00:00Z' });
  }

  // GET /api/payments/tiers
  if (path === '/payments/tiers') {
    return ok([
      { id: 'free', name: 'Free', price: 0, features: ['1 Brand', '5 Mockups', 'Basic templates'], popular: false },
      { id: 'pro', name: 'Pro', price: 19, features: ['10 Brands', '100 Mockups', 'All templates', 'Priority support'], popular: true },
      { id: 'enterprise', name: 'Enterprise', price: 49, features: ['Unlimited brands', 'Unlimited mockups', 'Custom integrations', 'Dedicated support'], popular: false },
    ]);
  }

  // GET /api/auth/session
  if (path === '/auth/session') {
    return ok(db.user);
  }

  return ok({ status: 'ok', message: 'Cockbrothers API v1' });
}

export async function POST({ request }: { request: Request }) {
  const url = new URL(request.url);
  const path = url.pathname.replace(BASE_URL, '').replace(/\/$/, '');
  let body: any = {};
  try {
    body = await request.json();
  } catch {}

  // POST /api/brands
  if (path === '/brands') {
    if (!body.name) return badRequest('Brand name is required');
    const now = new Date().toISOString();
    const brand = {
      id: String(db.brandIdCounter++),
      name: body.name,
      primaryColor: body.primaryColor || '#6366f1',
      secondaryColor: body.secondaryColor || '#8b5cf6',
      logoUrl: null,
      voice: body.voice || '',
      createdAt: now,
      updatedAt: now,
      consistencyScore: 50,
      productCount: 0,
    };
    db.brands.push(brand);
    return created(brand);
  }

  // POST /api/templates
  if (path === '/templates') {
    if (!body.name) return badRequest('Template name is required');
    const now = new Date().toISOString();
    const template = {
      id: String(db.templateIdCounter++),
      name: body.name,
      category: body.category || 'other',
      isSystem: false,
      thumbnail: null,
      createdAt: now,
      updatedAt: now,
    };
    db.templates.push(template);
    return created(template);
  }

  // POST /api/products
  if (path === '/products') {
    if (!body.name) return badRequest('Product name is required');
    const now = new Date().toISOString();
    const product = {
      id: String(db.productIdCounter++),
      name: body.name,
      brandId: body.brandId || '1',
      templateId: body.templateId || '1',
      status: 'draft',
      variants: [],
      thumbnail: null,
      createdAt: now,
      updatedAt: now,
    };
    db.products.push(product);
    return created(product);
  }

  // POST /api/mockups
  if (path === '/mockups') {
    const now = new Date().toISOString();
    const mockup = {
      id: String(db.mockupIdCounter++),
      productId: body.productId || '1',
      url: `https://placehold.co/600x600/6366f1/ffffff?text=Mockup+${db.mockupIdCounter}`,
      status: 'completed',
      createdAt: now,
      updatedAt: now,
    };
    db.mockups.push(mockup);
    return created(mockup);
  }

  // POST /api/products/:id/generate
  const productGen = path.match(/^\/products\/(\w+)\/generate$/);
  if (productGen) {
    const now = new Date().toISOString();
    const job = { id: String(db.mockupIdCounter++), productId: productGen[1], status: 'completed', createdAt: now };
    const mockup = {
      id: String(db.mockupIdCounter++),
      productId: productGen[1],
      url: `https://placehold.co/600x600/6366f1/ffffff?text=Mockup`,
      status: 'completed',
      createdAt: now,
      updatedAt: now,
    };
    db.mockups.push(mockup);
    return ok({ jobs: [job] });
  }

  // POST /api/products/batch
  if (path === '/products/batch') {
    return ok(db.products.slice(0, 2));
  }

  // POST /api/products/batch/generate
  if (path === '/products/batch/generate') {
    return ok({ jobs: [] });
  }

  // POST /api/products/:id/variants
  if (path.match(/^\/products\/\w+\/variants$/)) {
    return ok({ success: true });
  }

  // POST /api/auth/register
  if (path === '/auth/register') {
    if (!body.email) return badRequest('Email is required');
    db.user = { ...db.user, name: body.name || body.email.split('@')[0], email: body.email };
    return created({ id: db.user.id, name: db.user.name, email: db.user.email, token: 'mock-token-123' });
  }

  // POST /api/auth/login
  if (path === '/auth/login') {
    if (!body.email || !body.password) return badRequest('Email and password required');
    return ok({ id: db.user.id, name: db.user.name, email: body.email, token: 'mock-token-123' });
  }

  // POST /api/payments/subscribe
  if (path === '/payments/subscribe') {
    return ok({ sessionId: 'cs_test_123', url: 'https://checkout.stripe.com/mock' });
  }

  // POST /api/payments/cancel
  if (path === '/payments/cancel') {
    return ok({ success: true });
  }

  // POST /api/payments/portal
  if (path === '/payments/portal') {
    return ok({ url: 'https://billing.stripe.com/mock' });
  }

  // POST /api/brands/:id/export
  const brandExport = path.match(/^\/brands\/(\w+)\/export$/);
  if (brandExport) {
    return ok({ url: '#', format: 'json' });
  }

  return notFound(`POST ${path} not found`);
}

export async function PATCH({ request }: { request: Request }) {
  const url = new URL(request.url);
  const path = url.pathname.replace(BASE_URL, '').replace(/\/$/, '');
  let body: any = {};
  try { body = await request.json(); } catch {}

  // PATCH /api/brands/:id
  const brandId = getId(path, '/brands');
  if (brandId) {
    const idx = db.brands.findIndex(b => b.id === brandId);
    if (idx === -1) return notFound('Brand not found');
    db.brands[idx] = { ...db.brands[idx], ...body, updatedAt: new Date().toISOString() };
    return ok(db.brands[idx]);
  }

  // PATCH /api/templates/:id
  const templateId = getId(path, '/templates');
  if (templateId) {
    const idx = db.templates.findIndex(t => t.id === templateId);
    if (idx === -1) return notFound('Template not found');
    db.templates[idx] = { ...db.templates[idx], ...body, updatedAt: new Date().toISOString() };
    return ok(db.templates[idx]);
  }

  // PATCH /api/products/:id
  const productId = getId(path, '/products');
  if (productId) {
    const idx = db.products.findIndex(p => p.id === productId);
    if (idx === -1) return notFound('Product not found');
    db.products[idx] = { ...db.products[idx], ...body, updatedAt: new Date().toISOString() };
    return ok(db.products[idx]);
  }

  return notFound(`PATCH ${path} not found`);
}

export async function DELETE({ request }: { request: Request }) {
  const url = new URL(request.url);
  const path = url.pathname.replace(BASE_URL, '').replace(/\/$/, '');

  // DELETE /api/brands/:id
  const brandId = getId(path, '/brands');
  if (brandId) {
    const idx = db.brands.findIndex(b => b.id === brandId);
    if (idx === -1) return notFound('Brand not found');
    db.brands.splice(idx, 1);
    return ok({ success: true });
  }

  // DELETE /api/templates/:id
  const templateId = getId(path, '/templates');
  if (templateId) {
    const idx = db.templates.findIndex(t => t.id === templateId);
    if (idx === -1) return notFound('Template not found');
    db.templates.splice(idx, 1);
    return ok({ success: true });
  }

  // DELETE /api/products/:id
  const productId = getId(path, '/products');
  if (productId) {
    const idx = db.products.findIndex(p => p.id === productId);
    if (idx === -1) return notFound('Product not found');
    db.products.splice(idx, 1);
    return ok({ success: true });
  }

  // DELETE /api/mockups/:id
  const mockupId = getId(path, '/mockups');
  if (mockupId) {
    const idx = db.mockups.findIndex(m => m.id === mockupId);
    if (idx === -1) return notFound('Mockup not found');
    db.mockups.splice(idx, 1);
    return ok({ success: true });
  }

  // DELETE /api/integrations/:platform
  const intMatch = path.match(/^\/integrations\/(\w+)$/);
  if (intMatch) {
    return ok({ success: true, platform: intMatch[1] });
  }

  return notFound(`DELETE ${path} not found`);
}
