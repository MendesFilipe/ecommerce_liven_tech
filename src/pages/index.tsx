import Head from 'next/head';
import Header from '../components/Header';

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
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>E-commerce - Liven</title>
      </Head>

      {/*Header*/}
      <Header />
    </div>
  );
};

export default Home;
