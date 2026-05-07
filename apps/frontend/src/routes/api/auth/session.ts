import { ok, MOCK_USER } from '../../../lib/api/mock/data';

export async function GET() {
  return ok({ user: MOCK_USER, authenticated: true });
}
