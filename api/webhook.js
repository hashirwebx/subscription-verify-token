export default function handler(req, res) {
    const VERIFY_TOKEN = 'https://whatsappsubscriptionmanagementsyste-flax.vercel.app/';

    if (req.method === 'GET') {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            res.status(200).send(challenge);
        } else {
            res.status(403).send('Forbidden');
        }
    } else if (req.method === 'POST') {
        console.log('Incoming WhatsApp message:', req.body);
        res.sendStatus(200);
    } else {
        res.sendStatus(405);
    }
}
