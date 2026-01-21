import { add, subtract, multiply, divide, percentage } from './calc.js';

describe('calc', () => {
  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('adds negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    test('adds positive and negative numbers', () => {
      expect(add(5, -3)).toBe(2);
    });
  });

  describe('subtract', () => {
    test('subtracts two positive numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });

    test('subtracts negative numbers', () => {
      expect(subtract(-5, -3)).toBe(-2);
    });
  });

  describe('multiply', () => {
    test('multiplies two positive numbers', () => {
      expect(multiply(4, 5)).toBe(20);
    });

    test('multiplies by zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });

    test('multiplies negative numbers', () => {
      expect(multiply(-4, -5)).toBe(20);
    });
  });

  describe('divide', () => {
    test('divides two positive numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    test('divides negative numbers', () => {
      expect(divide(-10, -2)).toBe(5);
    });

    test('throws error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
    });
  });

  describe('percentage', () => {
    test('calculates percentage of a number', () => {
      expect(percentage(200, 50)).toBe(100);
    });

    test('calculates small percentage', () => {
      expect(percentage(100, 10)).toBe(10);
    });
  });
});
