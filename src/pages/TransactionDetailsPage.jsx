import { useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useTransactions from '../hooks/useTransactions';
import CustomerSummary from '../components/customer/CustomerSummary';
import TransactionList from '../components/transaction/TransactionList';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { CURRENCY_SYMBOL } from '../constants/appConstants';
import {
  PAGE_TITLES,
  BUTTON_LABELS,
  LOADING_TRANSACTIONS,
  ERROR_CUSTOMER_NOT_FOUND,
  NO_DATA_FOR_MONTH,
} from '../constants/messages';
import logger from '../utils/logger';

const TransactionDetailsPage = () => {
  const { customerId, month } = useParams();
  const decodedMonth = decodeURIComponent(month);
  const navigate = useNavigate();
  const { customers, loading, error, retry } = useTransactions();

  /** Find the customer matching the route parameter */
  const customer = useMemo(() => {
    return customers.find((c) => c.customerId === customerId) || null;
  }, [customers, customerId]);

  /** Get transaction data for the selected month */
  const monthData = useMemo(() => {
    if (!customer || !customer.monthlyBreakdown) return null;
    return customer.monthlyBreakdown[decodedMonth] || null;
  }, [customer, decodedMonth]);

  /** Get transactions sorted by date (most recent first) */
  const sortedTransactions = useMemo(() => {
    if (!monthData || !monthData.transactions) return [];
    return [...monthData.transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [monthData]);

  /** Navigate back to the customer breakdown page */
  const handleBack = useCallback(() => {
    navigate(`/customer/${customerId}`);
    logger.info(`Navigating back to breakdown for ${customerId}`);
  }, [navigate, customerId]);

  // Loading state
  if (loading) {
    return <Loader message={LOADING_TRANSACTIONS} />;
  }

  // API error state
  if (error) {
    return <ErrorMessage message={error} onRetry={retry} />;
  }

  // Customer not found
  if (!customer) {
    return (
      <div className="page-container">
        <button className="back-btn" onClick={handleBack} id="back-to-breakdown">
          {BUTTON_LABELS.BACK}
        </button>
        <ErrorMessage message={ERROR_CUSTOMER_NOT_FOUND} />
      </div>
    );
  }

  return (
    <div className="page-container" id="transaction-details-page">
      <button className="back-btn" onClick={handleBack} id="back-to-breakdown">
        {BUTTON_LABELS.BACK}
      </button>

      <h1 className="page-title">{PAGE_TITLES.TRANSACTION_DETAILS}</h1>

      {/* Customer summary banner */}
      <CustomerSummary customer={customer} />

      {/* Month header with totals */}
      <div className="month-detail-header" id="month-detail-header">
        <h2 className="month-detail-title">{decodedMonth}</h2>
        {monthData && (
          <div className="month-detail-stats">
            <span className="month-detail-stat">
              <strong>{monthData.totalRewards}</strong> pts earned
            </span>
            <span className="month-detail-stat">
              <strong>{CURRENCY_SYMBOL}{monthData.totalSpent.toFixed(2)}</strong> spent
            </span>
            <span className="month-detail-stat">
              <strong>{monthData.transactionCount}</strong> transaction{monthData.transactionCount !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Transaction cards or empty state */}
      {!monthData || sortedTransactions.length === 0 ? (
        <div className="empty-state" id="no-month-transactions">
          <div className="empty-state-icon">📭</div>
          <p className="empty-state-text">{NO_DATA_FOR_MONTH}</p>
        </div>
      ) : (
        <div className="transaction-list-scrollable">
          <TransactionList transactions={sortedTransactions} />
        </div>
      )}
    </div>
  );
};

export default TransactionDetailsPage;
