import { useState, useMemo } from 'react';

const usePagination = ({ totalItems, itemsPerPage = 24, initialPage = 1 }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // For server-side pagination, we just need the page number.
  // We keep this for backward compatibility or small local lists.
  const currentData = (sourceData) => {
    if (!sourceData || sourceData.length <= itemsPerPage) return sourceData;
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sourceData.slice(start, end);
  };

  const changePage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages || 1));
    setCurrentPage(pageNumber);
  };

  const nextPage = () => changePage(currentPage + 1);
  const prevPage = () => changePage(currentPage - 1);

  return {
    currentPage,
    totalPages,
    changePage,
    nextPage,
    prevPage,
    currentData
  };
};

export default usePagination;
