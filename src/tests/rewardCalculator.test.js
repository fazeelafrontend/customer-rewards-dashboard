//  Reward Calculator Unit Tests,Covers whole numbers, decimal values, and boundary conditions.
import { describe, it, expect } from 'vitest';
import { calculateRewardPoints } from '../utils/rewardCalculator';

describe('calculateRewardPoints', () => {
  // ==========================================
  // POSITIVE TEST CASES
  // ==========================================
  describe('Positive Test Cases', () => {
    it('should return 90 points for $120 (whole number over $100)', () => {
      // $120 → 50 pts ($50-$100) + 2×$20 = 90 pts
      expect(calculateRewardPoints(120)).toBe(90);
    });

    it('should return 25 points for $75 (whole number between $50-$100)', () => {
      // $75 → $75 - $50 = 25 pts
      expect(calculateRewardPoints(75)).toBe(25);
    });

    it('should return 150 points for $150 (whole number over $100)', () => {
      // $150 → 50 pts + 2×$50 = 150 pts
      expect(calculateRewardPoints(150)).toBe(150);
    });

    it('should return 50 points for $100 (boundary at $100)', () => {
      // $100 → $100 - $50 = 50 pts (exactly at tier 1 max)
      expect(calculateRewardPoints(100)).toBe(50);
    });

    it('should return 0 points for $50 (boundary at $50)', () => {
      // $50 → 0 pts (at or below tier 1 threshold)
      expect(calculateRewardPoints(50)).toBe(0);
    });

    it('should handle decimal amount $120.50 correctly', () => {
      // $120.50 → 50 + Math.floor(20.50 * 2) = 50 + 41 = 91 pts
      expect(calculateRewardPoints(120.50)).toBe(91);
    });

    it('should handle decimal amount $75.99 correctly', () => {
      // $75.99 → Math.floor(75.99 - 50) = Math.floor(25.99) = 25 pts
      expect(calculateRewardPoints(75.99)).toBe(25);
    });

    it('should return 290 points for $220 (high value transaction)', () => {
      // $220 → 50 + 2×$120 = 50 + 240 = 290 pts
      expect(calculateRewardPoints(220)).toBe(290);
    });
  });

  // ==========================================
  // NEGATIVE TEST CASES
  // ==========================================
  describe('Negative Test Cases', () => {
    it('should return 0 points for negative amount', () => {
      expect(calculateRewardPoints(-50)).toBe(0);
    });

    it('should return 0 points for $0 amount', () => {
      expect(calculateRewardPoints(0)).toBe(0);
    });

    it('should return 0 points for amount below $50', () => {
      expect(calculateRewardPoints(30)).toBe(0);
    });

    it('should return 0 points for null input', () => {
      expect(calculateRewardPoints(null)).toBe(0);
    });

    it('should return 0 points for undefined input', () => {
      expect(calculateRewardPoints(undefined)).toBe(0);
    });

    it('should return 0 points for non-numeric string input', () => {
      expect(calculateRewardPoints('abc')).toBe(0);
    });

    it('should handle numeric string input correctly', () => {
      // "120" should parse to 120 → 90 pts
      expect(calculateRewardPoints('120')).toBe(90);
    });
  });
});
