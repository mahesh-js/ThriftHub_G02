const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")("sk_test_51QvgIMImHT6pRs88z6bhWgODMJYKbYYIIAFs2hdWQa4LgXckUd3lIgoGRn7qMoT95kzgaCvMpDSXj6YVHWA9AUpn002GKUARm6"); // Replace with your Stripe Secret Key
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios"); // For HTTP requests to MailerLite API

admin.initializeApp();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/json" }));

const endpointSecret = "whsec_cE4WpaDUa5qOuBBed68GJNJEVDQ7erDT"; // Replace with your Stripe Webhook Secret

// Create Stripe Checkout Session
exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const { lineItems, userId } = req.body;

    if (!lineItems || !userId) {
      return res.status(400).send("Missing lineItems or userId in request body");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://127.0.0.1:5500/guest-cust/customer/success.html", // Replace with your success URL
      cancel_url: "http://127.0.0.1:5500/guest-cust/customer/cancel.html", // Replace with your cancel URL
      metadata: { userId },
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Failed to create checkout session:", error);
    res.status(400).send(`Failed to create checkout session: ${error.message}`);
  }
});

// Stripe Webhook Listener
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    // Parse the raw body for Stripe webhook verification
    const rawBody = Buffer.from(req.rawBody || "", "utf8");
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Payment Successful for User:", session.metadata.userId);

      await admin.firestore().collection("orders").add({
        userId: session.metadata.userId,
        amount: session.amount_total / 100,
        payment_status: "Paid",
        createdAt: new Date().toISOString(),
      });
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

// MailerLite API Key (get from MailerLite > Account > Integrations > API)
const mailerLiteApiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMTY3Y2FiMzY5MjNhYmM3YjU0MmJlZDViMWQ0NGU3OTlmMTE0NGMxZTdhNWE1ZDY2YmMxNGE5ZTljNGFjYmM5MmY3YTRhM2U2ZGY1NGI0MWQiLCJpYXQiOjE3NDExMzk3MDcuMjUzNjU5LCJuYmYiOjE3NDExMzk3MDcuMjUzNjYxLCJleHAiOjQ4OTY4MTMzMDcuMjQ5NjczLCJzdWIiOiIxMzc5OTgwIiwic2NvcGVzIjpbXX0.bVrei90eoDTmsrcAFyJPJTvah30NVoeEc12GKYrCSpa_r4eRELYopGpv0oq2zXnj68BiaVYcomBmJImjZq8rHv3jdsAxhI0jC30fxazkKzkiaiECNAYe-utVZ14XcAvsTrC400zutC9OuPwIwarFpMzkZrxXeV-ZQZgQTRIFmJ2vEYS1e71GR25Ml4bEj4MHJiQg1GAcmvTmjGPqfa61tYSeJa88AZnzHN5i_oR5f66mPugZp0-Ey5dZR0H9DxMiIz8WhrzAwqf8-7O8FU3Abl3mJcw9c5Ol6_F7J99iuCEv3ftgHm5BwZeku0GXsmovSaJF9-dufxfDBqU5GWmkhHHSRV5VvXbJbEyluNeoNmrfAAMe0GH83_N8-v99zRjoo7Jqx03Zp6d1keCNp2DlT7bmBjZZzfPfPvZoGlxpf91FR_7jBr8YhC-_Z8MaYurmGjQ3z_3xUOH7bsCjKjvhVRgdAl7bjL_oUNGQODuhk3NATin096u9Yl348F4DnrrnorGTjrITxhPb8xuppM4cDSchOQIQ4DkVYDLfosej5QUI4BMQ4aPaTlpL1wBhRCi2WtK9peu2dHo7pGh0LUWDPQh-cAvFi0DDVV7lBpcrHAArmPXiiS_JUyOpNliKZCYsU7-wjVTffOyQbnE6ZITfr1t70FlnHjO94lSJZHdnIP4"; // Replace with your MailerLite API key
const mailerLiteGroupId = "147994997792179309"; // Replace with your MailerLite group ID

// Function to sync email to MailerLite when a new customer is added to Firestore
exports.syncEmailToMailerLite = functions.firestore
  .document("customers/{customerId}")
  .onCreate(async (snap, context) => {
    const email = snap.data().email;
    const name = snap.data().firstName || ""; // Optional: Add name if available

    try {
      await axios.post(
        `https://api.mailerlite.com/api/v2/subscribers`,
        {
          email: email,
          name: name, // Optional: Include name for personalization
          groups: [mailerLiteGroupId], // Add to specific group
          status: "active", // Use "unconfirmed" for double-opt-in if needed
        },
        {
          headers: {
            "X-MailerLite-ApiKey": mailerLiteApiKey,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`Successfully added ${email} to MailerLite group ${mailerLiteGroupId}`);
    } catch (error) {
      console.error("Error adding to MailerLite:", error);
      throw new functions.https.HttpsError("internal", "Failed to sync email to MailerLite", error);
    }
  });