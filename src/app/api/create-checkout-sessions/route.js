import Stripe from "stripe";
import { db } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Pricing in smallest currency units (paise / cents)
const PRICING = {
  INR: { monthly: 39900, quarterly: 99900, yearly: 379900 },
  USD: { monthly: 900, quarterly: 2400, yearly: 7200 },
};

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
    }
    const { userId, plan, currency } = body; // userId coming from client is the Clerk user id

    // Basic validation
    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400 });
    }
    if (!['monthly', 'quarterly', 'yearly'].includes(plan)) {
      return new Response(JSON.stringify({ error: "Invalid plan" }), { status: 400 });
    }
    if (!['INR', 'USD'].includes(currency)) {
      return new Response(JSON.stringify({ error: "Unsupported currency" }), { status: 400 });
    }

    const amountMinor = PRICING[currency][plan];
    if (!amountMinor) {
      return new Response(JSON.stringify({ error: "Pricing not configured" }), { status: 400 });
    }

    // Map Clerk user id to internal DB user id (foreign key expects User.id, not clerkId)
    let dbUser = await db.user.findUnique({ where: { clerkId: userId } });
    if (!dbUser) {
      // Attempt to create minimal user record if it doesn't exist yet.
      // Name/email optional per schema; can be enriched elsewhere.
      try {
        dbUser = await db.user.create({ data: { clerkId: userId } });
      } catch (creationErr) {
        // If race condition (unique violation), refetch
        dbUser = await db.user.findUnique({ where: { clerkId: userId } });
        if (!dbUser) {
          return new Response(JSON.stringify({ error: "Unable to create user record" }), { status: 500 });
        }
      }
    }

    const headers = request.headers;
    const origin = headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      metadata: { plan, userId, currency },
      line_items: [
        {

          price_data: {
            currency: currency.toLowerCase(),
            product_data: { name: `Silent Talk${plan.charAt(0).toUpperCase() + plan.slice(1)} plan` },
            unit_amount: amountMinor,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });
    return new Response(JSON.stringify({ id: session.id }), { status: 200 });
  } catch (err) {
    console.error('Create checkout session error:', err);
    return new Response(JSON.stringify({ error: 'Server error', detail: err.message }), { status: 500 });
  }
}
