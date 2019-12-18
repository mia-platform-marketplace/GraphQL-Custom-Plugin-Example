/*
 * Copyright © 2018-present Mia s.r.l.
 * All rights reserved
*/
'use strict'

const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { playground } = require('./environment')

const server = (get) => new ApolloServer({
  typeDefs,
  resolvers: resolvers(get),
  playground,
  introspection: true,
})

module.exports = server
