/** Default page number for pagination */
export const DEFAULT_PAGE = 1;

/** Number of customer cards displayed per page on the dashboard */
export const ITEMS_PER_PAGE = 6;

/** Number of transactions per page in the transaction details view */
export const TRANSACTIONS_PER_PAGE = 5;

/** Simulated API delay in milliseconds for realistic loading states */
export const API_DELAY_MS = 800;

/** The path to the mock transaction data JSON file */
export const TRANSACTIONS_API_URL = '/data/transactions.json';

/** Number of recent months to show by default in customer breakdown */
export const DEFAULT_RECENT_MONTHS = 3;

/** Currency symbol used for formatting amounts */
export const CURRENCY_SYMBOL = '$';

/** Application title displayed in the header */
export const APP_TITLE = 'Customer Rewards Dashboard';

/** Reward thresholds used in calculations */
export const REWARD_THRESHOLDS = {
  TIER_1_MIN: 50,
  TIER_1_MAX: 100,
  TIER_1_RATE: 1,
  TIER_2_MIN: 100,
  TIER_2_RATE: 2,
};

/** Sort options for the customer dashboard */
export const SORT_OPTIONS = {
  NAME_ASC: 'name_asc',
  NAME_DESC: 'name_desc',
  REWARDS_ASC: 'rewards_asc',
  REWARDS_DESC: 'rewards_desc',
};

/** Labels for sort options displayed in the UI */
export const SORT_LABELS = {
  [SORT_OPTIONS.NAME_ASC]: 'Name (A → Z)',
  [SORT_OPTIONS.NAME_DESC]: 'Name (Z → A)',
  [SORT_OPTIONS.REWARDS_ASC]: 'Rewards (Low → High)',
  [SORT_OPTIONS.REWARDS_DESC]: 'Rewards (High → Low)',
};

export default {
  DEFAULT_PAGE,
  ITEMS_PER_PAGE,
  TRANSACTIONS_PER_PAGE,
  API_DELAY_MS,
  TRANSACTIONS_API_URL,
  DEFAULT_RECENT_MONTHS,
  CURRENCY_SYMBOL,
  APP_TITLE,
  REWARD_THRESHOLDS,
  SORT_OPTIONS,
  SORT_LABELS,
};
