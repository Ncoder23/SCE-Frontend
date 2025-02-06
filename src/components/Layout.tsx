import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

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
  return (
    <RootBox>
      {children}
    </RootBox>
  );
};

export default Layout;
