export default function handler(req, res) {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  // ===============================
  // 1️⃣ WEBHOOK VERIFICATION (GET)
  // ===============================
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    console.log("---- Webhook Verification Attempt ----");
    console.log("Mode received:", mode);
    console.log("Token received from Meta:", token);
    console.log("Expected token (from env):", VERIFY_TOKEN);
    console.log("---------------------------------------");

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ Webhook verified successfully");
      return res.status(200).send(challenge);
    } else {
      console.log("❌ Verification failed");
      return res.status(403).send("Verification failed");
    }
  }

  // ===============================
  // 2️⃣ INCOMING WHATSAPP EVENTS (POST)
  // ===============================
  if (req.method === "POST") {
    try {
      console.log("📩 Incoming WhatsApp Webhook:");
      console.log(JSON.stringify(req.body, null, 2));

      return res.status(200).send("EVENT_RECEIVED");
    } catch (error) {
      console.error("Webhook processing error:", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  // ===============================
  // 3️⃣ METHOD NOT ALLOWED
  // ===============================
  return res.status(405).send("Method Not Allowed");
}
