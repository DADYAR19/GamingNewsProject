import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import NewsCard from './NewsCard';
import LoadingSkeleton from './LoadingSkeleton';

const HomeSection = ({ title, data, isLoading, seeAllPath, limit = 4 }) => {
  const displayData = data ? data.slice(0, limit) : [];

  return (
    <section className="mb-16 last:mb-0">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative">
          <h2 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight uppercase italic">
            {title}
          </h2>
          <div className="absolute -bottom-2 left-0 w-12 h-1.5 bg-primary rounded-full"></div>
        </div>

        {seeAllPath && (
          <Link 
            to={seeAllPath}
            className="group flex items-center gap-1 text-primary font-bold text-sm tracking-widest uppercase hover:text-primary-hover transition-colors"
          >
            See All
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: limit }).map((_, i) => (
            <LoadingSkeleton key={`skeleton-${title}-${i}`} />
          ))
        ) : (
          displayData.map((game, index) => (
            <NewsCard key={`${game.id}-${title}`} news={game} index={index} />
          ))
        )}
      </div>
    </section>
  );
};

export default HomeSection;
