import { updateQuantity } from '../../slices/cartSlice';

function QuantityCount({ setQuantity, quantity = 1, dispatch, id = null }) {
  const increaseCount = () => {
    setQuantity(quantity + 1);
    updateQuantityProduct(quantity + 1);
  };

  const decreaseCount = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      updateQuantityProduct(quantity - 1);
    }
  };

  const updateQuantityProduct = (count) => {
    if (dispatch) {
      const product = { id, quantity: count };
      dispatch(updateQuantity(product));
    }
  };

  return (
    <div className='flex items-center'>
      <button
        onClick={decreaseCount}
        style={{ outline: 'none' }}
        className='flex w-[40px] h-[40px] items-center  bg-[#e8e8e8] justify-center rounded-[4px] ease-[all 0.3s] font-bold hover:bg-[#d6d6d6]'
      >
        -
      </button>
      <div className='flex min-w-[41px] justify-center self-center m-[0px 3px]'>
        {quantity}
      </div>
      <button
        onClick={increaseCount}
        style={{ outline: 'none' }}
        className='flex w-[40px] h-[40px] items-center bg-[#e8e8e8] justify-center rounded-[4px] ease-[all 0.3s] font-bold hover:bg-[#d6d6d6]'
      >
        +
      </button>
    </div>
  );
}

export default QuantityCount;
