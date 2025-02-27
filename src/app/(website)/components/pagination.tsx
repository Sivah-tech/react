"use client";

import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }:{[key:string]:any}) => {
  const handlePageChange = (page:any) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination mt-4 flex justify-center space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-300 px-4 py-2 rounded-md"
      >
        Prev
      </button>
      <span>{currentPage} / {totalPages}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-gray-300 px-4 py-2 rounded-md"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
