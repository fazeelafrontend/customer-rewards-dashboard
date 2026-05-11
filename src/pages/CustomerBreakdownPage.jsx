import { useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useTransactions from '../hooks/useTransactions';
import CustomerSummary from '../components/customer/CustomerSummary';
import MonthlyBreakdownCard from '../components/transaction/MonthlyBreakdownCard';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { getMonthlyBreakdown, getRecentMonthKeys } from '../services/rewardService';
import { PAGE_TITLES, BUTTON_LABELS, LOADING_TRANSACTIONS, ERROR_CUSTOMER_NOT_FOUND, NO_TRANSACTIONS } from '../constants/messages';
import logger from '../utils/logger';

const CustomerBreakdownPage = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { customers, loading, error, retry } = useTransactions();

  /** Find the customer matching the route parameter */
  const customer = useMemo(() => {
    const found = customers.find((c) => c.customerId === customerId);
    if (!found && customers.length > 0) {
      logger.warn(`Customer not found: ${customerId}`);
    }
    return found;
  }, [customers, customerId]);

  const recentMonths = useMemo(() => getRecentMonthKeys(customers), [customers]);

  /** Get the 3-month window, filling gaps with empty placeholders */
  const monthlyData = useMemo(() => {
    if (!customer) return [];
    return recentMonths.map(
      (month) =>
        customer.monthlyBreakdown[month] ?? {
          month,
          totalRewards: 0,
          totalSpent: 0,
          transactionCount: 0,
          transactions: [],
          isEmpty: true,
        }
    );
  }, [customer, recentMonths]);

  /** Navigate to the transaction details page for a specific month */
  const handleViewTransactions = useCallback(
    (custId, month) => {
      const encodedMonth = encodeURIComponent(month);
      navigate(`/customer/${custId}/transactions/${encodedMonth}`);
      logger.info(`Navigating to transactions for ${custId} - ${month}`);
    },
    [navigate]
  );

  /** Navigate back to the dashboard */
  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

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
        <button className="back-btn" onClick={handleBack} id="back-to-dashboard">
          {BUTTON_LABELS.BACK}
        </button>
        <ErrorMessage message={ERROR_CUSTOMER_NOT_FOUND} />
      </div>
    );
  }

  return (
    <div className="page-container" id="breakdown-page">
      <button className="back-btn" onClick={handleBack} id="back-to-dashboard">
        {BUTTON_LABELS.BACK}
      </button>

      <h1 className="page-title">{PAGE_TITLES.CUSTOMER_BREAKDOWN}</h1>

      {/* Customer summary banner */}
      <CustomerSummary customer={customer} />

      {/* Monthly breakdown cards */}
      {monthlyData.length === 0 ? (
        <div className="empty-state" id="no-monthly-data">
          <div className="empty-state-icon">📭</div>
          <p className="empty-state-text">{NO_TRANSACTIONS}</p>
        </div>
      ) : (
        <div className="monthly-grid" id="monthly-breakdown-grid">
          {monthlyData.map((month) => (
            <MonthlyBreakdownCard
              key={month.month}
              monthData={month}
              customerId={customer.customerId}
              onViewTransactions={handleViewTransactions}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerBreakdownPage;
