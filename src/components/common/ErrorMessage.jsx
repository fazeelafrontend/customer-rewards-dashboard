import PropTypes from 'prop-types';
import { BUTTON_LABELS, ERROR_GENERIC } from '../../constants/messages';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container" id="error-message">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Oops! Something went wrong</h3>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button
          className="error-retry-btn"
          onClick={onRetry}
          id="retry-button"
        >
          {BUTTON_LABELS.RETRY}
        </button>
      )}
    </div>
  );
};

ErrorMessage.propTypes = {
  /** The error message string to display */
  message: PropTypes.string,
  /** Optional callback function for the retry button */
  onRetry: PropTypes.func,
};

ErrorMessage.defaultProps = {
  message: ERROR_GENERIC,
  onRetry: null,
};

export default ErrorMessage;
