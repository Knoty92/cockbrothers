import { ok, badRequest, serverError, MOCK_USER } from '../../../lib/api/mock/data';

export async function POST(event: { request: Request }) {
  try {
    const body = await event.request.json().catch(() => null);
    if (!body?.email || !body?.password || !body?.name) {
      return badRequest('Name, email, and password are required');
    }
    if (body.password.length < 8) {
      return badRequest('Password must be at least 8 characters');
    }
    return ok({ user: MOCK_USER, token: 'mock_token_' + crypto.randomUUID() });
  } catch (err) {
    return serverError(err);
  }
}
