import PropTypes from 'prop-types';
import TransactionCard from './TransactionCard';
import { NO_TRANSACTIONS } from '../../constants/messages';

const TransactionList = ({ transactions }) => {
  // Handle empty state
  if (!transactions || transactions.length === 0) {
    return (
      <div className="empty-state" id="no-transactions-message">
        <div className="empty-state-icon">📭</div>
        <p className="empty-state-text">{NO_TRANSACTIONS}</p>
      </div>
    );
  }

  return (
    <div className="transaction-list" id="transaction-list">
      {transactions.map((txn) => (
        <TransactionCard key={txn.transactionId} transaction={txn} />
      ))}
    </div>
  );
};

TransactionList.propTypes = {
  /** Array of transaction objects to render */
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    })
  ),
};

TransactionList.defaultProps = {
  transactions: [],
};

export default TransactionList;
