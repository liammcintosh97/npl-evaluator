// Import the js file to test
import { validateValue } from "../src/client/js/form.js"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the Form functionality", () => {
  test("Testing the validateValue() function", () => {
    const input = [
      {type: "url",value:"https://www.abc.net.au/news/2021-04-22/australia-pharmacists-suicide-prevention-training/100029612"},
      {type: "text", value:"Hello World"} ];

    for(let i = 0; i < input.length;i++){
      expect(validateValue(input[i].type,input[i].value)).toBeDefined();
    }
  });
});
