import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';

const MAX_RATING: number = 5;
const MIN_RATING: number = 1;

interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const Product: React.FC<ProductProps> = ({
  id,
  title,
  price,
  description,
  category,
  image,
}) => {
  const [rating] = useState<number>(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
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

      <button className='mt-auto button'>Add to cart</button>
    </div>
  );
};

export default Product;
