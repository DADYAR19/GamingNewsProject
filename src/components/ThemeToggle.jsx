import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full overflow-hidden text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDarkMode ? 0 : 1,
          opacity: isDarkMode ? 0 : 1,
          rotate: isDarkMode ? -90 : 0,
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <Sun className="w-5 h-5 text-amber-500" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scale: isDarkMode ? 1 : 0,
          opacity: isDarkMode ? 1 : 0,
          rotate: isDarkMode ? 0 : 90,
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
        className="flex items-center justify-center pointer-events-none"
      >
        <Moon className="w-5 h-5 text-indigo-400" />
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
