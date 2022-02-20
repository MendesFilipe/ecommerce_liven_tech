import Head from 'next/head';
import Header from '../components/Header';
import { getSession } from 'next-auth/client';
import ProductFeed from '../components/ProductFeed';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface HomeProps {
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  const { t } = useTranslation();
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>{t('title liven')}</title>
      </Head>

      {/* Header */}
      <Header products={products} />

      {/* Main */}
      <main className='max-w-screen-2xl mx-auto'>
        {/* ProductFeed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const products = await fetch('https://fakestoreapi.com/products').then(
    (res) => res.json()
  );

  return {
    props: {
      products,
      session,
    },
  };
};

export default Home;
