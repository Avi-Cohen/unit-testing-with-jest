const httpRequest = jest.fn(
  Promise.resolve({
    status: ``,
    data: [],
  })
);
module.exports = httpRequest;
