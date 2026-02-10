import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { GlobalContext } from './context/GlobalContext';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLayout = lazy(() => import('./pages/AdminLayout'));
const BookingsPage = lazy(() => import('./pages/BookingsPage'));
const AvailabilityPage = lazy(() => import('./pages/AvailabilityPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));

function App() {
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddServicesModal, setShowAddServicesModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [pathname]);

  return (
    <GlobalContext.Provider
      value={{
        showAddSlotModal,
        setShowAddSlotModal,
        showAddProductModal,
        setShowAddProductModal,
        showAddServicesModal,
        setShowAddServicesModal,
        showAddCategoryModal,
        setShowAddCategoryModal,
        showConfirmationModal,
        setShowConfirmationModal,
      }}
    >
      <div className="app-container">
        <div className="content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<AdminLayout />}>
                <Route index element={<BookingsPage />} />
                <Route path="bookings" element={<BookingsPage />} />
                <Route path="availability" element={<AvailabilityPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="categories" element={<CategoryPage />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={1500}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          theme="colored"
          toastStyle={{ fontSize: '14px' }}
        />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
