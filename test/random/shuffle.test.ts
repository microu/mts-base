import { toyData } from "../../src/main";
import { shuffle } from "../../src/random";

test("Shuffle Alphabet", () => {
  expect(toyData.alphabet.length).toBe(26);
  expect(shuffle(toyData.alphabetArray).length).toBe(26)
});
