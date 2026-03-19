import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Gamepad2, Flame, Star, Trophy, Clock, TrendingUp,
  Swords, Target, Wand2, Map, Car, Dumbbell, Grab, Puzzle,
  LayoutGrid, Cpu, Zap, Laugh, Sparkles, Music2
} from 'lucide-react';

const SideDrawer = ({ isOpen, onClose }) => {
  const location = useLocation();

  const discoverLinks = [
    { name: 'Newest Releases', path: '/discover/newest', icon: Flame },
    { name: 'Top Rated', path: '/discover/top', icon: Star },
    { name: 'Game of the Year', path: '/discover/goty', icon: Trophy },
    { name: 'Coming Soon', path: '/discover/coming-soon', icon: Clock },
    { name: 'Most Anticipated', path: '/discover/anticipated', icon: TrendingUp },
  ];

  const categories = [
    { name: 'Action', path: '/genre/action', icon: Swords },
    { name: 'Shooter', path: '/genre/shooter', icon: Target },
    { name: 'RPG', path: '/genre/role-playing-games-rpg', icon: Wand2 },
    { name: 'Adventure', path: '/genre/adventure', icon: Map },
    { name: 'Racing', path: '/genre/racing', icon: Car },
    { name: 'Sports', path: '/genre/sports', icon: Dumbbell },
    { name: 'Fighting', path: '/genre/fighting', icon: Grab },
    { name: 'Puzzle', path: '/genre/puzzle', icon: Puzzle },
    { name: 'Strategy', path: '/genre/strategy', icon: LayoutGrid },
    { name: 'Simulation', path: '/genre/simulation', icon: Cpu },
    { name: 'Platformer', path: '/genre/platformer', icon: Zap },
    { name: 'Arcade', path: '/genre/arcade', icon: Music2 },
    { name: 'Casual', path: '/genre/casual', icon: Laugh },
    { name: 'Indie', path: '/genre/indie', icon: Sparkles },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.aside
            key="drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 dark:border-neutral-800">
              <Link to="/" onClick={onClose} className="flex items-center gap-2">
                <Gamepad2 className="w-7 h-7 text-primary" />
                <span className="font-bold text-lg tracking-tight text-neutral-900 dark:text-white">
                  Game<span className="text-primary">News</span>
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">

              {/* Discover Section */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 px-2">
                  Discover
                </p>
                <nav className="space-y-1">
                  {discoverLinks.map(({ name, path, icon: Icon }) => {
                    const isActive = location.pathname === path;
                    return (
                      <Link
                        key={name}
                        to={path}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 hover:text-primary dark:hover:text-primary'
                        }`}
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary' : 'text-neutral-400 group-hover:text-primary transition-colors'}`} />
                        {name}
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Separator */}
              <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

              {/* Categories Section */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 px-2">
                  Categories
                </p>
                <nav className="space-y-1">
                  {categories.map(({ name, path, icon: Icon }) => {
                    const isActive = location.pathname === path;
                    return (
                      <Link
                        key={name}
                        to={path}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 hover:text-primary dark:hover:text-primary'
                        }`}
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary' : 'text-neutral-400 group-hover:text-primary transition-colors'}`} />
                        {name}
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-neutral-100 dark:border-neutral-800">
              <p className="text-xs text-neutral-400 dark:text-neutral-600 text-center">
                Powered by RAWG API
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideDrawer;
