/**
 * Stripe webhook handlers — process incoming Stripe events
 * and update the Cockbrothers database accordingly.
 *
 * Runs server-side in the POST /api/payments/webhook route.
 */

// In production, import: import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export type StripeEventType =
  | 'customer.subscription.created'
  | 'customer.subscription.updated'
  | 'customer.subscription.deleted'
  | 'invoice.paid'
  | 'invoice.payment_failed'
  | 'customer.created';

export interface StripeWebhookPayload {
  id: string;
  type: StripeEventType;
  data: {
    object: Record<string, unknown>;
  };
  created: number;
  livemode: boolean;
}

export interface SubscriptionData {
  stripeId: string;
  stripeCustomerId: string;
  tier: string;
  status: string;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  trialEnd: number | null;
  canceledAt: number | null;
}

export interface WebhookHandlerResult {
  handled: boolean;
  subscription?: SubscriptionData;
  error?: string;
}

/**
 * Extract subscription data from a Stripe subscription object.
 */
function extractSubscription(sub: Record<string, unknown>): SubscriptionData {
  // Determine the tier from the Stripe price metadata
  const items = sub.items as Record<string, unknown> | undefined;
  const data = items?.data as Record<string, unknown>[] | undefined;
  const price = data?.[0]?.price as Record<string, unknown> | undefined;
  const product = price?.product as Record<string, unknown> | undefined;

  const tier = (product?.metadata as Record<string, string> | undefined)?.['tier'] ?? 'free';

  return {
    stripeId: String(sub.id),
    stripeCustomerId: String(sub.customer),
    tier,
    status: String(sub.status ?? 'active'),
    currentPeriodStart: Number(sub.current_period_start ?? Date.now() / 1000),
    currentPeriodEnd: Number(sub.current_period_end ?? Date.now() / 1000),
    trialEnd: sub.trial_end ? Number(sub.trial_end) : null,
    canceledAt: sub.canceled_at ? Number(sub.canceled_at) : null,
  };
}

/**
 * Dispatch an incoming Stripe event to the correct handler.
 */
export async function handleStripeWebhook(
  payload: StripeWebhookPayload,
  // In production: inject DB adapter (Drizzle) and logger
): Promise<WebhookHandlerResult> {
  const { type, data } = payload;
  const stripeObject = data.object;

  switch (type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub = extractSubscription(stripeObject);

      // In production:
      // await db
      //   .insert(subscriptions)
      //   .values({
      //     userId, // lookup from stripeCustomerId → users table
      //     stripeId: sub.stripeId,
      //     stripeCustomerId: sub.stripeCustomerId,
      //     tier: sub.tier,
      //     status: sub.status,
      //     currentPeriodStart: new Date(sub.currentPeriodStart * 1000),
      //     currentPeriodEnd: new Date(sub.currentPeriodEnd * 1000),
      //     trialEnd: sub.trialEnd ? new Date(sub.trialEnd * 1000) : null,
      //     canceledAt: sub.canceledAt ? new Date(sub.canceledAt * 1000) : null,
      //   })
      //   .onConflictDoUpdate({
      //     target: subscriptions.stripeId,
      //     set: {
      //       tier: sub.tier,
      //       status: sub.status,
      //       currentPeriodStart: new Date(sub.currentPeriodStart * 1000),
      //       currentPeriodEnd: new Date(sub.currentPeriodEnd * 1000),
      //       canceledAt: sub.canceledAt ? new Date(sub.canceledAt * 1000) : null,
      //     },
      //   });

      // Also update users.tier and users.subscription_id
      // await db.update(users).set({ tier: sub.tier, subscriptionId: sub.stripeId })
      //   .where(eq(users.stripeCustomerId, sub.stripeCustomerId));

      return { handled: true, subscription: sub };
    }

    case 'customer.subscription.deleted': {
      const sub = extractSubscription(stripeObject);

      // In production:
      // await db
      //   .update(subscriptions)
      //   .set({ status: 'canceled', canceledAt: new Date() })
      //   .where(eq(subscriptions.stripeId, sub.stripeId));
      //
      // await db
      //   .update(users)
      //   .set({ tier: 'free', subscriptionId: null })
      //   .where(eq(users.stripeCustomerId, sub.stripeCustomerId));

      return { handled: true, subscription: sub };
    }

    case 'invoice.paid': {
      // Handle successful payment — reset usage counters if needed, send email
      // const customerId = String(stripeObject.customer);
      // const invoiceUrl = String(stripeObject.hosted_invoice_url ?? '');

      // In production: send email via Resend
      // await resend.emails.send({
      //   to: user.email,
      //   subject: 'Invoice paid — Cockbrothers',
      //   text: `Your invoice is available at: ${invoiceUrl}`,
      // });

      return { handled: true };
    }

    case 'invoice.payment_failed': {
      // Handle failed payment — notify user, mark subscription past_due
      // const customerId = String(stripeObject.customer);
      // const attemptCount = Number(stripeObject.attempt_count ?? 1);

      // In production:
      // await db
      //   .update(subscriptions)
      //   .set({ status: 'past_due' })
      //   .where(eq(subscriptions.stripeCustomerId, customerId));
      //
      // Send email via Resend
      // await resend.emails.send({
      //   to: user.email,
      //   subject: 'Payment failed — update your billing info',
      //   text: `We were unable to process your payment (attempt ${attemptCount}). Please update your billing info.`,
      // });

      return { handled: true };
    }

    case 'customer.created': {
      // Just acknowledge — the customer record is created before subscription
      return { handled: true };
    }

    default:
      console.warn(`Unhandled Stripe event type: ${type}`);
      return { handled: false };
  }
}

/**
 * Verify Stripe webhook signature.
 * Returns the parsed event, or throws on invalid signature.
 */
export function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string,
): StripeWebhookPayload {
  // In production:
  // const event = stripe.webhooks.constructEvent(body, signature, secret);
  // return event as StripeWebhookPayload;

  // Stub for development:
  return JSON.parse(body) as StripeWebhookPayload;
}
