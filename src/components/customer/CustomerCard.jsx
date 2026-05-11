import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { CURRENCY_SYMBOL } from '../../constants/appConstants';
import { BUTTON_LABELS } from '../../constants/messages';

const CustomerCard = ({ customer }) => {
  const navigate = useNavigate();

  /** Navigate to the customer's monthly breakdown page */
  const handleViewDetails = useCallback(() => {
    navigate(`/customer/${customer.customerId}`);
  }, [navigate, customer.customerId]);

  return (
    <div className="customer-card" id={`customer-card-${customer.customerId}`}>
      {/* Customer avatar with initials */}
      <div className="customer-card-avatar">
        {customer.customerName.charAt(0).toUpperCase()}
      </div>

      <div className="customer-card-body">
        <h3 className="customer-card-name">{customer.customerName}</h3>
        <span className="customer-card-id">ID: {customer.customerId}</span>

        <div className="customer-card-stats">
          <div className="stat-item">
            <span className="stat-label">Total Rewards</span>
            <span className="stat-value rewards">{customer.totalRewards} pts</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Spent</span>
            <span className="stat-value spent">
              {CURRENCY_SYMBOL}{customer.totalSpent.toFixed(2)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Transactions</span>
            <span className="stat-value">{customer.transactionCount}</span>
          </div>
        </div>
      </div>

      <button
        className="customer-card-btn"
        onClick={handleViewDetails}
        id={`view-details-${customer.customerId}`}
      >
        {BUTTON_LABELS.VIEW_DETAILS}
      </button>
    </div>
  );
};

CustomerCard.propTypes = {
  /** Customer summary data object */
  customer: PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    totalRewards: PropTypes.number.isRequired,
    totalSpent: PropTypes.number.isRequired,
    transactionCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default CustomerCard;
