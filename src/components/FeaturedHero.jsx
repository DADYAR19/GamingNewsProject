import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Info, Star } from 'lucide-react';

const FeaturedHero = ({ game, isLoading }) => {
  if (isLoading || !game) {
    return (
      <div className="relative w-full h-[70vh] rounded-3xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 animate-pulse mb-12">
        <div className="absolute bottom-12 left-12 space-y-4">
          <div className="h-10 w-64 bg-neutral-300 dark:bg-neutral-700 rounded-lg"></div>
          <div className="h-6 w-96 bg-neutral-300 dark:bg-neutral-700 rounded-lg"></div>
          <div className="flex gap-4">
            <div className="h-12 w-32 bg-neutral-300 dark:bg-neutral-700 rounded-lg"></div>
            <div className="h-12 w-32 bg-neutral-300 dark:bg-neutral-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  const title = game.name || game.title;
  const imageUrl = game.background_image || game.imageUrl;
  const rating = game.rating || 0;
  const platforms = game.platforms?.slice(0, 3) || [];

  return (
    <div className="relative w-full h-[70vh] rounded-3xl overflow-hidden mb-12 group shadow-2xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000"
        />
        {/* Gradients for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-widest">
              Featured Today
            </span>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span className="text-sm font-bold text-white">{rating.toFixed(1)}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6 text-neutral-300">
            {platforms.map(p => (
              <span key={typeof p === 'string' ? p : p.platform.name} className="text-sm font-medium px-2 py-0.5 border border-white/20 rounded backdrop-blur-sm">
                {typeof p === 'string' ? p : p.platform.name}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link 
              to={`/news/${game.id}`}
              className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
            >
              <Play className="w-5 h-5 fill-white" />
              View Details
            </Link>
            <button 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold flex items-center gap-2 transition-all backdrop-blur-md border border-white/10"
            >
              <Info className="w-5 h-5" />
              More Info
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedHero;
