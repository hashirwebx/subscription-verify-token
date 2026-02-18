export default function handler(req, res) {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  // ✅ 1. Webhook Verification (Meta calls this once)
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified successfully");
      return res.status(200).send(challenge);
    } else {
      console.log("Verification failed");
      return res.status(403).send("Verification failed");
    }
  }

  // ✅ 2. Incoming Messages (Meta sends POST here)
  if (req.method === "POST") {
    try {
      console.log("Incoming webhook:", JSON.stringify(req.body, null, 2));
      return res.status(200).send("EVENT_RECEIVED");
    } catch (error) {
      console.error("Webhook error:", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  // ❌ Other methods not allowed
  return res.status(405).send("Method Not Allowed");
}
