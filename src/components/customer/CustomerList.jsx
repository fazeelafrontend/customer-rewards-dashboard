import PropTypes from 'prop-types';
import CustomerCard from './CustomerCard';
import { NO_CUSTOMERS, NO_SEARCH_RESULTS } from '../../constants/messages';

const CustomerList = ({ customers, isFiltered }) => {
  // Handle empty state with appropriate message
  if (!customers || customers.length === 0) {
    return (
      <div className="empty-state" id="no-customers-message">
        <div className="empty-state-icon">📋</div>
        <p className="empty-state-text">
          {isFiltered ? NO_SEARCH_RESULTS : NO_CUSTOMERS}
        </p>
      </div>
    );
  }

  return (
    <div className="customer-grid" id="customer-list">
      {customers.map((customer) => (
        <CustomerCard key={customer.customerId} customer={customer} />
      ))}
    </div>
  );
};

CustomerList.propTypes = {
  /** Array of processed customer summary objects */
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      totalRewards: PropTypes.number.isRequired,
      totalSpent: PropTypes.number.isRequired,
      transactionCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  /** Whether the list is filtered by search (changes empty state message) */
  isFiltered: PropTypes.bool,
};

CustomerList.defaultProps = {
  isFiltered: false,
};

export default CustomerList;
