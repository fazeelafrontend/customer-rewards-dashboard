import PropTypes from 'prop-types';
import { CURRENCY_SYMBOL } from '../../constants/appConstants';

const CustomerSummary = ({ customer }) => {
  return (
    <div className="customer-summary" id={`summary-${customer.customerId}`}>
      <div className="customer-summary-avatar">
        {customer.customerName.charAt(0).toUpperCase()}
      </div>
      <div className="customer-summary-info">
        <h2 className="customer-summary-name">{customer.customerName}</h2>
        <span className="customer-summary-id">ID: {customer.customerId}</span>
      </div>
      <div className="customer-summary-stats">
        <div className="summary-stat">
          <span className="summary-stat-value">{customer.totalRewards}</span>
          <span className="summary-stat-label">Total Points</span>
        </div>
        <div className="summary-stat">
          <span className="summary-stat-value">
            {CURRENCY_SYMBOL}{customer.totalSpent.toFixed(2)}
          </span>
          <span className="summary-stat-label">Total Spent</span>
        </div>
        <div className="summary-stat">
          <span className="summary-stat-value">{customer.transactionCount}</span>
          <span className="summary-stat-label">Transactions</span>
        </div>
      </div>
    </div>
  );
};

CustomerSummary.propTypes = {
  /** Complete customer data object with totals */
  customer: PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    totalRewards: PropTypes.number.isRequired,
    totalSpent: PropTypes.number.isRequired,
    transactionCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default CustomerSummary;
