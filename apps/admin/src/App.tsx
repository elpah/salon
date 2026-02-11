import { lazy, Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext, initialUser, type IUser } from './context/GlobalContext';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/Loading';
import { onAuthStateChanged, type User, signOut } from 'firebase/auth';
import { auth } from './firebase.ts';
import useGetUser from './hooks/useGetUser.ts';

const AdminLayout = lazy(() => import('./pages/AdminLayout'));
const BookingsPage = lazy(() => import('./pages/BookingsPage'));
const AvailabilityPage = lazy(() => import('./pages/AvailabilityPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddServicesModal, setShowAddServicesModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loggedUser, setLoggedUser] = useState<IUser>(initialUser);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [pathname]);

  const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 min
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data } = useGetUser(authUser?.uid || '', authUser?.email || '');
  useEffect(() => {
    if (data) setLoggedUser(data);
  }, [data]);

  const resetTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);

    inactivityTimer.current = setTimeout(() => {
      if (auth.currentUser) {
        signOut(auth)
          .then(() => console.log('User logged out due to inactivity'))
          .catch((error: unknown) => console.error(error));
        navigate('/login');
      }
    }, INACTIVITY_LIMIT);
  }, [navigate, INACTIVITY_LIMIT]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        // const token = await user.getIdToken();
        // console.log('Token:', token);

        setAuthUser(user);
        setAuthLoading(false);
        resetTimer();
      } else {
        setAuthUser(null);
        setAuthLoading(false);
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        navigate('/login');
      }
    });

    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'] as const;
    events.forEach(event => window.addEventListener(event, resetTimer));

    return () => {
      unsubscribe();
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [navigate, resetTimer]);

  if (authLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

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
        authUser,
        setAuthUser,
        authLoading,
        setAuthLoading,
        loggedUser,
        setLoggedUser,
      }}
    >
      <div className="app-container">
        <div className="content">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
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
