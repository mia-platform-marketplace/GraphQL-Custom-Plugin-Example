const sinon = require('sinon')

const httpTestDouble = (response = {}) => sinon
  .stub()
  .returns(Promise.resolve(response))

const failingHttpTestDouble = (error) => sinon
  .stub()
  .returns(Promise.reject(error))

module.exports = { httpTestDouble, failingHttpTestDouble }
