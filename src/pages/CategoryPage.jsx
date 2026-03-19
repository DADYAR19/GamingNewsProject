import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import Pagination from '../components/Pagination';
import LoadingSkeleton from '../components/LoadingSkeleton';
import useFetchNews from '../hooks/useFetchNews';
import usePagination from '../hooks/usePagination';

const CategoryPage = () => {
  const { genreSlug, discoverSlug } = useParams();
  const [page, setPage] = useState(1);
  
  // Format the title from the slug
  const title = React.useMemo(() => {
    if (discoverSlug) {
      if (discoverSlug === 'newest') return 'Newest Releases';
      if (discoverSlug === 'top') return 'Top Rated Games';
      if (discoverSlug === 'goty') return 'Games of the Year';
      if (discoverSlug === 'coming-soon') return 'Coming Soon';
      if (discoverSlug === 'anticipated') return 'Most Anticipated';
      return discoverSlug.charAt(0).toUpperCase() + discoverSlug.slice(1);
    }
    
    if (!genreSlug) return 'Games';
    if (genreSlug === 'role-playing-games-rpg') return 'RPG';
    return genreSlug
      .split('-')
      .map(word => word === 'rpg' ? 'RPG' : word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, [genreSlug, discoverSlug]);

  // Map slugs to RAWG API query parameters
  const apiParams = React.useMemo(() => {
    const params = { page };
    
    if (discoverSlug) {
      const currentYear = new Date().getFullYear();
      if (discoverSlug === 'newest') {
        params.ordering = '-released';
      } else if (discoverSlug === 'top') {
        params.ordering = '-rating';
      } else if (discoverSlug === 'goty') {
        params.dates = `${currentYear}-01-01,${currentYear}-12-31`;
        params.ordering = '-rating';
      } else if (discoverSlug === 'coming-soon') {
        // Today is 2026-03-07 based on system time
        const today = new Date().toISOString().split('T')[0];
        params.dates = `${today},2027-12-31`;
        params.ordering = 'released'; // Show closest first
      } else if (discoverSlug === 'anticipated') {
        params.ordering = '-added';
      }
    } else {
      params.genres = genreSlug || 'action';
      params.ordering = '-rating';
    }
    
    return params;
  }, [genreSlug, discoverSlug, page]);

  const { data: newsData, count, isLoading, error } = useFetchNews(apiParams);

  // Get the first game's background image for the hero, or a fallback
  const heroImage = newsData?.[0]?.background_image || newsData?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop';

  const {
    currentPage,
    totalPages,
    changePage
  } = usePagination({
    totalItems: count,
    itemsPerPage: 24,
    initialPage: 1
  });

  // Keep pagination hook in sync with our page state
  useEffect(() => {
    if (currentPage !== page) {
      setPage(currentPage);
    }
  }, [currentPage, page]);

  // Reset to page 1 when category or discovery changes
  useEffect(() => {
    setPage(1);
    changePage(1);
  }, [genreSlug, discoverSlug]);

  const handlePageChange = (newPage) => {
    changePage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative -mt-8">
      {/* Cinematic Hero Section */}
      <section className="relative h-[30vh] min-h-[200px] w-full flex items-center justify-center overflow-hidden mb-12">
        {/* Background Image with Gradient Mask */}
        <div className="absolute inset-0 z-0">
          {!isLoading && (
            <>
              <img 
                src={heroImage} 
                className="w-full h-full object-cover object-[center_25%] opacity-60 dark:opacity-40 scale-105 animate-slow-zoom" 
                alt="" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-50/60 via-neutral-50/30 to-transparent dark:from-neutral-900/60 dark:via-neutral-900/30 dark:to-transparent z-10" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-50 dark:from-neutral-900 to-transparent z-20" />
            </>
          )}
        </div>

        {/* Hero Content */}
        <div className="relative z-30 text-center px-4 max-w-4xl pt-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-neutral-900 dark:text-white tracking-tighter uppercase italic drop-shadow-2xl">
            {title}
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <div className="px-4 sm:px-6 lg:px-10">
        <section aria-labelledby="category-news-heading" className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 id="category-news-heading" className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
              All {title}
            </h2>
            <div className="h-1 w-20 bg-primary mt-2 rounded-full"></div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 min-h-[500px]">
          {isLoading
            ? Array.from({ length: 12 }).map((_, index) => (
                <LoadingSkeleton key={`skeleton-${index}`} />
              ))
            : newsData.map((news, index) => (
                <NewsCard key={`${news.id}-${index}`} news={news} index={index} />
              ))}
        </div>
        
        {!isLoading && totalPages > 1 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        )}
        
        {!isLoading && newsData.length === 0 && (
          <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
            No articles found for this category yet.
          </div>
        )}
        </section>
      </div>
    </div>
  );
};

export default CategoryPage;
