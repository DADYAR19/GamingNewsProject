import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dummyNews } from '../services/dummyData';
import axios from 'axios';
import useDebounce from '../hooks/useDebounce';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY || 'demo_key';
const BASE_URL = 'https://api.rawg.io/api';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const handleSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        if (API_KEY === 'demo_key') {
          // Fallback to dummy data
          const lowercaseQuery = debouncedQuery.toLowerCase();
          const filtered = dummyNews.filter(
            (news) =>
              news.title.toLowerCase().includes(lowercaseQuery) ||
              news.category.toLowerCase().includes(lowercaseQuery)
          );
          setResults(filtered);
        } else {
          const response = await axios.get(`${BASE_URL}/games`, {
            params: {
              key: API_KEY,
              search: debouncedQuery,
              page_size: 8
            }
          });

          const formattedResults = response.data.results.map(game => ({
            id: game.id,
            title: game.name,
            category: game.genres?.[0]?.name || 'Game',
            date: game.released || 'TBA',
            imageUrl: game.background_image
          }));
          setResults(formattedResults);
        }
      } catch (err) {
        console.error('Search error:', err);
        // Silent fallback to dummy on error
        const lowercaseQuery = debouncedQuery.toLowerCase();
        setResults(dummyNews.filter(n => n.title.toLowerCase().includes(lowercaseQuery)));
      } finally {
        setIsSearching(false);
      }
    };

    handleSearch();
  }, [debouncedQuery]);

  const handleResultClick = (id) => {
    onClose();
    navigate(`/news/${id}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            id="search-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[10%] left-0 right-0 z-50 mx-auto w-full max-w-2xl px-4"
          >
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[80vh]">
              {/* Search Header */}
              <div className="flex items-center px-4 border-b border-neutral-100 dark:border-neutral-800">
                <Search className="w-6 h-6 text-neutral-400" aria-hidden="true" />
                <label htmlFor="search-input" id="search-modal-title" className="sr-only">Search News</label>
                <input
                  id="search-input"
                  ref={inputRef}
                  type="text"
                  placeholder="Search news, categories..."
                  className="w-full flex-1 bg-transparent px-4 py-6 text-lg text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  onClick={onClose}
                  aria-label="Close search"
                  className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results */}
              <div className="overflow-y-auto flex-1">
                {isSearching ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                ) : results.length > 0 ? (
                  <ul className="py-2" role="listbox">
                    {results.map((result) => (
                      <li key={result.id} role="none">
                        <button
                          role="option"
                          aria-selected="false"
                          onClick={() => handleResultClick(result.id)}
                          className="w-full text-left px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                        >
                          {result.imageUrl && (
                            <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-neutral-100 dark:border-neutral-800">
                              <img 
                                src={result.imageUrl} 
                                alt="" 
                                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="text-neutral-900 dark:text-white font-medium group-hover:text-primary transition-colors line-clamp-1">
                              {result.title}
                            </h4>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                              {result.category} • {result.date}
                            </p>
                          </div>
                          <Search className="w-4 h-4 text-neutral-300 dark:text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : query.trim() ? (
                  <div className="py-12 text-center">
                    <p className="text-neutral-500 dark:text-neutral-400">
                      No results found for "{query}"
                    </p>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-neutral-400 dark:text-neutral-500 text-sm">
                      Start typing to search games and articles
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
