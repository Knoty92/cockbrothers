/**
 * Stripe subscription — POST /api/payments/subscribe
 *
 * Creates a Stripe Checkout session for a new subscription
 * or plan change. Returns a Checkout URL for redirect.
 *
 * In production, this uses the Stripe SDK server-side.
 */

import type { APIEvent } from '@solidjs/start/server';

interface SubscribeBody {
  priceId: string;
  successUrl?: string;
  cancelUrl?: string;
}

export async function POST(event: APIEvent) {
  try {
    // Get current user from session
    // const session = await getSession(event.request);
    // if (!session) {
    //   return Response.json({ error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } }, { status: 401 });
    // }

    // Parse request body
    const body: SubscribeBody = await event.request.json();
    const { priceId } = body;

    if (!priceId) {
      return Response.json(
        { error: { code: 'INVALID_PARAMS', message: 'priceId is required' } },
        { status: 400 },
      );
    }

    // In production: initialize Stripe
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-02-24.acacia' });
    //
    // Get or create Stripe customer for this user
    // const user = await db.query.users.findFirst({
    //   where: eq(users.id, session.user.id),
    // });
    //
    // let customerId = user.stripeCustomerId;
    // if (!customerId) {
    //   const customer = await stripe.customers.create({
    //     email: user.email,
    //     name: user.name,
    //     metadata: { userId: user.id },
    //   });
    //   customerId = customer.id;
    //   await db.update(users)
    //     .set({ stripeCustomerId: customerId })
    //     .where(eq(users.id, user.id));
    // }
    //
    // const checkout = await stripe.checkout.sessions.create({
    //   customer: customerId,
    //   mode: 'subscription',
    //   line_items: [{ price: priceId, quantity: 1 }],
    //   success_url: body.successUrl ?? `${origin}/dashboard/settings/billing?success=true`,
    //   cancel_url: body.cancelUrl ?? `${origin}/dashboard/settings/billing?canceled=true`,
    //   subscription_data: {
    //     metadata: { userId: user.id },
    //   },
    // });

    const origin = new URL(event.request.url).origin;

    // Stub response for development
    return Response.json({
      data: {
        url: `${origin}/dashboard/settings/billing?checkout=stub&price=${priceId}`,
        sessionId: `cs_stub_${crypto.randomUUID()}`,
      },
    });
  } catch (err) {
    return Response.json(
      { error: { code: 'SUBSCRIPTION_FAILED', message: (err as Error).message } },
      { status: 500 },
    );
  }
}
