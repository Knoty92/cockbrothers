/**
 * Printful OAuth connect — POST /api/integrations/printful/connect
 *
 * Printful uses API key authentication (not OAuth 2.0).
 * This endpoint initiates the connection by returning the
 * Printful OAuth URL, or stores an API key directly.
 *
 * In production:
 * 1. Return redirect to Printful OAuth
 * 2. On callback, exchange code for API key
 * 3. Store encrypted key in DB
 */

import { json } from '@solidjs/start/server';
import type { APIEvent } from '@solidjs/start/server';

const PRINTFUL_OAUTH_URL = 'https://www.printful.com/oauth/authorize';

export async function POST(event: APIEvent) {
  try {
    // Get the redirect path from the query params
    const url = new URL(event.request.url);
    const redirect = url.searchParams.get('redirect') ?? '/dashboard/integrations';

    // In production, use real Printful OAuth credentials
    const clientId = process.env.PRINTFUL_CLIENT_ID ?? '';
    const state = crypto.randomUUID();

    const authUrl = new URL(PRINTFUL_OAUTH_URL);
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', `${url.origin}/api/integrations/printful/callback`);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('scope', 'store_products');

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
 * GET handler for OAuth callback
 * Called by Printful after user authorizes the app.
 */
export async function GET(event: APIEvent) {
  const url = new URL(event.request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  if (error) {
    return json(
      { error: { code: 'OAUTH_ERROR', message: `Printful denied: ${error}` } },
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
    // Exchange code for access token
    // const tokenResponse = await fetch('https://api.printful.com/oauth/token', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: new URLSearchParams({
    //     grant_type: 'authorization_code',
    //     code,
    //     client_id: process.env.PRINTFUL_CLIENT_ID!,
    //     client_secret: process.env.PRINTFUL_CLIENT_SECRET!,
    //     redirect_uri: `${url.origin}/api/integrations/printful/callback`,
    //   }),
    // });
    // const tokens = await tokenResponse.json();

    // In production: store encrypted token in DB
    // await db.insert(integrations).values({
    //   userId: session.user.id,
    //   platform: 'printful',
    //   accessToken: encrypt(tokens.access_token),
    //   refreshToken: encrypt(tokens.refresh_token),
    //   tokenExpiresAt: new Date(Date.now() + tokens.expires_in * 1000),
    //   isActive: true,
    // });

    // Redirect back to integrations page
    const redirect = '/dashboard/integrations'; // stored state.redirect
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
