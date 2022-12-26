import { stringUtils as su, toyData} from "../../src/main";

describe("characterList", ()=>{

  test("basic usage", () => {
    expect(su.characterList("a",5)).toEqual("abcde")
    expect(su.characterList("α",5)).toEqual(toyData.greekAlphabet.slice(0,5))
  }) 

})
