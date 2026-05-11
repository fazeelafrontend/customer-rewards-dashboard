/** Loading state messages */
export const LOADING_MESSAGE = 'Loading rewards data...';
export const LOADING_TRANSACTIONS = 'Fetching transaction records...';

/** Error messages */
export const ERROR_FETCH_FAILED = 'Failed to fetch transaction data. Please try again later.';
export const ERROR_INVALID_RESPONSE = 'Received invalid data from the server.';
export const ERROR_CUSTOMER_NOT_FOUND = 'Customer not found.';
export const ERROR_GENERIC = 'Something went wrong. Please try again.';

/** Empty state messages */
export const NO_TRANSACTIONS = 'No transactions found.';
export const NO_CUSTOMERS = 'No customers available.';
export const NO_DATA_FOR_MONTH = 'No transactions for this month.';
export const NO_SEARCH_RESULTS = 'No customers match your search.';

/** Success / info messages */
export const DATA_LOADED_SUCCESS = 'Transaction data loaded successfully.';

/** Page titles and labels */
export const PAGE_TITLES = {
  DASHBOARD: 'Rewards Dashboard',
  CUSTOMER_BREAKDOWN: 'Monthly Breakdown',
  TRANSACTION_DETAILS: 'Transaction Details',
};

/** Button labels */
export const BUTTON_LABELS = {
  BACK: '← Back',
  VIEW_DETAILS: 'View Details',
  VIEW_TRANSACTIONS: 'View Transactions',
  RETRY: 'Retry',
  PREVIOUS: '← Previous',
  NEXT: 'Next →',
};

/** Table headers */
export const TABLE_HEADERS = {
  TRANSACTION_ID: 'Transaction ID',
  DATE: 'Date',
  AMOUNT: 'Amount',
  REWARD_POINTS: 'Reward Points',
};

/** Search placeholder */
export const SEARCH_PLACEHOLDER = 'Search customers by name or ID...';

export default {
  LOADING_MESSAGE,
  LOADING_TRANSACTIONS,
  ERROR_FETCH_FAILED,
  ERROR_INVALID_RESPONSE,
  ERROR_CUSTOMER_NOT_FOUND,
  ERROR_GENERIC,
  NO_TRANSACTIONS,
  NO_CUSTOMERS,
  NO_DATA_FOR_MONTH,
  NO_SEARCH_RESULTS,
  DATA_LOADED_SUCCESS,
  PAGE_TITLES,
  BUTTON_LABELS,
  TABLE_HEADERS,
  SEARCH_PLACEHOLDER,
};
