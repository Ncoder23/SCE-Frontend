import React from "react";
import { 
  Button, 
  Card, 
  CardContent, 
  Container, 
  Grid, 
  Box,
  Typography,
  useTheme 
} from "@mui/material";
import { motion } from "framer-motion";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import NatureIcon from '@mui/icons-material/Nature';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
const LandingPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const features = [
    {
      icon: <NatureIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: "Carbon Credits",
      description: "Offset your carbon footprint through verified carbon credit trading"
    },
    {
      icon: <EmojiNatureIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: "Renewable Energy",
      description: "Access renewable energy credits from certified sources"
    },
    {
      icon: <EnergySavingsLeafIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: "Plastic Credits",
      description: "Support plastic waste reduction initiatives globally"
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            pt: 15,
            pb: 8,
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                color: 'success.main',
                mb: 3,
                background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Sustainability Credit Exchange
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                mb: 4,
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              Buy, sell, and track your sustainability credits including carbon credits, 
              renewable energy credits (RECs), and plastic credits. Join us in making a greener planet!
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 8 }}>
            <Button 
              variant="contained" 
              color="success" 
              size="large"
              startIcon={<ShoppingCartIcon />}
              onClick={() => navigate('/products')}
              sx={{ 
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              Get Started
            </Button>
            <Button 
              variant="outlined" 
              color="success" 
              size="large"
              startIcon={<InfoIcon />}
              sx={{ 
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%',
                    backgroundColor: 'background.paper',
                    borderRadius: 4,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    {feature.icon}
                    <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card 
            sx={{ 
              maxWidth: 'lg',
              mx: 'auto',
              mb: 8,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${theme.palette.success.light}, ${theme.palette.success.main})`,
              color: 'white'
            }}
          >
            <CardContent sx={{ p: 6, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                Our Mission
              </Typography>
              <Typography variant="h6" sx={{ maxWidth: '800px', mx: 'auto' }}>
                We empower businesses and individuals to offset their carbon footprint 
                by trading verified sustainability credits, making environmental 
                responsibility accessible and transparent for everyone.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
        <Footer />
      </Container>
    </Box>
  );
};

export default LandingPage;
