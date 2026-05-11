import PropTypes from 'prop-types';
import { formatDate } from '../../utils/dateUtils';
import { CURRENCY_SYMBOL } from '../../constants/appConstants';

const TransactionCard = ({ transaction }) => {
  return (
    <div className="transaction-card" id={`txn-${transaction.transactionId}`}>
      <div className="transaction-card-row">
        <span className="transaction-label">Transaction ID</span>
        <span className="transaction-value">{transaction.transactionId}</span>
      </div>
      <div className="transaction-card-row">
        <span className="transaction-label">Date</span>
        <span className="transaction-value">{formatDate(transaction.date)}</span>
      </div>
      <div className="transaction-card-row">
        <span className="transaction-label">Amount</span>
        <span className="transaction-value amount">
          {CURRENCY_SYMBOL}{transaction.amount.toFixed(2)}
        </span>
      </div>
      <div className="transaction-card-row">
        <span className="transaction-label">Reward Points</span>
        <span className="transaction-value points">
          {transaction.rewardPoints} pts
        </span>
      </div>
    </div>
  );
};

TransactionCard.propTypes = {
  /** Transaction data object with computed reward points */
  transaction: PropTypes.shape({
    transactionId: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    rewardPoints: PropTypes.number.isRequired,
  }).isRequired,
};

export default TransactionCard;
