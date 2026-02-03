import { lazy, Suspense, useEffect, useState } from 'react';
import { GlobalContext } from './context/GlobalContext';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import type { Product } from '@salon/types';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const AdminPage = lazy(() => import('./pages/AdminPage'));

function App() {
  const [showAddSlotModal, setShowAddSlotModal] = useState<boolean>(false);
  const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false);
  const [showAddServicesModal, setshowAddServicesModal] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return (
    <GlobalContext.Provider
      value={{
        showAddSlotModal,
        setShowAddSlotModal,
        showAddProductModal,
        setShowAddProductModal,
        products,
        setProducts,
        showAddServicesModal,
        setshowAddServicesModal,
        showConfirmationModal,
        setShowConfirmationModal,
      }}
    >
      <div className="app-container">
        <div className="content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<AdminPage />} />
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
          toastStyle={{
            fontSize: '14px',
          }}
        />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
