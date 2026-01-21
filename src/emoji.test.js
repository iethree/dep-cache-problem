import { describe } from "vitest";
import { randomEmoji, generateEmojiHash } from "./emoji";

describe("emojis", () => {
  describe("randomEmoji", () => {
    test("returns a string", () => {
      const emoji = randomEmoji();
      expect(typeof emoji).toBe("string");
    });

    test("returns a single emoji character", () => {
      const emoji = randomEmoji();
      expect(emoji.length).toBeGreaterThan(0);
      expect(emoji.length).toBeLessThanOrEqual(2); // Some emojis are surrogate pairs
    });
  });

  describe("generateEmojiHash", () => {
    test("generates different hashes for different inputs", () => {
      const hash1 = generateEmojiHash("input1");
      const hash2 = generateEmojiHash("input2");
      expect(hash1).not.toBe(hash2);
    });

    test("generates the same hash for the same input1", () => {
      const hash1 = generateEmojiHash("consistent");
      const hash2 = generateEmojiHash("consistent");
      expect(hash1).toBe(hash2);
    });

    test("returns empty string for empty input", () => {
      const hash = generateEmojiHash("");
      expect(hash).toBe("");
    });
  });
})