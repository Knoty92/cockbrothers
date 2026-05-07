/**
 * Stripe webhook — POST /api/payments/webhook (public)
 *
 * Receives Stripe events (subscription.created, invoice.paid, etc.)
 * and updates the Cockbrothers database accordingly.
 *
 * In production:
 * - Verify Stripe signature with the webhook secret
 * - Use Stripe SDK to construct the event
 * - Update subscriptions table via Drizzle
 * - Send transactional emails via Resend
 */

import type { APIEvent } from '@solidjs/start/server';

/**
 * Stripe sends webhook events as POST with JSON body + Stripe-Signature header.
 * This endpoint is public — it does NOT require user auth.
 */
export async function POST(event: APIEvent) {
  try {
    const body = await event.request.text();
    const signature = event.request.headers.get('stripe-signature');

    if (!signature) {
      return Response.json(
        { error: { code: 'MISSING_SIGNATURE', message: 'Missing Stripe-Signature header' } },
        { status: 400 },
      );
    }

    // In production: verify webhook signature
    // const stripeEvent = stripe.webhooks.constructEvent(
    //   body,
    //   signature,
    //   process.env.STRIPE_WEBHOOK_SECRET!
    // );

    // For development, parse as raw JSON
    const eventData = JSON.parse(body);
    const eventType = eventData.type;

    // In production: handle event via Stripe SDK
    // await handleStripeWebhook(stripeEvent);

    return new Response(null, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: { code: 'WEBHOOK_ERROR', message: (err as Error).message } },
      { status: 400 },
    );
  }
}
