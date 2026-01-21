import { capitalize, reverse, isPalindrome, countWords, truncate } from './lang.js';

describe('lang', () => {
  describe('capitalize', () => {
    test('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    test('handles already capitalized string', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    test('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });

    test('capitalizes and lowercases rest', () => {
      expect(capitalize('hELLO')).toBe('Hello');
    });
  });

  describe('reverse', () => {
    test('reverses a string', () => {
      expect(reverse('hello')).toBe('olleh');
    });

    test('reverses empty string', () => {
      expect(reverse('')).toBe('');
    });

    test('reverses single character', () => {
      expect(reverse('a')).toBe('a');
    });
  });

  describe('isPalindrome', () => {
    test('identifies palindrome', () => {
      expect(isPalindrome('racecar')).toBe(true);
    });

    test('identifies non-palindrome', () => {
      expect(isPalindrome('hello')).toBe(false);
    });

    test('ignores case and spaces', () => {
      expect(isPalindrome('A man a plan a canal Panama')).toBe(true);
    });

    test('handles single character', () => {
      expect(isPalindrome('a')).toBe(true);
    });
  });

  describe('countWords', () => {
    test('counts words in a sentence', () => {
      expect(countWords('hello world foo bar')).toBe(4);
    });

    test('handles multiple spaces', () => {
      expect(countWords('hello  world   foo')).toBe(3);
    });

    test('handles leading and trailing spaces', () => {
      expect(countWords('  hello world  ')).toBe(2);
    });

    test('handles empty string', () => {
      expect(countWords('')).toBe(0);
    });
  });

  describe('truncate', () => {
    test('truncates long string', () => {
      expect(truncate('hello world', 8)).toBe('hello wo...');
    });

    test('does not truncate short string', () => {
      expect(truncate('hello', 10)).toBe('hello');
    });

    test('handles exact length', () => {
      expect(truncate('hello', 5)).toBe('hello');
    });
  });
});
