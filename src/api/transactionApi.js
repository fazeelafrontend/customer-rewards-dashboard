import { TRANSACTIONS_API_URL, API_DELAY_MS } from '../constants/appConstants';
import logger from '../utils/logger';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTransactions = async () => {
  logger.info(`API call initiated: GET ${TRANSACTIONS_API_URL}`);

  try {
    // Simulate network latency for realistic UX
    await delay(API_DELAY_MS);

    const response = await fetch(TRANSACTIONS_API_URL);

    // Check for HTTP errors
    if (!response.ok) {
      const errorMsg = `HTTP error! Status: ${response.status}`;
      logger.error(`API call failed: ${errorMsg}`);
      throw new Error(errorMsg);
    }

    const data = await response.json();

    // Validate that the response is an array
    if (!Array.isArray(data)) {
      logger.error('API returned invalid data format (expected array)');
      throw new Error('Invalid data format received from API');
    }

    logger.info(`API call successful: ${data.length} transactions fetched`);
    return data;
  } catch (error) {
    logger.error(`API call failed: ${error.message}`, error);
    throw error;
  }
};

export default fetchTransactions;