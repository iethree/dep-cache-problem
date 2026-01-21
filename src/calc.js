function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

function percentage(value, percent) {
  return (value * percent) / 100;
}

function stringToNumber(str) {
  let hash = 0;
  if (str.length === 0) return hash;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);

    // Bitwise shift (<<) and subtraction is equivalent to multiplying by 31
    // hash * 31 + char
    hash = ((hash << 5) - hash) + char;

    // Convert to 32bit integer
    hash |= 0;
  }

  return hash;
}

export {
  add,
  subtract,
  multiply,
  divide,
  percentage,
  stringToNumber,
};
