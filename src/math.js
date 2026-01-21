function square(n) {
  return n * n;
}

function cube(n) {
  return n * n * n;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function sqrt(n) {
  if (n < 0) {
    throw new Error('Cannot calculate square root of negative number');
  }
  return Math.sqrt(n);
}

function abs(n) {
  return Math.abs(n);
}

function max(...numbers) {
  return Math.max(...numbers);
}

function min(...numbers) {
  return Math.min(...numbers);
}

export {
  square,
  cube,
  power,
  sqrt,
  abs,
  max,
  min
};
