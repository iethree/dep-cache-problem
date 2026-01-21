import fs from "fs";
import { stringToNumber } from "./calc.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SEED_DIR = __dirname + "/../dist/dep.bin";

function isEven(n) {
  return n % 2 === 0;
}

function isOdd(n) {
  return n % 2 !== 0;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function seededRandomInt(min, max) {
  const dep = fs.readFileSync(SEED_DIR);
  if (!dep || dep.length === 0) {
    throw new Error('Seed file is missing or empty');
  }
  const seed = stringToNumber(dep.toString()); // Fixed seed for reproducibility
  const x = Math.sin(seed) * 10000;
  const rand = x - Math.floor(x);
  return Math.floor(rand * (max - min + 1)) + min;
}

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function chunk(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export {
  isEven,
  isOdd,
  randomInt,
  seededRandomInt,
  shuffle,
  delay,
  chunk
};
