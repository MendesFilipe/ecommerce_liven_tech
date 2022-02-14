import Image from 'next/image';
import { SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline';

function Header() {
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
            className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4'
            type='text'
          />
          <SearchIcon className='h-12 p-4' />
        </div>
      </div>
    </header>
  );
}

export default Header;
