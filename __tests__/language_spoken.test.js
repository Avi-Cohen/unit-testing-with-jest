const {
  capitalize,
  getAlpha2Code,
  countryExtractor,
  countryListLookup,
  getResponse,
} = require("../language_spoken");

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
});

/*
Note: The .toBe() matcher can be used to compare simple data types for equality while the .toEqual() matcher is used to perform deep equality comparisons. 
*/
