import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import NewsCard from '../components/NewsCard';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1440px] mx-auto py-8 px-4 sm:px-6 lg:px-10"
    >
      {/* Header */}
      <header className="mb-12">
        <Link to="/" className="inline-flex items-center text-neutral-500 hover:text-primary font-medium mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to Explore
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Heart className="w-8 h-8 text-primary fill-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-neutral-900 dark:text-white">My Wishlist</h1>
            <p className="text-neutral-500 dark:text-neutral-400 mt-1">
              {wishlist.length} {wishlist.length === 1 ? 'game' : 'games'} saved for later
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((game, index) => (
            <NewsCard key={game.id} news={game} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl">
          <div className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-6 text-neutral-400">
            <Gamepad2 className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Your wishlist is empty</h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-sm mx-auto">
            You haven't added any games to your wishlist yet. Start exploring and save your favorites!
          </p>
          <Link to="/" className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/25">
            Explore Games
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default Wishlist;
