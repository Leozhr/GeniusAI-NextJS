import stripeClient from "stripe";

export const stripe = new stripeClient(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-08-16',
  typescript: true
});