import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { BUTTON_LABELS } from '../../constants/messages';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Don't render pagination for 0 or 1 total pages
  if (totalPages <= 1) return null;

  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    // Adjust start if we're near the end
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  /** Navigate to the previous page */
  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  /** Navigate to the next page */
  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  return (
    <div className="pagination" id="pagination-controls">
      <button
        className="pagination-btn"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        id="pagination-prev"
      >
        {BUTTON_LABELS.PREVIOUS}
      </button>

      <div className="pagination-pages">
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`pagination-page-btn ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
            id={`pagination-page-${page}`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="pagination-btn"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        id="pagination-next"
      >
        {BUTTON_LABELS.NEXT}
      </button>
    </div>
  );
};

Pagination.propTypes = {
  /** Currently active page number (1-indexed) */
  currentPage: PropTypes.number.isRequired,
  /** Total number of pages available */
  totalPages: PropTypes.number.isRequired,
  /** Callback invoked with the new page number when navigating */
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
