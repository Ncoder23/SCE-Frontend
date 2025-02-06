import React from 'react';
import { useCart } from '../components/cart/useCart';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Button 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem } from '../components/cart/cart.types';
const Cart: React.FC = () => {
  const { cart, removeItemFromCart, updateItemQuantity, emptyCart, getCartTotal } = useCart();

  return (
    <Box>
      <Typography variant="h6">Shopping Cart</Typography>
      {cart.items.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <List>
            {cart.items.map((item: CartItem) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={() => removeItemFromCart(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.project_name}
                  secondary={`${item.quantity} units @ $${item.price_per_unit} each`}
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 2, p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="h6">
              Total: ${getCartTotal().toFixed(2)}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2 }}
              // Implement checkout logic
              onClick={() => console.log('Proceed to checkout')}
            >
              Checkout
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              sx={{ mt: 2, ml: 2 }}
              onClick={emptyCart}
            >
              Clear Cart
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;