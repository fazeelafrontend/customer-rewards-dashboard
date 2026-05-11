import PropTypes from 'prop-types';
import { LOADING_MESSAGE } from '../../constants/messages';

const Loader = ({ message }) => {
  return (
    <div className="loader-container" id="loader">
      <div className="loader-spinner" />
      <p className="loader-text">{message}</p>
    </div>
  );
};

Loader.propTypes = {
  /** The message to display below the spinner */
  message: PropTypes.string,
};

Loader.defaultProps = {
  message: LOADING_MESSAGE,
};

export default Loader;
