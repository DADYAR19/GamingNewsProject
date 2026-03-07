import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main 
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export default MainLayout;
