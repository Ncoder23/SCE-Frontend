import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
} from './cartSlice';
import { CartItem } from './cart.types';

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const addItemToCart = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  const removeItemFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const updateItemQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const emptyCart = () => {
    dispatch(clearCart());
  };

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + (item.price_per_unit * item.quantity);
    }, 0);
  };

  return {
    cart,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    emptyCart,
    getCartTotal,
  };
};