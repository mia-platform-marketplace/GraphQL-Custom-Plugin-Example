const { gql } = require('apollo-server')

const typeDefs = gql `
type crudCollectionList {
  list(
    id: Int,
    query: String,
    name: String,
  ): [Document],
  count: Int
}

type Document{
  _id: String,
  creatorId: String,
  createdAt: String,
  updaterId: String,
  updatedAt: String,
  name: String
}

type Status {
  ready: String
  healthz: String
}

type Query {
  status: Status
  collection(name: String!): crudCollectionList
}
`

module.exports = typeDefs
