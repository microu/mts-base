import { toyData } from "../../src/main";

test("alphabets length",() =>{
  expect(toyData.ALPHABET_ARRAY.length).toBe(26)
  expect(toyData.ALPHABET.length).toBe(26)
  expect(toyData.alphabetArray.length).toBe(26)
  expect(toyData.alphabet.length).toBe(26)
  expect(toyData.digitsArray.length).toBe(10)
  expect(toyData.digits.length).toBe(10)
  expect(toyData.greekAlphabetArray.length).toBe(24)
  expect(toyData.greekAlphabet.length).toBe(24)
  expect(toyData.GREEK_ALPHABET_ARRAY.length).toBe(24)
  expect(toyData.GREEK_ALPHABET.length).toBe(24)
})
