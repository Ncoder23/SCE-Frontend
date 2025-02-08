import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../components/cart/store';

interface TypedAction {
  type: string;
}

export const localStorageMiddleware: Middleware<{}, RootState> = store => next => action => {
  const result = next(action);
  
  if (typeof action === 'object' && action !== null && 'type' in action) {
    const typedAction = action as TypedAction;
    if (typedAction.type.startsWith('cart/')) {
      const cartState = store.getState().cart;
      localStorage.setItem('cart', JSON.stringify(cartState));
    }
  }
  
  return result;
};
