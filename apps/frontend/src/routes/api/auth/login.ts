import { ok, badRequest, serverError, MOCK_USER } from '../../../lib/api/mock/data';

export async function POST(event: { request: Request }) {
  try {
    const body = await event.request.json().catch(() => null);
    if (!body?.email || !body?.password) {
      return badRequest('Email and password are required');
    }
    return ok({ user: MOCK_USER, token: 'mock_token_' + crypto.randomUUID() });
  } catch (err) {
    return serverError(err);
  }
}
