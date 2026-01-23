import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AvailabilityPage from './AvailabilityPage';
import BookingsPage from './BookingsPage';
import OrdersPage from './OrdersPage';
import ProductsPage from './ProductsPage';
import ServicesPage from './ServicesPage';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

// --- Types ---
type AdminPage = 'bookings' | 'availability' | 'orders' | 'products' | 'services';

// --- Main Admin Dashboard Component ---
export const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState<AdminPage>('bookings');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    alert('Logging out...');
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
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        currentPage={currentPage}
        setPage={setCurrentPage}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="flex-1 p-3 md:ml-64">
        <div className="md:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
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
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
