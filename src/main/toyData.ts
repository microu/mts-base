import { characterList } from "./stringUtils.js";

export const alphabet = characterList("a", 26);
export const ALPHABET = characterList("A", 26);
export const digits = characterList("0", 10);
export const alphabetArray = characterList("a", 26, true);
export const ALPHABET_ARRAY = characterList("A", 26, true);
export const digitsArray = characterList("0", 10, true);
export const greekAlphabet = "".concat(
  characterList("α", 17),
  characterList("σ", 7)
);
export const greekAlphabetArray = [
  ...characterList("α", 17, true),
  ...characterList("σ", 7, true),
];

export const GREEK_ALPHABET = "".concat(
  characterList("Α", 17),
  characterList("Σ", 7)
);
export const GREEK_ALPHABET_ARRAY = [
  ...characterList("Α", 17, true),
  ...characterList("Σ", 7, true),
];
