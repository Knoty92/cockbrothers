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

import { json } from '@solidjs/start/server';
import type { APIEvent } from '@solidjs/start/server';
import { handleStripeWebhook, verifyWebhookSignature } from '../../../lib/stripe/webhooks';

/**
 * Stripe sends webhook events as POST with JSON body + Stripe-Signature header.
 * This endpoint is public — it does NOT require user auth.
 */
export async function POST(event: APIEvent) {
  try {
    // Read raw body as text (needed for signature verification)
    const rawBody = await event.request.text();
    const signature = event.request.headers.get('stripe-signature') ?? '';
    const secret = process.env.STRIPE_WEBHOOK_SECRET ?? '';

    // In production, uncomment to verify:
    // const stripeEvent = verifyWebhookSignature(rawBody, signature, secret);
    // const result = await handleStripeWebhook(stripeEvent);

    // For development, parse directly
    const payload = JSON.parse(rawBody);

    // Process the event
    const result = await handleStripeWebhook(payload);

    if (!result.handled) {
      console.warn(`Unhandled Stripe event: ${payload.type}`);
    }

    // Acknowledge receipt (Stripe requires 200 within 30s)
    return json({ received: true, handled: result.handled });
  } catch (err) {
    console.error('Stripe webhook error:', err);

    // Stripe will retry on non-2xx responses
    return json(
      {
        error: {
          code: 'WEBHOOK_ERROR',
          message: (err as Error).message,
        },
      },
      { status: 400 },
    );
  }
}
