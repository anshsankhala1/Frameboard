import { Router, Request, Response } from 'express';
import { stripeService } from '../services/stripe/StripeService';
import { User } from '../models/User';
import { authMiddleware } from '../middleware/auth';
import Stripe from 'stripe';

const router = Router();

/**
 * POST /api/stripe/create-checkout-session
 * Create a Stripe checkout session for subscription
 */
router.post('/create-checkout-session', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { priceId } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is required' });
    }

    // Get user information
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Determine the frontend URL based on environment
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    // Create checkout session
    const session = await stripeService.createCheckoutSession(
      userId,
      user.email,
      priceId,
      `${frontendUrl}/portal/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      `${frontendUrl}/pricing?canceled=true`
    );

    res.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message || 'Failed to create checkout session' });
  }
});

/**
 * POST /api/stripe/create-portal-session
 * Create a billing portal session for subscription management
 */
router.post('/create-portal-session', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    // Get user information
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.stripeCustomerId) {
      return res.status(400).json({ error: 'No active subscription found' });
    }

    // Determine the frontend URL based on environment
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    // Create portal session
    const session = await stripeService.createBillingPortalSession(
      user.stripeCustomerId,
      `${frontendUrl}/portal/subscription`
    );

    res.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating portal session:', error);
    res.status(500).json({ error: error.message || 'Failed to create portal session' });
  }
});

/**
 * GET /api/stripe/subscription-status
 * Get current user's subscription status
 */
router.get('/subscription-status', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      subscriptionPlan: user.subscriptionPlan || 'free',
      subscriptionStatus: user.subscriptionStatus || 'inactive',
      subscriptionCurrentPeriodEnd: user.subscriptionCurrentPeriodEnd,
      hasActiveSubscription: user.subscriptionStatus === 'active' || user.subscriptionStatus === 'trialing'
    });
  } catch (error: any) {
    console.error('Error getting subscription status:', error);
    res.status(500).json({ error: error.message || 'Failed to get subscription status' });
  }
});

/**
 * POST /api/stripe/webhook
 * Handle Stripe webhook events
 */
router.post('/webhook', async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'] as string;

  if (!signature) {
    return res.status(400).json({ error: 'No signature provided' });
  }

  try {
    // Verify webhook signature
    const event = stripeService.verifyWebhookSignature(
      req.body,
      signature
    );

    console.log('Received Stripe webhook event:', event.type);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: error.message || 'Webhook processing failed' });
  }
});

/**
 * Handle successful checkout session
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;

  if (!userId) {
    console.error('No userId in checkout session metadata');
    return;
  }

  const user = await User.findById(userId);
  if (!user) {
    console.error('User not found:', userId);
    return;
  }

  // Update user with Stripe customer ID
  user.stripeCustomerId = session.customer as string;
  user.stripeSubscriptionId = session.subscription as string;
  user.subscriptionPlan = 'pro';
  user.subscriptionStatus = 'active';

  await user.save();
  console.log('User subscription activated:', userId);
}

/**
 * Handle subscription updates
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const user = await User.findOne({ stripeCustomerId: subscription.customer as string });

  if (!user) {
    console.error('User not found for customer:', subscription.customer);
    return;
  }

  user.stripeSubscriptionId = subscription.id;
  user.subscriptionStatus = subscription.status as any;
  user.subscriptionCurrentPeriodEnd = new Date(subscription.current_period_end * 1000);

  // Update plan based on subscription status
  if (subscription.status === 'active' || subscription.status === 'trialing') {
    user.subscriptionPlan = 'pro';
  }

  await user.save();
  console.log('User subscription updated:', user._id);
}

/**
 * Handle subscription deletion/cancellation
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const user = await User.findOne({ stripeCustomerId: subscription.customer as string });

  if (!user) {
    console.error('User not found for customer:', subscription.customer);
    return;
  }

  user.subscriptionStatus = 'canceled';
  user.subscriptionPlan = 'free';
  user.stripeSubscriptionId = undefined;

  await user.save();
  console.log('User subscription canceled:', user._id);
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const user = await User.findOne({ stripeCustomerId: invoice.customer as string });

  if (!user) {
    console.error('User not found for customer:', invoice.customer);
    return;
  }

  user.subscriptionStatus = 'past_due';

  await user.save();
  console.log('User payment failed:', user._id);
}

export default router;
