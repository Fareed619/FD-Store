import { Router } from "express";
import Stripe from "stripe";
import { configDotenv } from "dotenv";
configDotenv();
const router = Router();
const stripe = new Stripe(process.env.STRIPE_PRIVET_KEY);

// http://localhost:4000/api/stripe/checkout

router.post("/checkout", async (req, res) => {
  const { items, _orderId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.qty,
        };
      }),

      success_url: `/success/${_orderId}`,
      cancel_url: `/cancel`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
export default router;
