import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-sm border border-neutral-100 dark:border-neutral-700/50 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-56 w-full bg-neutral-200 dark:bg-neutral-700" />
      
      {/* Content Skeleton */}
      <div className="flex flex-col flex-grow p-6">
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-4" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full mb-2" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full mb-2" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3 mb-6" />
        
        {/* Button Skeleton */}
        <div className="mb-6">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24" />
        </div>

        {/* Meta Info Skeleton */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-700/50">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-20" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-20" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
