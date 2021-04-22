// Import the js file to test
import { getTextFormatParameter } from "../src/client/js/dropDown"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the Drop Down functionality", () => {
  test("Testing the getTextFormatParameter() function", () => {
    const input = ["Plain Text","Markup Language"];

    for(let i = 0; i < input.length;i++){
      expect(getTextFormatParameter(input[i])).toBeDefined();
    }
  });
});
