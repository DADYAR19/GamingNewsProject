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
    }
    
    return params;
  }, [genreSlug, discoverSlug, page]);

  const { data: newsData, count, isLoading, error } = useFetchNews(apiParams);

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
    <>
      {/* Hero Section */}
      <section aria-labelledby="category-hero-heading" className="flex flex-col items-center justify-center py-12 mb-12">
        <h1 id="category-hero-heading" className="text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight sm:text-5xl md:text-6xl text-center mb-6">
          <span className="text-primary">{title}</span>
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 text-center max-w-2xl">
          Discover the top {title.toLowerCase()} from across the gaming landscape.
        </p>
      </section>

      {/* Main Content Section */}
      <section aria-labelledby="category-news-heading">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[500px]">
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
    </>
  );
};

export default CategoryPage;
