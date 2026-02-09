import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Package, Briefcase, LogOut, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type AdminPage = 'bookings' | 'availability' | 'orders' | 'products' | 'services'|'categories';

const menuItems: { id: AdminPage; icon: LucideIcon; label: string }[] = [
  { id: 'bookings', icon: Calendar, label: 'Bookings' },
  { id: 'availability', icon: Clock, label: 'Availability' },
  { id: 'orders', icon: Package, label: 'Orders' },
  { id: 'products', icon: Package, label: 'Products' },
  { id: 'services', icon: Briefcase, label: 'Services' },
    { id: 'categories', icon: Briefcase, label: 'Categories' },

];

const Sidebar = ({
  currentPage,
  setPage,
  onLogout,
  isOpen,
  onClose,
}: {
  currentPage: AdminPage;
  setPage: (p: AdminPage) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuItemClick = (page: AdminPage) => {
    setPage(page);
    if (isMobile) {
      onClose();
    }
  };

  return (
    <>
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: isOpen || !isMobile ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`
    fixed top-0 left-0 h-full w-60  lg:w-80 bg-slate-900 text-white flex flex-col z-50
    lg:sticky md:top-0 md:min-h-screen
  `}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold">Admin Panel</h1>
            <p className="text-slate-400 text-sm mt-1">Manage your salon</p>
          </div>
          {isMobile && (
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <X className="h-6 w-6" />
            </button>
          )}
        </div>
        <nav className="flex-1 py-6">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuItemClick(item.id)}
                className={`cursor-pointer w-full flex items-center px-6 py-3 transition-colors ${
                  currentPage === item.id
                    ? 'bg-rose-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <button
          onClick={onLogout}
          className="cursor-pointer flex items-center px-6 py-4 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors border-t border-slate-800"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </motion.div>
    </>
  );
};

export default Sidebar;
