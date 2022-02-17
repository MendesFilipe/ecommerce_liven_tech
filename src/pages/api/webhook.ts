import { buffer } from 'micro';
import * as admin from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

interface App {
  credential: admin.credential.Credential;
}

const serviceAccount = require('');

const appParams: App = {
  credential: admin.credential.cert(serviceAccount),
};

const app = !admin.apps.length ? admin.initializeApp(appParams) : admin.app();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret: string = process.env.STRIPE_SIGNING_SECRET;

interface Order {
  amount: number;
  amount_shipping: number;
  images: string[];
  timestamp: admin.firestore.FieldValue;
}

const fulfillOrder = async (session) => {
  const order: Order = {
    amount: session.amount_total / 100,
    amount_shipping: session.total_details.amount_shipping / 100,
    images: JSON.parse(session.metadata.images),
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  };

  return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set(order)
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} has been added to the DB`);
    });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req);
    const payload: string = requestBuffer.toString();
    const sig: string | string[] = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log('ERROR:', err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
