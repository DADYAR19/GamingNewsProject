import { Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300 flex flex-col">
      <Navbar />
      <div className="flex-grow overflow-hidden">
        <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 py-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Suspense fallback={
                <div className="flex justify-center items-center min-h-[60vh]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              }>
                <Outlet />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
