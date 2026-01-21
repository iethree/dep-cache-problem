import { isEven, isOdd, randomInt, shuffle, delay, chunk, seededRandomInt } from './utils.js';

describe('utils', () => {
  describe('isEven', () => {
    test('returns true for even numbers', () => {
      expect(isEven(2)).toBe(true);
      expect(isEven(4)).toBe(true);
      expect(isEven(0)).toBe(true);
    });

    test('returns false for odd numbers', () => {
      expect(isEven(1)).toBe(false);
      expect(isEven(3)).toBe(false);
    });

    test('handles negative numbers', () => {
      expect(isEven(-2)).toBe(true);
      expect(isEven(-3)).toBe(false);
    });
  });

  describe('isOdd', () => {
    test('returns true for odd numbers', () => {
      expect(isOdd(1)).toBe(true);
      expect(isOdd(3)).toBe(true);
    });

    test('returns false for even numbers', () => {
      expect(isOdd(2)).toBe(false);
      expect(isOdd(4)).toBe(false);
      expect(isOdd(0)).toBe(false);
    });
  });

  describe('randomInt', () => {
    test('generates number within range', () => {
      const result = randomInt(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });

    test('handles same min and max', () => {
      expect(randomInt(5, 5)).toBe(5);
    });
  });

  describe('shuffle', () => {
    test('shuffles array without losing elements', () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffle(arr);
      expect(shuffled).toHaveLength(5);
      expect(shuffled.sort()).toEqual([1, 2, 3, 4, 5]);
    });

    test('does not modify original array', () => {
      const arr = [1, 2, 3];
      const shuffled = shuffle(arr);
      expect(arr).toEqual([1, 2, 3]);
    });

    test('handles empty array', () => {
      expect(shuffle([])).toEqual([]);
    });
  });

  describe('delay', () => {
    test('delays execution', async () => {
      const start = Date.now();
      await delay(100);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(95);
    });
  });

  describe('chunk', () => {
    test('chunks array into smaller arrays', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    test('handles exact division', () => {
      expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
    });

    test('handles chunk size larger than array', () => {
      expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
    });

    test('handles empty array', () => {
      expect(chunk([], 2)).toEqual([]);
    });
  });

  describe('seededRandomInt', () => {
    test('generates consistent number for same seed', () => {
      const firstCall = seededRandomInt(1, 10);
      const secondCall = seededRandomInt(1, 10);
      expect(firstCall).toBe(secondCall);
    });

    test('generates number within range', () => {
      const result = seededRandomInt(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });
  });
});
