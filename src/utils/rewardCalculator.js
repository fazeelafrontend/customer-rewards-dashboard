/**
 * - 2 points for every dollar spent over $100
 * - 1 point for every dollar spent between $50 and $100
 * - 0 points for purchases $50 or below
 * Example: $120 purchase = 2×$20 + 1×$50 = 90 points
 */
import logger from './logger';
export const calculateRewardPoints = (transactionAmount) => {
  const amount = Number(transactionAmount);

  // Handle invalid or non-numeric values
  if (isNaN(amount) || amount < 0) {
    logger.warn(`Invalid transaction amount: ${transactionAmount}`);
    return 0;
  }
  if (amount <= 50) {
    return 0;
  }
  if (amount <= 100) {
    return Math.floor(amount - 50);
  }

  // $50 points for the $50-$100 range + 2 points per dollar over $100
  const pointsOver100 = Math.floor((amount - 100) * 2);
  const pointsBetween50And100 = 50;
  const totalPoints = pointsBetween50And100 + pointsOver100;

  logger.debug(`Reward calculated for $${amount}: ${totalPoints} points`);
  return totalPoints;
};
export default calculateRewardPoints;
