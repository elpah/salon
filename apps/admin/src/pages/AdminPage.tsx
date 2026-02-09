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
import CategoryPage from './CategoryPage';

// --- Types ---
type AdminPage = 'bookings' | 'availability' | 'orders' | 'products' | 'services' | 'categories';

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
      case 'categories':
        setHeader('Categories');
        setSubHeader('Manage product and service categories');
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
      action: () => globalContext.setShowAddServicesModal(true),
    },
    categories: {
      showButton: true,
      label: 'Add Category',
      action: () => globalContext.setShowAddCategoryModal(true),
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
      case 'categories':
        return <CategoryPage />;
      default:
        return <BookingsPage />;
    }
  };
  return (
    <div className=" lg:flex min-h-screen bg-slate-50">
      <Sidebar
        currentPage={currentPage}
        setPage={setCurrentPage}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="p-3 grow">
        <div className="lg:hidden z-30 bg-white border-b border-slate-200  py-4 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
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
                  className="cursor-pointer flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-all"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  {pageConfig[currentPage]?.label}
                </button>
              )}
            </div>
            {/*
            // Future Improvement
             {currentPage === 'products' && (
              <div className="w-full max-w-xl mx-auto mb-5">
                <div className="flex w-full rounded-xl bg-gray-100 p-1">
                  <button
                    onClick={() => setSelected('available')}
                    className={`cursor-pointer w-1/2 rounded-lg py-2 text-sm font-medium transition
                    ${
                      selected === 'available'
                        ? 'bg-white text-gray-900 shadow'
                        : 'text-gray-500 hover:text-gray-700'
                    }
                     `}
                  >
                    Available
                  </button>

                  <button
                    onClick={() => setSelected('deleted')}
                    className={`cursor-pointer w-1/2 rounded-lg py-2 text-sm font-medium transition
                     ${
                       selected === 'deleted'
                         ? 'bg-white text-gray-900 shadow'
                         : 'text-gray-500 hover:text-gray-700'
                     }
                       `}
                  >
                    Deleted
                  </button>
                </div>
              </div>
            )} */}
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
