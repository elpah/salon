import { lazy, Suspense, useEffect } from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
const AdminPage = lazy(() => import('./pages/AdminPage'));

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return (
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
  );
}

export default App;
