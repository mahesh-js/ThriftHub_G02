const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")("sk_test_51QvgIMImHT6pRs88z6bhWgODMJYKbYYIIAFs2hdWQa4LgXckUd3lIgoGRn7qMoT95kzgaCvMpDSXj6YVHWA9AUpn002GKUARm6"); // Replace with your Stripe Secret Key
const cors = require("cors")({ origin: true });
const express = require("express");
const bodyParser = require("body-parser");

admin.initializeApp();
const app = express();
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/json" }));

const endpointSecret = "whsec_cE4WpaDUa5qOuBBed68GJNJEVDQ7erDT"; // Replace with your Stripe Webhook Secret

// Create Stripe Checkout Session
exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { lineItems, userId } = req.body;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/success.html", // Replace with your success URL
        cancel_url: "http://localhost:3000/cancel.html", // Replace with your cancel URL
        metadata: { userId },
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      res.status(400).send(`Failed to create checkout session: ${error.message}`);
    }
  });
});

// Stripe Webhook Listener
app.post("/stripeWebhook", (req, res) => {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Payment Successful for User:", session.metadata.userId);

      admin.firestore().collection("orders").add({
        userId: session.metadata.userId,
        amount: session.amount_total / 100,
        payment_status: "Paid",
        createdAt: new Date(),
      });
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook Error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

exports.stripeWebhook = functions.https.onRequest(app);

