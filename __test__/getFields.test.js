// Import the js file to test
import { getSubmissionData } from "../src/client/js/form.js"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the Form functionality", () => {
  test("Testing the getSubmissionData() function", () => {
    const input = ["file" ,"url" , "text" ];

    for(let i = 0; i < input.length;i++){
      expect(getSubmissionData(input[i])).toBeUndefined();
    }
  });
});
