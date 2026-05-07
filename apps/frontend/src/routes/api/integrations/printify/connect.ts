/**
 * Printify OAuth connect — POST /api/integrations/printify/connect
 *
 * Printify uses OAuth 2.0 with access + refresh tokens.
 *
 * Flow:
 * 1. POST  → returns Printify OAuth authorization URL
 * 2. User authorizes → Printify redirects to our callback
 * 3. GET (callback) → exchange code for tokens → store in DB
 */

import { json } from '@solidjs/start/server';
import type { APIEvent } from '@solidjs/start/server';

const PRINTIFY_AUTH_URL = 'https://oauth.printify.com/oauth/authorize';
const PRINTIFY_TOKEN_URL = 'https://oauth.printify.com/oauth/token';

export async function POST(event: APIEvent) {
  try {
    const url = new URL(event.request.url);
    const redirect = url.searchParams.get('redirect') ?? '/dashboard/integrations';

    const clientId = process.env.PRINTIFY_CLIENT_ID ?? '';
    const state = crypto.randomUUID();

    const authUrl = new URL(PRINTIFY_AUTH_URL);
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', `${url.origin}/api/integrations/printify/callback`);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('scope', 'products:write shops:read');

    // Store state in session for CSRF verification
    // In production: await kv.set(`oauth_state:${state}`, { redirect }, { ex: 300 });

    return json({
      data: { authUrl: authUrl.toString() },
    });
  } catch (err) {
    return json(
      { error: { code: 'CONNECT_FAILED', message: (err as Error).message } },
      { status: 500 },
    );
  }
}

/**
 * GET — OAuth callback handler.
 * Called by Printify after user grants access.
 */
export async function GET(event: APIEvent) {
  const url = new URL(event.request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  if (error) {
    return json(
      { error: { code: 'OAUTH_ERROR', message: `Printify denied: ${error}` } },
      { status: 400 },
    );
  }

  if (!code || !state) {
    return json(
      { error: { code: 'INVALID_PARAMS', message: 'Missing code or state' } },
      { status: 400 },
    );
  }

  // Verify state against session
  // In production: const stored = await kv.get(`oauth_state:${state}`);

  try {
    // Exchange auth code for access + refresh tokens
    // const tokenRes = await fetch(PRINTIFY_TOKEN_URL, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     grant_type: 'authorization_code',
    //     code,
    //     client_id: process.env.PRINTIFY_CLIENT_ID!,
    //     client_secret: process.env.PRINTIFY_CLIENT_SECRET!,
    //     redirect_uri: `${url.origin}/api/integrations/printify/callback`,
    //   }),
    // });
    // const tokens = await tokenRes.json();

    // Fetch shop info to get the shop ID
    // const shopRes = await fetch('https://api.printify.com/v1/shops.json', {
    //   headers: { Authorization: `Bearer ${tokens.access_token}` },
    // });
    // const shops = await shopRes.json();
    // const shopId = shops[0]?.id;

    // In production: store encrypted tokens + shopId in DB
    // await db.insert(integrations).values({
    //   userId: session.user.id,
    //   platform: 'printify',
    //   accessToken: encrypt(tokens.access_token),
    //   refreshToken: encrypt(tokens.refresh_token),
    //   tokenExpiresAt: new Date(Date.now() + tokens.expires_in * 1000),
    //   platformStoreId: String(shopId),
    //   isActive: true,
    // });

    const redirect = '/dashboard/integrations';
    return new Response(null, {
      status: 302,
      headers: { Location: redirect },
    });
  } catch (err) {
    return json(
      { error: { code: 'TOKEN_EXCHANGE_FAILED', message: (err as Error).message } },
      { status: 500 },
    );
  }
}
