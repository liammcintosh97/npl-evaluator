// Import the js file to test
import { getTypeParameter } from "../src/client/js/typeSelector"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the Type Selector functionality", () => {
  test("Testing the getTypeParameter() function", () => {
    const input = ["url","text"];

    for(let i = 0; i < input.length;i++){
      expect(getTypeParameter(input[i])).toBeDefined();
    }
  });
});
