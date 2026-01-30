import { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AvailabilityPage from './AvailabilityPage';
import BookingsPage from './BookingsPage';
import OrdersPage from './OrdersPage';
import ProductsPage from './ProductsPage';
import ServicesPage from './ServicesPage';
import Sidebar from '../components/Sidebar';
import { Menu, Plus } from 'lucide-react';
import { GlobalContext } from '../context/GlobalContext';

// --- Types ---
type AdminPage = 'bookings' | 'availability' | 'orders' | 'products' | 'services';

// --- Main Admin Dashboard Component ---
export const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState<AdminPage>('bookings');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [header, setHeader] = useState<string>('');
  const [subHeader, setSubHeader] = useState<string>('');
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    switch (currentPage) {
      case 'bookings':
        setHeader('Bookings');
        setSubHeader('Manage all client appointments');
        break;
      case 'availability':
        setHeader('Availability');
        setSubHeader('Manage your appointment time slots');
        break;
      case 'orders':
        setHeader('Orders');
        setSubHeader('Manage product orders');
        break;
      case 'products':
        setHeader('Products');
        setSubHeader('Manage your products inventory');
        break;
      case 'services':
        setHeader('Services');
        setSubHeader('Manage your salon services');
        break;
    }
  }, [currentPage]);

  const handleLogout = () => {
    alert('Logging out...');
  };

  const pageConfig = {
    availability: {
      showButton: true,
      label: 'Add Availability',
      action: () => globalContext.setShowAddSlotModal(true),
    },
    bookings: {
      showButton: false,
      label: 'Add Booking',
      action: () => alert('Add Booking clicked!'),
    },
    orders: {
      showButton: false,
      label: '',
      action: undefined,
    },
    products: {
      showButton: true,
      label: 'Add Product',
      action: () => globalContext.setShowAddProductModal(true),
    },
    services: {
      showButton: true,
      label: 'Add Service',
      action: () => globalContext.setshowAddServicesModal(true),
    },
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'bookings':
        return <BookingsPage />;
      case 'availability':
        return <AvailabilityPage />;
      case 'orders':
        return <OrdersPage />;
      case 'products':
        return <ProductsPage />;
      case 'services':
        return <ServicesPage />;
      default:
        return <BookingsPage />;
    }
  };
  return (
    <div className=" md:flex min-h-screen bg-slate-50">
      <Sidebar
        currentPage={currentPage}
        setPage={setCurrentPage}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="p-3 grow">
        <div className="md:hidden z-30 bg-white border-b border-slate-200  py-4 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className=" text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-bold text-slate-900 capitalize">{currentPage}</h2>
          <div className="w-10" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <div className="flex justify-between items-center mb-8 pt-6 pb-2 border-b-3">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{header}</h2>
                <p className="text-slate-600">{subHeader}</p>
              </div>
              {pageConfig[currentPage]?.showButton && (
                <button
                  onClick={pageConfig[currentPage]?.action}
                  className="flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-all"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  {pageConfig[currentPage]?.label}
                </button>
              )}
            </div>
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
