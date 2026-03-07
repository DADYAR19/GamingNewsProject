import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gamepad2, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative">
          <Gamepad2 className="w-32 h-32 text-neutral-200 dark:text-neutral-800 animate-pulse" />
          <span className="absolute inset-0 flex items-center justify-center text-6xl font-black text-primary drop-shadow-lg">
            404
          </span>
        </div>
      </motion.div>

      <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4">
        Game Over: <span className="text-primary text-neutral-800 dark:text-neutral-200">Level Not Found</span>
      </h1>
      
      <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto mb-10 leading-relaxed font-medium">
        The page you are looking for seems to have disappeared into another dimension. Let's get you back into the game!
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link 
          to="/" 
          className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-lg hover:bg-primary-hover transition-all shadow-xl shadow-primary/25 flex items-center gap-3 active:scale-95"
        >
          <Home className="w-6 h-6" />
          Return Home
        </Link>
        
        <button 
          onClick={() => window.history.back()}
          className="px-8 py-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 rounded-2xl font-black text-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all flex items-center gap-3 active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
          Go Back
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000" />
    </div>
  );
};

export default NotFound;
