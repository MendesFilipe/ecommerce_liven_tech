import Image from 'next/image';
import React, { forwardRef } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Currency from 'react-currency-formatter';
import { removeFromCart } from '../../slices/cartSlice';
import { useAppDispatch } from '../../app/hooks';
import { selectTotalItems } from '../../slices/cartSlice';
import QuantityCount from '../QuantityCount';
import { useAppSelector } from '../../app/hooks';
import { useTranslation } from 'react-i18next';

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  description: string;
  image: string;
  quantity?: number;
}

const CartProduct: React.FC<Product> = forwardRef<HTMLDivElement, Product>(
  ({ id, title, price, rating, description, image, quantity }, ref) => {
    const dispatch = useAppDispatch();
    const itemsTotal = useAppSelector<number>(selectTotalItems);
    const [quantityUp, setQuantityUp] = useState(quantity);
    const { t } = useTranslation();

    const removeItemFromCart = (): void => {
      dispatch(removeFromCart({ id }));
    };

    return (
      <div ref={ref} className='grid grid-cols-5'>
        <Image src={image} height={200} width={200} objectFit='contain' />

        {/* Middle */}
        <div className='col-span-3 mx-5'>
          <p>{title}</p>
          <div className='flex'>
            {Array(rating)
              .fill(0)
              .map((_, i) => (
                <StarIcon key={i} className='h-5 text-orange' />
              ))}
          </div>
          <p className='text-xs my-2 line-clamp-3'>{description}</p>
          <div className='text-gray-400'>
            <Currency quantity={price} currency='USD' /> {' * '} {itemsTotal}{' '}
            {' = '}
            <Currency quantity={price * itemsTotal} currency='USD' />
          </div>
        </div>

        {/* Right */}
        <div className='flex flex-col space-y-2 my-auto justify-self-end'>
          <QuantityCount
            id={id}
            dispatch
            setQuantity={setQuantityUp}
            quantity={quantityUp}
          />
          <button className='button' onClick={removeItemFromCart}>
            {t('remove cart')}
          </button>
        </div>
        <div className='my-4' />
      </div>
    );
  }
);

export default CartProduct;
