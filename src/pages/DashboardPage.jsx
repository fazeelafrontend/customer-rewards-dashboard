import { useState, useMemo, useCallback } from 'react';
import useTransactions from '../hooks/useTransactions';
import CustomerList from '../components/customer/CustomerList';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import {
  DEFAULT_PAGE,
  ITEMS_PER_PAGE,
  SORT_OPTIONS,
  SORT_LABELS,
} from '../constants/appConstants';
import { PAGE_TITLES, LOADING_TRANSACTIONS } from '../constants/messages';
import logger from '../utils/logger';

const DashboardPage = () => {
  const { customers, loading, error, retry } = useTransactions();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NAME_ASC);

  /** Filter customers by search term (name or ID) */
  const filteredCustomers = useMemo(() => {
    if (!searchTerm.trim()) return customers;

    const lowerSearch = searchTerm.toLowerCase();
    return customers.filter(
      (c) =>
        c.customerName.toLowerCase().includes(lowerSearch) ||
        c.customerId.toLowerCase().includes(lowerSearch)
    );
  }, [customers, searchTerm]);

  /** Sort filtered customers based on selected sort option */
  const sortedCustomers = useMemo(() => {
    const sorted = [...filteredCustomers];

    switch (sortBy) {
      case SORT_OPTIONS.NAME_ASC:
        sorted.sort((a, b) => a.customerName.localeCompare(b.customerName));
        break;
      case SORT_OPTIONS.NAME_DESC:
        sorted.sort((a, b) => b.customerName.localeCompare(a.customerName));
        break;
      case SORT_OPTIONS.REWARDS_ASC:
        sorted.sort((a, b) => a.totalRewards - b.totalRewards);
        break;
      case SORT_OPTIONS.REWARDS_DESC:
        sorted.sort((a, b) => b.totalRewards - a.totalRewards);
        break;
      default:
        break;
    }

    return sorted;
  }, [filteredCustomers, sortBy]);

  /** Calculate total pages for pagination */
  const totalPages = useMemo(
    () => Math.ceil(sortedCustomers.length / ITEMS_PER_PAGE),
    [sortedCustomers.length]
  );

  /** Slice customers for current page */
  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedCustomers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedCustomers, currentPage]);

  /** Reset to page 1 when search term changes */
  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(DEFAULT_PAGE);
    logger.debug(`Dashboard: Search term changed to "${term}"`);
  }, []);

  /** Handle sort option changes */
  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
    setCurrentPage(DEFAULT_PAGE);
    logger.debug(`Dashboard: Sort changed to "${e.target.value}"`);
  }, []);

  /** Handle page navigation */
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    logger.debug(`Dashboard: Navigated to page ${page}`);
  }, []);

  // Show loader during data fetch
  if (loading) {
    return <Loader message={LOADING_TRANSACTIONS} />;
  }

  // Show error state with retry option
  if (error) {
    return <ErrorMessage message={error} onRetry={retry} />;
  }

  return (
    <div className="dashboard-page" id="dashboard-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">{PAGE_TITLES.DASHBOARD}</h1>
        <p className="dashboard-subtitle">
          {customers.length} customers • Track reward points across all transactions
        </p>
      </div>

      {/* Controls: Search and Sort */}
      <div className="dashboard-controls">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <div className="sort-control" id="sort-control">
          <label htmlFor="sort-select" className="sort-label">Sort by:</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={handleSortChange}
          >
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Customer Cards Grid */}
      <CustomerList
        customers={paginatedCustomers}
        isFiltered={searchTerm.trim().length > 0}
      />

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DashboardPage;
