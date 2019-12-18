const { createTestClient } = require('apollo-server-testing')
const server = require('./../lib/server')
const query = (http) => createTestClient(server(http)).query

module.exports = query
