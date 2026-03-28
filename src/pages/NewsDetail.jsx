import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Clock, User, Share2, MessageSquare, 
  Star, Globe, Monitor, Trophy, Gamepad2, Info, Heart, Play, X, ShoppingCart
} from 'lucide-react';
import useGameDetail from '../hooks/useGameDetail';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useWishlist } from '../context/WishlistContext';
import { toast } from 'react-toastify';

const NewsDetail = () => {
  const { id } = useParams();
  const { game, screenshots, isLoading, error } = useGameDetail(id);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = React.useState(null);
  
  const isWishlisted = isInWishlist(parseInt(id) || id);
  
  const storeStyles = {
    'steam': { color: 'bg-[#1b2838] hover:bg-[#2a475e]', icon: <ShoppingCart className="w-4 h-4" /> },
    'epic-games': { color: 'bg-[#2a2a2a] hover:bg-[#3b3b3b]', icon: <ShoppingCart className="w-4 h-4" /> },
    'playstation-store': { color: 'bg-[#003791] hover:bg-[#0048bc]', icon: <Monitor className="w-4 h-4" /> },
    'xbox-store': { color: 'bg-[#107c10] hover:bg-[#159f15]', icon: <Monitor className="w-4 h-4" /> },
    'gog': { color: 'bg-[#65279d] hover:bg-[#7b31bf]', icon: <ShoppingCart className="w-4 h-4" /> },
    'nintendo': { color: 'bg-[#e60012] hover:bg-[#ff0014]', icon: <Gamepad2 className="w-4 h-4" /> },
    'app-store': { color: 'bg-[#0071e3] hover:bg-[#0086ff]', icon: <Monitor className="w-4 h-4" /> },
    'google-play': { color: 'bg-[#34a853] hover:bg-[#3ebf5f]', icon: <Monitor className="w-4 h-4" /> }
  };

  const handleShare = async () => {
    const shareData = {
      title: game?.name || 'Check out this game!',
      text: `Check out ${game?.name} on GameNews!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.info('Link copied to clipboard!', {
          icon: '🔗'
        });
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error sharing:', err);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="h-10 w-32 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-8" />
        <div className="h-96 w-full bg-neutral-200 dark:bg-neutral-800 rounded-2xl animate-pulse mb-8" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
          <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 px-4 text-center">
        <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
          <Info className="w-12 h-12 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">Game Not Found</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
          {error || "We couldn't retrieve the details for this game. Please check your API key or try again later."}
        </p>
        <Link to="/" className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/25">
          Return to Database
        </Link>
      </div>
    );
  }

  return (
    <div 
      className="max-w-[1440px] mx-auto py-8 px-4 sm:px-6 lg:px-10"
    >
      {/* Breadcrumb / Back */}
      <Link to="/" className="inline-flex items-center text-neutral-500 hover:text-primary font-medium mb-10 transition-colors group">
        <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Back to Explore
      </Link>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Column: Main Info */}
        <div className="lg:col-span-2 space-y-12">
          {/* Header */}
          <header>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {game.genres?.map(genre => (
                <span key={genre.id} className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-widest border border-primary/20">
                  {genre.name}
                </span>
              ))}
              {game.metacritic && (
                <span className="px-4 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold rounded-full border border-green-500/20">
                  Metascore: {game.metacritic}
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white leading-tight mb-8">
              {game.name}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-neutral-500 dark:text-neutral-400 text-sm font-medium border-y border-neutral-200 dark:border-neutral-800 py-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>Released: {new Date(game.released).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>Rating: {game.rating} / 5</span>
              </div>
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-blue-500" />
                <span>{game.playtime} Hours Playtime</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <section className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group">
            <img 
              src={game.background_image} 
              alt={game.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <p className="text-white font-medium">Developed by {game.developers?.map(d => d.name).join(', ')}</p>
            </div>
          </section>

          {/* Description */}
          <section className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-white">About the Game</h2>
            <div 
              className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-light whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: game.description }}
            />
          </section>

          {/* Screenshot Gallery */}
          {screenshots?.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-white flex items-center gap-3">
                <Monitor className="w-8 h-8 text-primary" />
                Screenshots
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {screenshots.map((snap, idx) => (
                  <motion.div 
                    key={snap.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(snap.image)}
                    className="rounded-2xl overflow-hidden aspect-video shadow-lg cursor-pointer ring-1 ring-neutral-200 dark:ring-neutral-800 hover:ring-primary transition-all bg-neutral-100 dark:bg-neutral-800"
                  >
                    <img src={snap.image} alt="Screenshot" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Meta Info Cards */}
        <aside className="space-y-8">
          {/* Action Card */}
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl shadow-xl border border-neutral-100 dark:border-neutral-700 sticky top-24">
            <h3 className="text-xl font-bold mb-6 text-neutral-900 dark:text-white">Game Details</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Platforms</p>
                <div className="flex flex-wrap gap-2">
                  {game.platforms?.map(p => (
                    <span key={p.platform.id} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-white text-xs font-semibold rounded-lg">
                      {p.platform.name}
                    </span>
                  ))}
                </div>
              </div>

              {game.stores?.length > 0 && (
                <div className="space-y-4 pt-2">
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Available On</p>
                  <div className="grid grid-cols-1 gap-2.5">
                    {game.stores.map((s) => {
                      const style = storeStyles[s.store.slug] || { color: 'bg-neutral-800 hover:bg-neutral-700', icon: <ShoppingCart className="w-4 h-4" /> };
                      const storeUrl = s.url && s.url.startsWith('http') ? s.url : `https://www.google.com/search?q=${encodeURIComponent(game.name + ' ' + s.store.name)}`;
                      
                      return (
                        <a 
                          key={s.id || s.store.id}
                          href={storeUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className={`flex items-center justify-between gap-3 w-full px-5 py-4 ${style.color} text-white rounded-2xl font-bold transition-all shadow-md active:scale-[0.98] group`}
                        >
                          <div className="flex items-center gap-3">
                            {style.icon}
                            <span className="text-sm font-bold tracking-tight">{s.store.name}</span>
                          </div>
                          <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-lg border border-white/10">Visit Store</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-700">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Publisher</p>
                <p className="text-neutral-900 dark:text-white font-medium">{game.publishers?.map(p => p.name).join(', ') || 'N/A'}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Website</p>
                {game.website ? (
                  <a 
                    href={game.website.startsWith('http') ? game.website : `https://${game.website}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline font-bold"
                  >
                    <Globe className="w-4 h-4" />
                    Official Website
                  </a>
                ) : <p className="text-neutral-500">No official site available</p>}
              </div>

              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-700">
                <button 
                  onClick={() => toggleWishlist(game)}
                  className={`w-full py-4 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 ${
                    isWishlisted 
                    ? 'bg-red-500 text-white shadow-red-500/20' 
                    : 'bg-primary text-white shadow-primary/20 hover:bg-primary-hover'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-white' : ''}`} />
                  {isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-4 pt-4">
                <button 
                  onClick={handleShare}
                  className="text-neutral-500 hover:text-primary transition-colors flex items-center gap-2 text-sm font-bold active:scale-95"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="text-neutral-500 hover:text-primary transition-colors flex items-center gap-2 text-sm font-bold">
                  <MessageSquare className="w-4 h-4" /> Discuss
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Screenshot Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center pointer-events-none"
            >
              <img 
                src={selectedImage} 
                alt="Enlarged Screenshot" 
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl pointer-events-auto cursor-zoom-out"
              />
              
              {/* Close Button UI */}
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-0 right-0 -mt-12 sm:-mt-8 sm:-mr-8 p-3 text-white/70 hover:text-white transition-colors pointer-events-auto"
                aria-label="Close Preview"
              >
                <X className="w-8 h-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsDetail;
