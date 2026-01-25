import { lazy, Suspense, useEffect, useState } from 'react';
import { GlobalContext } from './context/GlobalContext';

import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import type { TimeSlot } from './types/timeslot.type';
import type { Product } from './types/product.type';
import type { Service } from './types/service.type';
const AdminPage = lazy(() => import('./pages/AdminPage'));

function App() {
  const [showAddSlotModal, setShowAddSlotModal] = useState<boolean>(false);
  const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false);
  const [showAddServicesModal, setshowAddServicesModal] = useState<boolean>(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);

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
        timeSlots,
        setTimeSlots,
        products,
        setProducts,
        showAddServicesModal,
        setshowAddServicesModal,
        services,
        setServices,
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
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
