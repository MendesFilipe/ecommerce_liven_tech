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
      </div>
    </header>
  );
}

export default Header;
