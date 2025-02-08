import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { localStorageMiddleware } from '../../utils/localStorageMiddleware';
import { CartState } from './cart.types';

// Load cart state from localStorage
const loadCartState = (): CartState => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return {
        items: [],
        loading: false,
        error: null
      };
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error('Error loading cart state:', err);
    return {
      items: [],
      loading: false,
      error: null
    };
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCartState()
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = {
  cart: CartState;
};

export type AppDispatch = typeof store.dispatch;
export { store };