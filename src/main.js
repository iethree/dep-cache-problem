import { seededRandomInt } from "./utils.js";
import { add } from "./calc.js";
import { square } from "./math.js";
import { reverse, capitalize } from "./lang.js";
import { randomEmoji } from "./emoji.js";

const result = seededRandomInt(1, 10) * add(2, 3) + square(4);

console.log(
  "\n\n" +
  capitalize(reverse(` era ereht kool`) + result + " flying " +randomEmoji() + " !")
);