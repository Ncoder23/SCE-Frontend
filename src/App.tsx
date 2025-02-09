import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Layout from "./components/Layout";
import { CssBaseline } from "@mui/material";
import Products from "./pages/Products";
import { Provider } from 'react-redux';
import { store } from './components/cart/store';
import Cart from "./pages/Cart";
import Valentine from "./pages/avanil";
const theme = createTheme({
  palette: {
    primary: { main: "#388e3c" }, // Custom green color
    secondary: { main: "#ff9800" }, // Optional secondary color
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          minHeight: '100vh',
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Navbar />
            <Routes>
              <Route path="/" element={<Valentine />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Valentine />} />
              <Route path="/valentine" element={<Valentine />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
