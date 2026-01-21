import { square, cube, power, sqrt, abs, max, min } from './math.js';

describe('math', () => {
  describe('square', () => {
    test('squares a positive number', () => {
      expect(square(5)).toBe(25);
    });

    test('squares a negative number', () => {
      expect(square(-5)).toBe(25);
    });

    test('squares zero', () => {
      expect(square(0)).toBe(0);
    });
  });

  describe('cube', () => {
    test('cubes a positive number', () => {
      expect(cube(3)).toBe(27);
    });

    test('cubes a negative number', () => {
      expect(cube(-3)).toBe(-27);
    });
  });

  describe('power', () => {
    test('raises base to exponent', () => {
      expect(power(2, 3)).toBe(8);
    });

    test('raises to power of zero', () => {
      expect(power(5, 0)).toBe(1);
    });

    test('raises to negative power', () => {
      expect(power(2, -2)).toBe(0.25);
    });
  });

  describe('sqrt', () => {
    test('calculates square root of positive number', () => {
      expect(sqrt(16)).toBe(4);
    });

    test('calculates square root of zero', () => {
      expect(sqrt(0)).toBe(0);
    });

    test('throws error for negative number', () => {
      expect(() => sqrt(-4)).toThrow('Cannot calculate square root of negative number');
    });
  });

  describe('abs', () => {
    test('returns absolute value of positive number', () => {
      expect(abs(5)).toBe(5);
    });

    test('returns absolute value of negative number', () => {
      expect(abs(-5)).toBe(5);
    });

    test('returns zero for zero', () => {
      expect(abs(0)).toBe(0);
    });
  });

  describe('max', () => {
    test('returns maximum of multiple numbers', () => {
      expect(max(1, 5, 3, 9, 2)).toBe(9);
    });

    test('returns single number', () => {
      expect(max(42)).toBe(42);
    });
  });

  describe('min', () => {
    test('returns minimum of multiple numbers', () => {
      expect(min(1, 5, 3, 9, 2)).toBe(1);
    });

    test('returns single number', () => {
      expect(min(42)).toBe(42);
    });
  });
});
