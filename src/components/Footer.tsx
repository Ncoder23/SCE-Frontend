import React from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';

const Footer: React.FC = () => {

    return (
        <Box
          component="footer"
          sx={{
            py: 6,
            px: 2,
            mt: 'auto',
            backgroundColor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  About Us
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We're committed to making environmental sustainability 
                  accessible through our innovative credit trading platform.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Quick Links
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {['Home', 'About', 'Services', 'Contact'].map((text) => (
                    <Button
                      key={text}
                      sx={{
                        textAlign: 'left',
                        justifyContent: 'flex-start',
                        color: 'text.secondary',
                        '&:hover': { color: 'success.main' }
                      }}
                    >
                      {text}
                    </Button>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Contact Us
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: info@example.com
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone: +1 234 567 8900
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: 123 Green Street, Eco City
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: 5, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Sustainability Credit Exchange. All rights reserved.
              </Typography>
            </Box>
          </Container>
        </Box>
  );
};

export default Footer;