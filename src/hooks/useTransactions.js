import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchTransactions } from '../api/transactionApi';
import { processTransactions } from '../services/rewardService';
import logger from '../utils/logger';
import { DATA_LOADED_SUCCESS, ERROR_FETCH_FAILED } from '../constants/messages';


const useTransactions = () => {
  const [rawTransactions, setRawTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const loadData = useCallback(async () => {
    logger.info('useTransactions: Initiating data fetch');
    setLoading(true);
    setError(null);

    try {
      const data = await fetchTransactions();
      setRawTransactions(data);
      logger.info(DATA_LOADED_SUCCESS);
    } catch (err) {
      const errorMessage = err.message || ERROR_FETCH_FAILED;
      setError(errorMessage);
      logger.error(`useTransactions: Data fetch failed - ${errorMessage}`);
    } finally {
      setLoading(false);
      logger.info('useTransactions: Data fetch completed');
    }
  }, []);

  // Fetch data on initial mount
  useEffect(() => {
    logger.debug('useTransactions: useEffect triggered (initial mount)');
    loadData();
  }, [loadData]);
  // avoiding expensive reprocessing on every render.
  const customers = useMemo(() => {
    logger.debug('useTransactions: Recomputing customer data (useMemo)');
    return processTransactions(rawTransactions);
  }, [rawTransactions]);

  return {
    customers,
    loading,
    error,
    retry: loadData,
  };
};

export default useTransactions;
