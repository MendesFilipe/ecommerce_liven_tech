import Image from 'next/image';
import React, { forwardRef } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { addToCart, removeFromCart } from '../../slices/cartSlice';
import { useAppDispatch } from '../../app/hooks';

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  description: string;
  category: string;
  image: string;
}

const CartProduct: React.FC<Product> = forwardRef<HTMLDivElement, Product>(
  ({ id, title, price, rating, description, category, image }, ref) => {
    const dispatch = useAppDispatch();

    const addItemToCart = (): void => {
      const product: Product = {
        id,
        title,
        price,
        rating,
        description,
        category,
        image,
      };

      dispatch(addToCart(product));
    };

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
          <Currency quantity={price} currency='USD' />
        </div>

        {/* Right */}
        <div className='flex flex-col space-y-2 my-auto justify-self-end'>
          <button className='button' onClick={addItemToCart}>
            Add to Cart
          </button>
          <button className='button' onClick={removeItemFromCart}>
            Remove from Cart
          </button>
        </div>
        <div className='my-4' />
      </div>
    );
  }
);

export default CartProduct;
