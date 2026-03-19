import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import MainLayout from './layouts/MainLayout';

// Lazy loaded routes for Code Splitting
const Home = lazy(() => import('./pages/Home.jsx'));
const NewsDetail = lazy(() => import('./pages/NewsDetail.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const CategoryPage = lazy(() => import('./pages/CategoryPage.jsx'));
const Wishlist = lazy(() => import('./pages/Wishlist.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

// A simple loading fallback for suspense
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          <HashRouter>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/news/:id" element={<NewsDetail />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/genre/:genreSlug" element={<CategoryPage />} />
                  <Route path="/discover/:discoverSlug" element={<CategoryPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
          </HashRouter>
          <ToastContainer position="bottom-right" theme="colored" />
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
