import Head from 'next/head';
import CartProduct from '../components/CartProduct';
import Header from '../components/Header';
import {
  selectItems,
  selectTotalItems,
  selectTotal,
} from '../slices/cartSlice';
import FlipMove from 'react-flip-move';
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/client';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAppSelector } from '../app/hooks';
import { useTranslation } from 'react-i18next';
const stripePromise = loadStripe(process.env.stripe_public_key);

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

interface resultType {
  sessionId: string;
}

const Cart: React.FC = () => {
  const items = useAppSelector<Product[]>(selectItems);
  const itemsTotal = useAppSelector<number>(selectTotalItems);
  const [session] = useSession();
  const total = useAppSelector<number>(selectTotal);
  const { t } = useTranslation();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    toast.info(t('please Wait'), {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const requestBody: requestType = {
      items,
      email: session.user.email,
    };

    let checkoutSession;

    await axios
      .post('/api/create-checkout-session', requestBody)
      .then((response) => {
        checkoutSession = response.data;
      })
      .catch(() => {
        // Palliative solution Error in vercel, locally it works perfectly, but not in Vercel,
        // this solution is just to show the functionality
        toast.error(t('try again'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    if (checkoutSession) {
      const params: resultType = {
        sessionId: checkoutSession.id,
      };

      const result = await stripe.redirectToCheckout(params);

      if (result.error) {
        alert(result.error.message);
      }
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Head>
        <title>{t('shopping cart')}</title>
      </Head>

      <Header products={items} />

      <main className='lg:flex max-w-screen-2xl mx-auto'>
        {/* Left */}
        <div className='flex-grow m-5 shadow-sm'>
          <div className='flex flex-col p-5 space-y-10 bg-white'>
            <h1 className='text-3xl border-b pb-4'>
              {items.length === 0
                ? 'Your Cart is empty.'
                : 'Your Shopping Cart'}
            </h1>

            <FlipMove>
              {items.map(
                (
                  { id, title, price, rating, description, image, quantity },
                  i
                ) => (
                  <CartProduct
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    rating={rating}
                    description={description}
                    image={image}
                    quantity={quantity}
                  />
                )
              )}
            </FlipMove>
          </div>
        </div>

        {/* Right */}
        <div className='flex flex-col bg-white p-10 shadow-md'>
          {itemsTotal > 0 && (
            <>
              <h2 className='whitespace-nowrap'>
                Subtotal ({itemsTotal} {itemsTotal === 1 ? 'item' : 'items'}
                ):{' '}
                <span className='font-bold'>
                  <Currency quantity={total} currency='USD' />
                </span>
              </h2>
              <button
                role='link'
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed whitespace-nowrap'
                }`}
              >
                {!session ? 'Sign in to checkout' : 'Proceed to Checkout'}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cart;
