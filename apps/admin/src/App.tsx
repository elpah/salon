import { lazy, Suspense, useEffect } from 'react';
// import { Theme } from './settings/types';
// import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
// import Homepage from './pages/Homepage';
// import Footer from './components/Footer';
// const About = lazy(() => import('./pages/About'));
// const Services = lazy(() => import('./pages/Services'));
// const Contact = lazy(() => import('./pages/Contact'));
// const Shop = lazy(() => import('./pages/Shop'));
// const BookAppointment = lazy(() => import('./pages/BookAppointment'));

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);


  return (
    <div className="app-container">
      {/* <Navbar /> */}
      <div className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/book-appointment" element={<BookAppointment />} /> */}
          </Routes>
        </Suspense>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
