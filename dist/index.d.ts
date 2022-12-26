declare function characterList(firstChar: string, n: number): string;
declare function characterList(firstChar: string, n: number, asArray: false): string;
declare function characterList(firstChar: string, n: number, asArray: true): string[];

declare const stringUtils_d_characterList: typeof characterList;
declare namespace stringUtils_d {
  export {
    stringUtils_d_characterList as characterList,
  };
}

declare const alphabet: string;
declare const ALPHABET: string;
declare const digits: string;
declare const alphabetArray: string[];
declare const ALPHABET_ARRAY: string[];
declare const digitsArray: string[];
declare const greekAlphabet: string;
declare const greekAlphabetArray: string[];
declare const GREEK_ALPHABET: string;
declare const GREEK_ALPHABET_ARRAY: string[];

declare const toyData_d_alphabet: typeof alphabet;
declare const toyData_d_ALPHABET: typeof ALPHABET;
declare const toyData_d_digits: typeof digits;
declare const toyData_d_alphabetArray: typeof alphabetArray;
declare const toyData_d_ALPHABET_ARRAY: typeof ALPHABET_ARRAY;
declare const toyData_d_digitsArray: typeof digitsArray;
declare const toyData_d_greekAlphabet: typeof greekAlphabet;
declare const toyData_d_greekAlphabetArray: typeof greekAlphabetArray;
declare const toyData_d_GREEK_ALPHABET: typeof GREEK_ALPHABET;
declare const toyData_d_GREEK_ALPHABET_ARRAY: typeof GREEK_ALPHABET_ARRAY;
declare namespace toyData_d {
  export {
    toyData_d_alphabet as alphabet,
    toyData_d_ALPHABET as ALPHABET,
    toyData_d_digits as digits,
    toyData_d_alphabetArray as alphabetArray,
    toyData_d_ALPHABET_ARRAY as ALPHABET_ARRAY,
    toyData_d_digitsArray as digitsArray,
    toyData_d_greekAlphabet as greekAlphabet,
    toyData_d_greekAlphabetArray as greekAlphabetArray,
    toyData_d_GREEK_ALPHABET as GREEK_ALPHABET,
    toyData_d_GREEK_ALPHABET_ARRAY as GREEK_ALPHABET_ARRAY,
  };
}

declare const version = "mts-base: 0.1.4";

export { stringUtils_d as stringUtils, toyData_d as toyData, version };
