const {
  capitalize,
  getAlpha2Code,
  countryExtractor,
  countryListLookup,
  getResponse,
} = require("../language_spoken");

const httpRequest = require("../utils/http-request");
jest.mock("../utils/http-request");

test("convert array of country data objects to array of countries", () => {
  //arrange
  const inputObject = [
    { name: "Argentina", capital: "Buenos Aires" },
    { name: "Belize", capital: "Belmopan" },
    { name: "Bolivia", capital: "Sucre" },
  ];
  const expectedValue = ["Argentina", "Belize", "Bolivia"];

  //act
  const actualValue = countryExtractor(inputObject);

  //assertions
  expect(actualValue).toEqual(expectedValue);
  expect(actualValue[0]).toBe("Argentina");
  expect(actualValue).toContain("Belize");
  expect(actualValue[2] === "Bolivia").toBeTruthy();
  expect(actualValue[3]).not.toBeDefined();
});

/*
Note: The .toBe() matcher can be used to compare simple data types for equality while the .toEqual() matcher is used to perform deep equality comparisons. 

.toBeDefined() is used to verify that a variable is not undefined. This is often the first thing checked.
.toEqual() is used to perform deep equality checks between objects.
.toBe() is similar to .toEqual() but is used to compare primitive values.
.toBeTruthy() is used to verify whether a value is truthy or not.
.not is used before another matcher to verify that the opposite result is true
.toContain() is used when we want to verify that an item is in an array. In this case, since the .not matcher is used, we are verifying that "Ice Cream" is NOT in the array.
*/

test("correctly fetches a list of countries - should fail (no async/await) on api call", (done) => {
  //arrange
  const inputLanguageCode = "es";
  const expectedValue = "Argentina";

  //act
  countryListLookup(inputLanguageCode, (result) => {
    //assertions
    try {
      //expect(undefined).toBeDefined(); => will fail the test
      expect(result).toBeDefined(); // shold pass but NOT! (check API call) -> solved (added async/await) in another test
      done();
    } catch (error) {
      done(error);
    }
  });
});

/*
Jest allows us to add a done parameter in the test() callback function. The value of done is a function and, when included as a parameter, Jest knows that the test should not finish until this done() function is called.

Let’s break down this example:

In the first line of code, the done parameter is added to the callback passed to test(). Jest now knows to wait until that function is called before concluding the test.
The done() function is called after the expect() assertion is made. This way, the expect() is guaranteed to be seen and any false-positives will be caught.
You should notice that the expect() and done() call are being made in a try block. Without this, if the assertion were to fail, expect() would throw an error before the done() function gets a chance to be called. From Jest’s perspective, the reason for the test failure would be a timeout error (since done() was never called) rather than the actual error thrown by the failed expect() assertion.

By using a catch block, we can capture the error value thrown and pass it to done(), which then displays it in the test output. Though not required, this is a best practice and will yield better test outputs.
*/

test("correctly fetches a list of countries (ASYNC!)", async () => {
  //arrange
  const inputLanguageCode = "es";
  const expectedValue = "Argentina";
  //act
  const actualValue = await countryListLookup(inputLanguageCode);
  //assertions
  expect(actualValue).toContain(expectedValue);
});

/*
With the inclusion of the async/await keywords, Jest will wait for any await statement to resolve before continuing on.
*/

test("correctly fetches a list of countries3 - using mock", async () => {
  //arrange
  const inputLanguageCode = "jest";
  const expectedValue = "CodeLand";
  const resolvedValue = {
    status: "MOCK",
    data: [{ name: "CodeLand", capital: "Codecademy" }],
  };
  // TODO: Mock the first resolved value of httpRequest
  httpRequest.mockResolvedValueOnce(resolvedValue);

  //act
  const actualValue = await countryListLookup(inputLanguageCode);
  //assertions
  expect(actualValue).toContain(expectedValue);
});

/*
Let's Review!
Great work! We have covered a lot over this lesson. Let’s take a moment to review:

We have learned that Jest is an easy-to-use framework for testing in a JavaScript environment because it combines a test-runner with assertion methods like the expect() API.
We also learned some of the basic syntax involved with creating a simple unit test, such as the test() function.
After tackling basic unit tests we adventured into the realm of testing asynchronous code with Jest by using the done parameter to wait for asynchronous callbacks and the async/await keywords to wait for Promises to resolve
Lastly, we learned how to mock functions using jest.fn() and make use of mocked modules with jest.mock() by mocking the Axios module.
While we have learned a lot there is always more knowledge to be obtained and we encourage you to continue exploring Jest and its wonderful features!
*/
