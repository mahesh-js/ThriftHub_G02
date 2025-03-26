const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const stripe = require("stripe")("sk_test_51QvgIMImHT6pRs88z6bhWgODMJYKbYYIIAFs2hdWQa4LgXckUd3lIgoGRn7qMoT95kzgaCvMpDSXj6YVHWA9AUpn002GKUARm6"); // Replace with your Stripe Secret Key
const cors = require("cors")({ origin: true }); // Enable CORS

admin.initializeApp();

// Create Stripe Checkout Session
exports.createCheckoutSession = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      const { lineItems, userId } = req.body;

      if (!Array.isArray(lineItems) || lineItems.length === 0) {
        return res.status(400).send("Missing or invalid lineItems in request body");
      }
      if (!userId) {
        return res.status(400).send("Missing userId in request body");
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://127.0.0.1:5500/guest-cust/customer/success.html?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://thrifthub-demo.web.app/guest-cust/customer/cancel.html",
        metadata: { userId },
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      res.status(500).send(`Failed to create checkout session: ${error.message}`);
    }
  });
});

// Stripe Webhook Listener
exports.stripeWebhook = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const sig = req.headers["stripe-signature"];
    let event;

    try {
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

        // Store the session ID as the document ID in the orders collection
        await admin.firestore().collection("orders").doc(session.id).set({
          userId: session.metadata.userId,
          amount: session.amount_total / 100,
          payment_status: "Paid",
          createdAt: new Date().toISOString(),
        });

        // Clear the user's cart
        const cartSnapshot = await admin.firestore()
          .collection("users")
          .doc(session.metadata.userId)
          .collection("carts")
          .get();
        const batch = admin.firestore().batch();
        cartSnapshot.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
      }

      res.json({ received: true });
    } catch (error) {
      console.error("Error processing webhook:", error);
      res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  });
});

// Function to sync email to MailerLite when a new customer is added to Firestore
exports.syncEmailToMailerLite = onDocumentCreated("customers/{customerId}", async (event) => {
  const snap = event.data;
  if (!snap) return;

  const email = snap.data().email;
  const name = snap.data().firstName || "";

  try {
    const response = await axios.post(
      "https://api.mailerlite.com/api/v2/subscribers",
      {
        email: email,
        name: name,
        groups: [mailerLiteGroupId],
        status: "active",
      },
      {
        headers: {
          "X-MailerLite-ApiKey": mailerLiteApiKey,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`Successfully added ${email} to MailerLite group ${mailerLiteGroupId}`, response.data);
  } catch (error) {
    console.error("Error adding to MailerLite:", error);
    throw new Error(`Failed to sync email to MailerLite: ${error.message}`);
  }
});