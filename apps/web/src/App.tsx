import { lazy, Suspense, useEffect, useState } from 'react';
import { Theme } from './settings/types';
import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Footer from './components/Footer';
import { GlobalContext } from './context/GlobalContext';
import { Product } from '@salon/types';
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Shop = lazy(() => import('./pages/Shop'));
const BookAppointment = lazy(() => import('./pages/BookAppointment'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));

const theme: Theme = 'light';

function App() {
  const { pathname } = useLocation();
  const [cart, setCart] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity ?? 0), 0);
    setCartTotal(newTotal);
    const count = cart.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
    setCartCount(count);
  }, [cart, setCartCount]);

  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  return (
    <GlobalContext.Provider
      value={{ cart, setCart, cartCount, setCartCount, cartTotal, setCartTotal }}
    >
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="grow">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/book-appointment" element={<BookAppointment />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
