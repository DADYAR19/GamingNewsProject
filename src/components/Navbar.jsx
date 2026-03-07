import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Menu, X, Search, LogOut, User, ChevronDown, Heart } from 'lucide-react';
import SearchModal from './SearchModal';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const categories = [
    { name: 'Action', path: '/genre/action' },
    { name: 'Shooter', path: '/genre/shooter' },
    { name: 'RPG', path: '/genre/role-playing-games-rpg' },
    { name: 'Strategy', path: '/genre/strategy' },
    { name: 'Adventure', path: '/genre/adventure' },
    { name: 'Racing', path: '/genre/racing' },
    { name: 'Sports', path: '/genre/sports' },
    { name: 'Fighting', path: '/genre/fighting' },
    { name: 'Puzzle', path: '/genre/puzzle' },
    { name: 'Platformer', path: '/genre/platformer' },
    { name: 'Simulation', path: '/genre/simulation' },
    { name: 'Arcade', path: '/genre/arcade' },
    { name: 'Casual', path: '/genre/casual' },
    { name: 'Indie', path: '/genre/indie' },
  ];
  
  const discoverLinks = [
    { name: 'Newest Releases', path: '/discover/newest' },
    { name: 'Top Rated', path: '/discover/top' },
    { name: 'Game of the Year', path: '/discover/goty' },
    { name: 'Coming Soon', path: '/discover/coming-soon' },
    { name: 'Most Anticipated', path: '/discover/anticipated' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 dark:bg-black/70 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Gamepad2 className="w-8 h-8 text-primary group-hover:text-primary-hover transition-colors" />
            </motion.div>
            <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-white">
              Game<span className="text-primary">News</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                  className="relative group py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                  {location.pathname !== link.path && (
                    <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-left" />
                  )}
                </Link>
              ))}

              {/* Categories Dropdown */}
              <div className="relative">
                <div
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  onMouseLeave={() => setIsCategoriesOpen(false)}
                  className={`flex items-center gap-1 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    categories.some(c => location.pathname === c.path)
                      ? 'text-primary'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-primary'
                  }`}
                  role="button"
                  tabIndex={0}
                >
                  Categories
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                  
                  <AnimatePresence>
                    {isCategoriesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-100 dark:border-neutral-800 py-2 overflow-hidden"
                      >
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            to={category.path}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              location.pathname === category.path
                                ? 'bg-primary/10 text-primary font-semibold'
                                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-primary dark:hover:text-primary'
                            }`}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Discover Dropdown */}
              <div className="relative">
                <div
                  onMouseEnter={() => setIsDiscoverOpen(true)}
                  onMouseLeave={() => setIsDiscoverOpen(false)}
                  className={`flex items-center gap-1 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    discoverLinks.some(c => location.pathname === c.path)
                      ? 'text-primary'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-primary'
                  }`}
                  role="button"
                  tabIndex={0}
                >
                  Discover
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDiscoverOpen ? 'rotate-180' : ''}`} />
                  
                  <AnimatePresence>
                    {isDiscoverOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-100 dark:border-neutral-800 py-2 overflow-hidden"
                      >
                        {discoverLinks.map((link) => (
                          <Link
                            key={link.name}
                            to={link.path}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              location.pathname === link.path
                                ? 'bg-primary/10 text-primary font-semibold'
                                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-primary dark:hover:text-primary'
                            }`}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 border-l border-neutral-200 dark:border-neutral-800 pl-4">
              <Link 
                to="/wishlist"
                className="relative p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`View Wishlist (${wishlistCount} items)`}
              >
                <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Open search dialog"
                aria-expanded={isSearchOpen}
                aria-controls="search-modal"
              >
                <Search className="w-5 h-5" />
              </button>
              <ThemeToggle />
              
              {/* Auth Display */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2 ml-2 pl-2 border-l border-neutral-200 dark:border-neutral-800">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <button 
                    onClick={logout}
                    className="p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="ml-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Link 
              to="/wishlist"
              className="relative p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label={`View Wishlist (${wishlistCount} items)`}
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-red-500 fill-red-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2 px-3">Menu</div>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                  className={`block px-3 py-3 rounded-md text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    location.pathname === link.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mt-4 mb-2 px-3">Discover</div>
              <div className="grid grid-cols-2 gap-2 px-1">
                {discoverLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'bg-primary/10 text-primary'
                        : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mt-4 mb-2 px-3">Categories</div>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  onClick={() => setIsOpen(false)}
                  aria-current={location.pathname === category.path ? 'page' : undefined}
                  className={`block px-3 py-3 rounded-md text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    location.pathname === category.path
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  {category.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-neutral-200 dark:border-neutral-800">
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="flex items-center w-full px-3 py-3 rounded-md text-base font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Search className="w-5 h-5 mr-3" />
                  Search News
                </button>
              </div>
              {isAuthenticated ? (
                <div className="pt-4 mt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center px-3 py-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm mr-3">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="text-neutral-900 dark:text-white font-medium">{user?.name || 'User'}</span>
                  </div>
                  <button 
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-4 mt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <Link 
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center w-full px-3 py-3 rounded-md text-base font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <User className="w-5 h-5 mr-3" />
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;
