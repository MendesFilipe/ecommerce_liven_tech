import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface cartState {
  items: any[];
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  quantity?: number;
}

const initialState: cartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id == action.payload.id
      );
      if (action.payload.quantity > 0) {
        if (index >= 0) {
          state.items[index].quantity += action.payload.quantity;
        } else {
          state.items = [...state.items, action.payload];
        }
      }
    },
    updateQuantity: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id == action.payload.id
      );

      if (index >= 0) {
        if (action.payload.quantity > 0) {
          state.items[index].quantity = action.payload.quantity;
        } else {
          let newCart = [...state.items];
          newCart.splice(index, 1);
          state.items = newCart;
        }
      } else
        console.warn(
          `Can't remove product ${action.payload.id} as its does not exist!`
        );
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      let newCart = [...state.items];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the cart!`
        );
      }

      state.items = newCart;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: RootState) => state.cart.items;
export const selectTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
export const selectTotalItems = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export default cartSlice.reducer;
