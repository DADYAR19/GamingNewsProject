import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Info, Star } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const FeaturedHero = ({ games, isLoading }) => {
  if (isLoading || !games || games.length === 0) {
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

  return (
    <div className="relative w-full h-[70vh] rounded-3xl overflow-hidden mb-12 group shadow-2xl FeaturedHero-Swiper-Container">
      {/* Custom Styles override for Swiper Pagination */}
      <style dangerouslySetInnerHTML={{__html: `
        .FeaturedHero-Swiper-Container .swiper-pagination-bullet {
          background-color: rgba(255, 255, 255, 0.5);
          width: 10px;
          height: 10px;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .FeaturedHero-Swiper-Container .swiper-pagination-bullet-active {
          background-color: #fff;
          width: 24px;
          border-radius: 5px;
        }
      `}} />

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        allowTouchMove={true}
        className="w-full h-full"
      >
        {games.map(game => {
          const title = game.name || game.title;
          const imageUrl = game.background_image || game.imageUrl;
          const rating = game.rating || 0;
          const platforms = game.platforms?.slice(0, 3) || [];

          return (
            <SwiperSlide key={game.id} className="w-full h-full relative">
              {({ isActive }) => (
                <Link to={`/news/${game.id}`} className="block w-full h-full relative overflow-hidden group/slide">
                  {/* Background Image */}
                  <div className="absolute inset-0 w-full h-full">
                    <img 
                      src={imageUrl} 
                      alt={title} 
                      className={`w-full h-full object-cover transform transition-transform duration-[10000ms] ease-out ${isActive ? 'scale-110' : 'scale-100'}`}
                    />
                    {/* Gradients for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 pb-16">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
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

                      <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight leading-tight group-hover/slide:text-primary transition-colors">
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
                        <div 
                          className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold flex items-center gap-2 transition-all transform group-hover/slide:scale-105 shadow-lg shadow-primary/25"
                        >
                          <Play className="w-5 h-5 fill-white" />
                          View Details
                        </div>
                        <div 
                          className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold flex items-center gap-2 transition-all backdrop-blur-md border border-white/10"
                        >
                          <Info className="w-5 h-5" />
                          More Info
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </Link>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default FeaturedHero;
