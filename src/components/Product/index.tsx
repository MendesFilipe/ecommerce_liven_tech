import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import { addToCart } from '../../slices/cartSlice';
import { useAppDispatch } from '../../app/hooks';

const MAX_RATING: number = 5;
const MIN_RATING: number = 1;

interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity?: number;
}

interface IProduct extends ProductProps {
  rating: number;
}

const Product: React.FC<ProductProps> = ({
  id,
  title,
  price,
  description,
  category,
  image,
}) => {
  const dispatch = useAppDispatch();
  const [rating] = useState<number>(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const addItemToCart = (): void => {
    const product: IProduct = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      quantity: 1,
    };

    //Sending the product as an action to the Redux store
    dispatch(addToCart(product));

    toast.success(
      <>
        <span className='font-bold'>Added to Cart!</span>
        <br />
        {product.title.slice(0, 30)}
        {product.title.length > 30 ? '…' : ''}
      </>,
      {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 20,
        progress: undefined,
      }
    );
  };

  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10 growing-hover top-[15px]'>
      <p className='absolute top-2 right-2 text-xs itelic text-gray-400'>
        {category}
      </p>

      <Image src={image} height={200} width={200} objectFit='contain' />
      <h4 className='my-3'>{title}</h4>
      <div className='flex'>
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <StarIcon className='h-5 text-orange' />
          ))}
      </div>

      <p className='text-xs my-2 line-clamp-2'>{description}</p>

      <div className='mb-5'>
        <Currency quantity={price} currency='USD' />
      </div>

      <button onClick={addItemToCart} className='mt-auto button'>
        Add to cart
      </button>
    </div>
  );
};

export default Product;
