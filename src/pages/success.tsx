import Head from 'next/head';
import Header from '../components/Header';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { selectItems } from '../slices/cartSlice';
import { useAppSelector } from '../app/hooks';
import { useTranslation } from 'react-i18next';

const Success: React.FC = () => {
  const items = useAppSelector<any[]>(selectItems);
  const { t } = useTranslation();

  return (
    <div className='bg-gray-100 h-screen'>
      <Head>
        <title>{t('title success')}</title>
      </Head>

      <Header products={items} />

      <main className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col p-10 bg-white'>
          <div className='flex items-center space-x-2 mb-5'>
            <CheckCircleIcon className='text-green h-10' />
            <h1 className='text-3xl'>{t('success message')}</h1>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Success;
