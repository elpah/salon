import { lazy, Suspense, useEffect } from 'react';
import { Theme } from './settings/types';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Footer from './components/Footer';
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Shop = lazy(() => import('./pages/Shop'));
const BookAppointment = lazy(() => import('./pages/BookAppointment'));

let theme: Theme = 'light';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  return (
    <div className="app-container">

    </div>
  );
}

export default App;
