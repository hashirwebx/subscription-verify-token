export default function handler(req, res) {
    const VERIFY_TOKEN = "subtrack_verify_token_123";

    // Meta webhook verification
    if (req.method === "GET") {
        const mode = req.query["hub.mode"];
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];

        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            return res.status(200).send(challenge);
        } else {
            return res.status(403).send("Verification failed");
        }
    }

    // Receive messages
    if (req.method === "POST") {
        console.log("Webhook event:", req.body);
        return res.sendStatus(200);
    }
}
