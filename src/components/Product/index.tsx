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
    <div>
      <p>{category}</p>
      <Image src={image} height={200} width={200} objectFit='contain' />
      <h4>{title}</h4>
      <div className='flex'>
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <StarIcon className='h-5' />
          ))}
      </div>

      <p>{description}</p>

      <div>
        <Currency quantity={price} currency='USD' />
      </div>
    </div>
  );
};

export default Product;
