import { NextApiRequest, NextApiResponse } from 'next';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  quantity?: number;
}

interface requestType {
  items: Product[];
  email: string;
}

interface Item {
  description: string;
  quantity: number;
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      images: string[];
    };
  };
}

interface Session {
  payment_method_types: string[];
  shipping_rates: string[];
  shipping_address_collection: {
    allowed_countries: string[];
  };
  line_items: Item[];
  mode: string;
  success_url: string;
  cancel_url: string;
  metadata: {
    email: string;
    images: string;
  };
}

interface Response {
  id: number;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { items, email }: requestType = req.body;

  const transformedItems = items.map((item) => {
    const data: Item = {
      description: item.description,
      quantity: 1,
      price_data: {
        currency: 'brl',
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          images: [item.image],
        },
      },
    };

    return data;
  });

  const sessionData: Session = {
    payment_method_types: ['card'],
    shipping_rates: ['shr_1KUPlfBcOtahDqY2rGqVI8JF'],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'GB'],
    },
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/cart`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  };

  const session = await stripe.checkout.sessions.create(sessionData);

  const response: Response = {
    id: session.id,
  };

  res.status(200).json(response);
};
