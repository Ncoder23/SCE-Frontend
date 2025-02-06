import { IconButton, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CartButton = () => {
  const navigate = useNavigate();
  // TODO: Replace with actual cart item count
  const itemCount = 0;

  return (
    <IconButton 
      color="inherit" 
      onClick={() => navigate('/cart')}
      sx={{ 
        p: 1,
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      <Badge badgeContent={itemCount} color="error">
        <ShoppingCart sx={{ fontSize: 28 }} />
      </Badge>
    </IconButton>
  );
};

export default CartButton; 