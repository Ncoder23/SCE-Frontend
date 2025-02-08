import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, Chip, Button, CircularProgress, Alert, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Provider } from 'react-redux';
import { store } from '../components/cart/store';
import { useCart } from '../components/cart/useCart';

interface CreditProduct {
  id: number;
  project_name: string;
  credit_type: 'carbon_credit' | 'REC' | 'plastic_credit';
  description: string;
  origin_country: string;
  price_per_unit: number;
  available_quantity: number;
  issued_date: string;
  expiration_date: string;
  verification_status: boolean;
}


const getCreditTypeColor = (type: CreditProduct['credit_type']) => {
  const colors = {
    carbon_credit: '#2E7D32',
    REC: '#1565C0',
    plastic_credit: '#D32F2F'
  };
  return colors[type];
};

const getCreditTypeLabel = (type: CreditProduct['credit_type']) => {
  const labels = {
    carbon_credit: 'Carbon Credit',
    REC: 'Renewable Energy Credit',
    plastic_credit: 'Plastic Credit'
  };
  return labels[type];
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

const Projects: React.FC = () => {
  const [products, setProducts] = useState<CreditProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchaseStates, setPurchaseStates] = useState<{ [key: number]: { isOrdering: boolean; units: string } }>({});
  const { addItemToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = `${import.meta.env.VITE_API_URL}/api/credits/sustainability-credits/`;
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }
      const response = await fetch(url, {
        headers: {
          'Authorization': `Token ${token}`
        }
      }); // Adjust the API endpoint as needed
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handleUnitsChange = (productId: number, value: string) => {
    if (value === '' || /^\d+$/.test(value)) {
      const numValue = parseInt(value);
      const product = products.find(p => p.id === productId);
      
      if (value === '' || (numValue > 0 && product && numValue <= product.available_quantity)) {
        setPurchaseStates(prev => ({
          ...prev,
          [productId]: { ...prev[productId], units: value }
        }));
      }
    }
  };

  const handleBuyClick = (productId: number) => {
    setPurchaseStates(prev => ({
      ...prev,
      [productId]: { isOrdering: true, units: '' }
    }));
  };

  const handleAddToCart = async (product: CreditProduct, units: string) => {
    try {
      const quantity = parseInt(units);
      if (isNaN(quantity) || quantity <= 0) {
        throw new Error('Please enter a valid number of units');
      }
      if (quantity > product.available_quantity) {
        throw new Error('Requested quantity exceeds available units');
      }

      addItemToCart({
        id: product.id,
        project_name: product.project_name,
        credit_type: product.credit_type,
        price_per_unit: product.price_per_unit,
        quantity: quantity,
      });

      setPurchaseStates(prev => ({
        ...prev,
        [product.id]: { isOrdering: false, units: '' }
      }));
    } catch (err) {
      console.error('Add to cart error:', err);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={fetchProducts}>
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Available Credits
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Purchase verified environmental credits from global sustainability projects
      </Typography>
      
      {products.length === 0 ? (
        <Alert severity="info">No credits available at the moment.</Alert>
      ) : (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} md={6} lg={4} key={product.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease-in-out'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Chip
                      label={getCreditTypeLabel(product.credit_type)}
                      sx={{
                        backgroundColor: getCreditTypeColor(product.credit_type),
                        color: 'white',
                      }}
                    />
                    {product.verification_status && (
                      <CheckCircleIcon 
                        sx={{ 
                          color: '#4CAF50',
                          fontSize: '1.5rem'
                        }} 
                      />
                    )}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {product.project_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="primary">
                      Origin: {product.origin_country}
                    </Typography>
                    <Typography variant="subtitle2" color="primary">
                      Price: ${product.price_per_unit} per unit
                    </Typography>
                    <Typography variant="subtitle2" color="primary">
                      Available: {product.available_quantity.toLocaleString()} units
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                      Issued: {formatDate(product.issued_date)}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      Expires: {formatDate(product.expiration_date)}
                    </Typography>
                    
                    {purchaseStates[product.id]?.isOrdering ? (
                      <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                        <TextField
                          type="number"
                          size="small"
                          label="Units"
                          value={purchaseStates[product.id]?.units || ''}
                          onChange={(e) => handleUnitsChange(product.id, e.target.value)}
                          sx={{ flexGrow: 1 }}
                          inputProps={{ 
                            min: 1,
                            max: product.available_quantity,
                            step: 1
                          }}
                          
                        />
                        <Button
                          variant="contained"
                          onClick={() => handleAddToCart(product, purchaseStates[product.id]?.units || '')}
                          disabled={!purchaseStates[product.id]?.units}
                        >
                          Add to Cart
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3 }}
                        onClick={() => handleBuyClick(product.id)}
                      >
                        Buy Credits
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

const ProjectsWithProvider: React.FC = () => (
  <Provider store={store}>
    <Projects />
  </Provider>
);

export default ProjectsWithProvider;
