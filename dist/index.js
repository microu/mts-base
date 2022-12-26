function characterList(firstChar, n, asArray = false) {
    const arr = Array.from(new Array(n), (_, i) => String.fromCharCode(firstChar.charCodeAt(0) + i));
    if (asArray) {
        return arr;
    }
    else {
        return arr.join("");
    }
}

var stringUtils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    characterList: characterList
});

const alphabet = characterList("a", 26);
const ALPHABET = characterList("A", 26);
const digits = characterList("0", 10);
const alphabetArray = characterList("a", 26, true);
const ALPHABET_ARRAY = characterList("A", 26, true);
const digitsArray = characterList("0", 10, true);
const greekAlphabet = "".concat(characterList("α", 17), characterList("σ", 7));
const greekAlphabetArray = [
    ...characterList("α", 17, true),
    ...characterList("σ", 7, true),
];
const GREEK_ALPHABET = "".concat(characterList("Α", 17), characterList("Σ", 7));
const GREEK_ALPHABET_ARRAY = [
    ...characterList("Α", 17, true),
    ...characterList("Σ", 7, true),
];

var toyData = /*#__PURE__*/Object.freeze({
    __proto__: null,
    alphabet: alphabet,
    ALPHABET: ALPHABET,
    digits: digits,
    alphabetArray: alphabetArray,
    ALPHABET_ARRAY: ALPHABET_ARRAY,
    digitsArray: digitsArray,
    greekAlphabet: greekAlphabet,
    greekAlphabetArray: greekAlphabetArray,
    GREEK_ALPHABET: GREEK_ALPHABET,
    GREEK_ALPHABET_ARRAY: GREEK_ALPHABET_ARRAY
});

const version = "mts-base: 0.1.4";

export { stringUtils, toyData, version };
