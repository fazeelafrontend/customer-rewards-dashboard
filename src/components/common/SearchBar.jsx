import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { SEARCH_PLACEHOLDER } from '../../constants/messages';

const SearchBar = ({ searchTerm, onSearchChange, placeholder }) => {
  /** Handles input changes and passes value to parent */
  const handleChange = useCallback(
    (e) => {
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );

  /** Clears the search input */
  const handleClear = useCallback(() => {
    onSearchChange('');
  }, [onSearchChange]);

  return (
    <div className="search-bar" id="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          id="search-input"
          aria-label="Search customers"
        />
        {searchTerm && (
          <button
            className="search-clear-btn"
            onClick={handleClear}
            id="search-clear"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  /** Current search term value */
  searchTerm: PropTypes.string.isRequired,
  /** Callback invoked with the new search term string */
  onSearchChange: PropTypes.func.isRequired,
  /** Placeholder text for the input field */
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: SEARCH_PLACEHOLDER,
};

export default SearchBar;
