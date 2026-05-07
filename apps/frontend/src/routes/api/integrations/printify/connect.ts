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

import type { APIEvent } from '@solidjs/start/server';

const PRINTIFY_AUTH_URL = 'https://oauth.printify.com/oauth/authorize';
const PRINTIFY_TOKEN_URL = 'https://oauth.printify.com/oauth/token';

export async function POST(event: APIEvent) {
  try {
    const url = new URL(event.request.url);

    const clientId = process.env.PRINTIFY_CLIENT_ID ?? '';
    const state = crypto.randomUUID();

    const authUrl = new URL(PRINTIFY_AUTH_URL);
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', `${url.origin}/api/integrations/printify/callback`);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('scope', 'stores:read');

    return Response.json({
      data: { authUrl: authUrl.toString() },
    });
  } catch (err) {
    return Response.json(
      { error: { code: 'CONNECT_FAILED', message: (err as Error).message } },
      { status: 500 },
    );
  }
}

export async function GET(event: APIEvent) {
  const url = new URL(event.request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  if (error) {
    return Response.json(
      { error: { code: 'OAUTH_ERROR', message: `Printify denied: ${error}` } },
      { status: 400 },
    );
  }

  if (!code || !state) {
    return Response.json(
      { error: { code: 'INVALID_PARAMS', message: 'Missing code or state' } },
      { status: 400 },
    );
  }

  try {
    const redirect = '/dashboard/integrations';
    return new Response(null, {
      status: 302,
      headers: { Location: redirect },
    });
  } catch (err) {
    return Response.json(
      { error: { code: 'TOKEN_EXCHANGE_FAILED', message: (err as Error).message } },
      { status: 500 },
    );
  }
}
