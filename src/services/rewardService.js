import { calculateRewardPoints } from '../utils/rewardCalculator';
import { getMonthYearKey } from '../utils/dateUtils';
import logger from '../utils/logger';

export const processTransactions = (transactions) => {
  logger.info('Processing transaction data for reward calculations');

  if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
    logger.warn('No transactions to process');
    return [];
  }

  // Group transactions by customerId using a Map for O(1) lookups
  const customerMap = new Map();

  transactions.forEach((txn) => {
    const { customerId, customerName, transactionId, amount, date } = txn;

    // Skip invalid transaction records
    if (!customerId || amount === undefined || amount === null) {
      logger.warn(`Skipping invalid transaction: ${JSON.stringify(txn)}`);
      return;
    }

    const numAmount = Number(amount);
    const rewardPoints = calculateRewardPoints(numAmount);
    const monthKey = getMonthYearKey(date);

    // Initialize customer entry if not exists
    if (!customerMap.has(customerId)) {
      customerMap.set(customerId, {
        customerId,
        customerName: customerName || `Customer ${customerId}`,
        totalRewards: 0,
        totalSpent: 0,
        transactionCount: 0,
        transactions: [],
        monthlyBreakdown: {},
      });
    }

    const customer = customerMap.get(customerId);

    // Add transaction with computed reward points
    customer.transactions.push({
      transactionId,
      amount: numAmount,
      date,
      rewardPoints,
    });

    // Update totals
    customer.totalRewards += rewardPoints;
    customer.totalSpent += numAmount;
    customer.transactionCount += 1;

    // Update monthly breakdown
    if (!customer.monthlyBreakdown[monthKey]) {
      customer.monthlyBreakdown[monthKey] = {
        month: monthKey,
        totalRewards: 0,
        totalSpent: 0,
        transactionCount: 0,
        transactions: [],
      };
    }

    const monthData = customer.monthlyBreakdown[monthKey];
    monthData.totalRewards += rewardPoints;
    monthData.totalSpent += numAmount;
    monthData.transactionCount += 1;
    monthData.transactions.push({
      transactionId,
      amount: numAmount,
      date,
      rewardPoints,
    });
  });

  // Convert Map to array and sort by customer name alphabetically
  const result = Array.from(customerMap.values()).sort((a, b) =>
    a.customerName.localeCompare(b.customerName)
  );

  logger.info(`Processed ${result.length} customers from ${transactions.length} transactions`);
  return result;
};


export const getMonthlyBreakdown = (customerData) => {
  if (!customerData || !customerData.monthlyBreakdown) {
    return [];
  }

  return Object.values(customerData.monthlyBreakdown).sort((a, b) => {
    const dateA = new Date(a.month);
    const dateB = new Date(b.month);
    return dateB - dateA;
  });
};


export const getRecentMonthKeys = (customers, limit = 3) => {
  const monthSet = new Set();
  customers.forEach((c) =>
    Object.keys(c.monthlyBreakdown).forEach((m) => monthSet.add(m))
  );
  return Array.from(monthSet)
    .sort((a, b) => new Date(b) - new Date(a))
    .slice(0, limit);
};

export default {
  processTransactions,
  getMonthlyBreakdown,
  getRecentMonthKeys,
};
