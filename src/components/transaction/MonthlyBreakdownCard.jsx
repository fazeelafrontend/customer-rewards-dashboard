import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { CURRENCY_SYMBOL } from '../../constants/appConstants';
import { BUTTON_LABELS } from '../../constants/messages';

const MonthlyBreakdownCard = ({ monthData, customerId, onViewTransactions }) => {
  const handleClick = useCallback(() => {
    onViewTransactions(customerId, monthData.month);
  }, [customerId, monthData.month, onViewTransactions]);

  const cardId = `month-card-${monthData.month.replace(/\s/g, '-')}`;

  if (monthData.isEmpty) {
    return (
      <div className="monthly-card" id={cardId}>
        <div className="monthly-card-header">
          <h3 className="monthly-card-month">{monthData.month}</h3>
        </div>
        <p className="empty-state-text">No transactions</p>
      </div>
    );
  }

  return (
    <div className="monthly-card" id={cardId}>
      <div className="monthly-card-header">
        <h3 className="monthly-card-month">{monthData.month}</h3>
        <span className="monthly-card-badge">
          {monthData.transactionCount} txn{monthData.transactionCount !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="monthly-card-stats">
        <div className="monthly-stat">
          <span className="monthly-stat-value rewards">
            {monthData.totalRewards}
          </span>
          <span className="monthly-stat-label">Reward Points</span>
        </div>
        <div className="monthly-stat">
          <span className="monthly-stat-value">
            {CURRENCY_SYMBOL}{monthData.totalSpent.toFixed(2)}
          </span>
          <span className="monthly-stat-label">Amount Spent</span>
        </div>
      </div>

      <button
        className="monthly-card-btn"
        onClick={handleClick}
        id={`view-txn-${monthData.month.replace(/\s/g, '-')}`}
      >
        {BUTTON_LABELS.VIEW_TRANSACTIONS}
      </button>
    </div>
  );
};

MonthlyBreakdownCard.propTypes = {
  monthData: PropTypes.shape({
    month: PropTypes.string.isRequired,
    totalRewards: PropTypes.number.isRequired,
    totalSpent: PropTypes.number.isRequired,
    transactionCount: PropTypes.number.isRequired,
    isEmpty: PropTypes.bool,
  }).isRequired,
  /** Customer ID for navigation */
  customerId: PropTypes.string.isRequired,
  /** Callback when view transactions button is clicked */
  onViewTransactions: PropTypes.func.isRequired,
};

export default MonthlyBreakdownCard;