import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Scissors, X, Menu } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('/')}>
            <Scissors
              className={`h-8 w-8 ${location.pathname !== '/' || isScrolled ? 'text-rose-600' : 'text-white'}`}
            />
            <span
              className={`hidden lg:inline ml-2 text-2xl font-serif font-bold tracking-tight ${
                location.pathname !== '/' || isScrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              Professional Hair Stylist
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            {NAV_LINKS.map(link => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`cursor-pointer text-sm font-medium uppercase tracking-wider transition-colors ${
                  location.pathname === link.path
                    ? isScrolled
                      ? 'text-rose-600'
                      : 'text-rose-400'
                    : location.pathname === '/'
                      ? isScrolled
                        ? 'text-slate-600 hover:text-rose-600'
                        : 'text-slate-100 hover:text-white'
                      : 'text-slate-600 hover:text-rose-600'
                }`}
              >
                {link.name}
              </button>
            ))}

            <button
              onClick={() => handleNavClick('/book-appointment')}
              className={`cursor-pointer px-6 py-2 rounded-full font-medium transition-all ${
                location.pathname !== '/' || isScrolled
                  ? 'bg-rose-600 text-white hover:bg-rose-700'
                  : 'bg-white text-rose-600 hover:bg-rose-50'
              }`}
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(prev => !prev)}
              className={location.pathname !== '/' || isScrolled ? 'text-slate-900' : 'text-white'}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {NAV_LINKS.map(link => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path)}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-slate-700 border-b border-slate-50 last:border-0"
                >
                  {link.name}
                </button>
              ))}

              <button
                onClick={() => handleNavClick('/book-appointment')}
                className="block w-full text-left px-3 py-4 text-base font-medium text-slate-700 border-b border-slate-50 last:border-0"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
