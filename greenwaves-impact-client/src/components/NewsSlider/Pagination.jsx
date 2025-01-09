import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const pages = [];
  for (let i = 1; i < totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center gap-2 mt-8">
      {pages.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-400 transition`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
