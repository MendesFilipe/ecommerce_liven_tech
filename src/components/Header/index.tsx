import Image from 'next/image';
import { useState } from 'react';
import Currency from 'react-currency-formatter';
import { SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/client';

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface Props {
  products: IProduct[];
}

const Header: React.FC<Props> = ({ products }) => {
  const [session] = useSession();
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showResults, setShowResults] = useState<Boolean>(false);

  const handleSearch = (e) => {
    let trem = e.target.value;
    trem = trem.toLowerCase();
    setSearchTerm(trem);
    setSearchResults(
      products?.filter((product) => product.title.toLowerCase().includes(trem))
    );
  };

  const handleAuth = (): void => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <header>
      {/*Top nav*/}
      <div className='flex items-center bg-blue p-1 flex-grow py-2'>
        <div className='mt-2 flex items-center flex-grow sm:flex-grow-0 pb-2'>
          <Image
            src='https://bit.ly/3Bkq0NH'
            width={150}
            height={40}
            objectFit='contain'
            className='cursor-pointer'
          />
        </div>

        {/* Search */}
        <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-green hover:bg-orange'>
          <input
            onBlur={() => setShowResults(false)}
            onFocus={() => setShowResults(true)}
            value={searchTerm}
            onChange={handleSearch}
            placeholder='Search anything you need...'
            className='p-2 px-5 h-full width-6 flex-grow rounded flex-shrink rounded-l-md focus:outline-none'
            type='text'
          />
          <SearchIcon className='h-12 p-4' />
          {showResults && !!searchResults?.length && (
            <div
              onClick={() => setShowResults(true)}
              onMouseOver={() => setShowResults(true)}
              onMouseLeave={() => setShowResults(false)}
              className='absolute w-full bg-white bottom-0 z-40 rounded-md'
              style={{
                transform: 'translateY(15%)',
                height: 'auto',
                maxHeight: '400px',
                top: '0px',
                maxWidth: '71%',
                overflowY: 'auto',
              }}
            >
              {!!searchResults?.length ? (
                searchResults.map(({ id, title, price, category }) => (
                  <div
                    key={Math.random()}
                    className='p-2 mt-2 border-b-2 rounded-md border-gray-100 bg-gray-50'
                  >
                    <h5 className='font-medium text-sm text-gray-600'>
                      {title}
                    </h5>
                    <p className='text-xs text-gray-400'>
                      {category}
                      <Currency quantity={price} />
                    </p>
                  </div>
                ))
              ) : (
                <>
                  {searchTerm && (
                    <p className='text-xs text-gray-400 text-center py-2'>
                      No product found
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Right */}
        <div className='text-green flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
          <div onClick={handleAuth} className='link'>
            <p>Hello, {session ? `${session.user.name}` : 'Sign In'}</p>
            <p className='font-extrabold md:text-sm'>Account & Lists</p>
          </div>

          <div className='link'>
            <p>Returns</p>
            <p className='font-extrabold md:text-sm'>& Orders</p>
          </div>

          <div className='relative link flex items-center'>
            <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-orange text-center rounded-full text-white font-bold'>
              0
            </span>
            <ShoppingCartIcon className='h-10' />
            <p className='hidden md:inline font-extrabold md:text-sm mt-2'>
              Basket
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
