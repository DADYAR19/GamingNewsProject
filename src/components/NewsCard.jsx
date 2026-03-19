import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

const NewsCard = ({ news, index }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(news.id);
  
  // Normalize data for both RAWG API and Dummy formats
  const title = news.name || news.title || 'Untitled Game';
  const imageUrl = news.background_image || news.imageUrl;
  const description = news.description_raw || news.excerpt || '';
  const category = news.genres?.[0]?.name || news.category || 'Game';
  const platforms = news.platforms?.map(p => typeof p === 'string' ? p : p.platform.name) || [];
  const metacritic = news.metacritic;

  const [imgSrc, setImgSrc] = React.useState(imageUrl);
  const fallbackImg = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop";

  React.useEffect(() => {
    setImgSrc(imageUrl);
  }, [imageUrl]);

  return (
    <div className="h-full">
      <Link to={`/news/${news.id}`} className="group block h-full">
        <motion.article 
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex flex-col h-full bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-primary/5 border border-neutral-100 dark:border-neutral-700/50"
        >
          {/* Image Container */}
          <div className="relative h-56 w-full overflow-hidden">
            <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src={imgSrc}
              alt={news.title}
              loading="lazy"
              onError={() => setImgSrc(fallbackImg)}
              className="w-full h-full object-cover"
            />
            {/* Wishlist Toggle */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(news);
              }}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition-all group/heart"
            >
              <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-white group-hover/heart:text-red-500'}`} />
            </button>

            {/* Category Tag */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                {category}
              </span>
            </div>
          </div>

          {/* Content Container */}
          <div className="flex flex-col flex-grow p-6">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            
            <p className="text-neutral-600 dark:text-neutral-400 mb-4 flex-grow line-clamp-3">
              {description}
            </p>

            {/* Read More Button */}
            <div className="mb-6">
              <span className="text-primary font-medium hover:text-primary-hover transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary-hover after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">
                Read more →
              </span>
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-700/50">
              <div className="flex flex-wrap gap-1 max-w-[70%]">
                {platforms.slice(0, 3).map(p => (
                  <span key={p} className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                    {p}
                  </span>
                ))}
                {platforms.length > 3 && <span className="text-[10px] text-neutral-400">+{platforms.length - 3}</span>}
              </div>
              {metacritic && (
                <div className={`px-2 py-1 rounded text-xs font-black ${
                  metacritic >= 75 ? 'bg-green-500/10 text-green-500' : 
                  metacritic >= 50 ? 'bg-yellow-500/10 text-yellow-500' : 
                  'bg-red-500/10 text-red-500'
                } border border-current/20`}>
                  {metacritic}
                </div>
              )}
            </div>
          </div>
        </motion.article>
      </Link>
    </div>
  );
};

export default NewsCard;
