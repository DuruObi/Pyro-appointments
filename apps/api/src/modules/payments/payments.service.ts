import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-11-15' });

export async function createStripeSession({ amountCents, currency='usd', successUrl, cancelUrl, metadata }){
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price_data: { currency, product_data: { name: metadata?.description || 'Booking' }, unit_amount: amountCents }, quantity: 1 }],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  });
  return session;
}
