// import { Router } from "express";
// import Stripe from "stripe";
// // import { Order } from "../models/order.js";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const webhookRoute = Router();

// webhookRoute.post(
//   "/",
//   express.raw({ type: "application/json" }),
//   async (req, res) => {
//     const sig = req.headers["stripe-signature"];
//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET,
//       );
//     } catch (err) {
//       console.error("Webhook signature verification failed:", err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Handle events
//     switch (event.type) {
//       case "checkout.session.completed":
//         const session = event.data.object;

//         try {
//           await Order.findByIdAndUpdate(session.metadata.orderId, {
//             status: "paid",
//             paymentReference: session.id,
//           });
//           console.log(`Order ${session.metadata.orderId} marked as paid`);
//         } catch (err) {
//           console.error("Failed to update order:", err.message);
//         }
//         break;

//       case "payment_intent.payment_failed":
//         console.log("Payment failed:", event.data.object.id);
//         break;

//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     res.json({ received: true });
//   },
// );

// export default webhookRoute;
