import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import React from 'react';
import Navbar from './Navbar';

const RootBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  width: '100vw',
  maxWidth: '100%',
  margin: 0,
  padding: 0,
  overflow: 'hidden',
});

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isValentinePage = location.pathname === '/valentine';

  // Split children into array to separate Navbar from other components
  const childrenArray = React.Children.toArray(children);
  const navbar = childrenArray.find(child => 
    React.isValidElement(child) && child.type === Navbar
  );
  const otherComponents = childrenArray.filter(child => 
    React.isValidElement(child) && child.type !== Navbar
  );

  return (
    <RootBox>
      {!isValentinePage && navbar}
      {otherComponents}
    </RootBox>
  );
};

export default Layout;
