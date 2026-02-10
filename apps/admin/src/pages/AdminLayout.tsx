import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu, Plus } from 'lucide-react';
import { GlobalContext, type IGlobalContext } from '../context/GlobalContext';

const headers: Record<string, { header: string; subHeader: string }> = {
  bookings: { header: 'Bookings', subHeader: 'Manage all client appointments' },
  availability: { header: 'Availability', subHeader: 'Manage your appointment time slots' },
  orders: { header: 'Orders', subHeader: 'Manage product orders' },
  products: { header: 'Products', subHeader: 'Manage your products inventory' },
  services: { header: 'Services', subHeader: 'Manage your salon services' },
  categories: { header: 'Categories', subHeader: 'Manage product and service categories' },
};

const pageConfig: Record<
  string,
  { showButton: boolean; label?: string; action?: (context: IGlobalContext) => void }
> = {
  bookings: { showButton: false },
  availability: {
    showButton: true,
    label: 'Add Availability',
    action: context => context.setShowAddSlotModal(true),
  },
  orders: { showButton: false },
  products: {
    showButton: true,
    label: 'Add Product',
    action: context => context.setShowAddProductModal(true),
  },
  services: {
    showButton: true,
    label: 'Add Service',
    action: context => context.setShowAddServicesModal(true),
  },
  categories: {
    showButton: true,
    label: 'Add Category',
    action: context => context.setShowAddCategoryModal(true),
  },
};

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentPage = location.pathname.split('/').pop() || 'bookings';
  const { header, subHeader } = headers[currentPage] || headers.bookings;

  const handleLogout = () => alert('Logging out...');

  return (
    <div className="lg:flex min-h-screen bg-slate-50">
      <Sidebar
        currentPage={currentPage}
        setPage={(page: string) => navigate(`/dashboard/${page}`)}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="p-3 grow">
        <div className="lg:hidden z-30 bg-white border-b border-slate-200 py-4 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-bold text-slate-900 capitalize">{currentPage}</h2>
          <div className="w-10" />
        </div>
        <div className="flex justify-between items-center mb-8 pt-6 pb-2 border-b-3">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{header}</h2>
            <p className="text-slate-600">{subHeader}</p>
          </div>

          {pageConfig[currentPage]?.showButton && (
            <button
              onClick={() => pageConfig[currentPage]?.action?.(globalContext)}
              className="cursor-pointer flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-all"
            >
              <Plus className="h-5 w-5 mr-2" />
              {pageConfig[currentPage]?.label}
            </button>
          )}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminLayout;
