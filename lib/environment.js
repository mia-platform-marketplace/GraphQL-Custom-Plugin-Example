/* eslint no-process-env: 0 */
const { CRUD_URL, HTTP_PORT, PLAYGROUND } = require('./defaults')

const environment = {
  crudBaseUrl: process.env.CRUD_URL || CRUD_URL,
  port: process.env.HTTP_PORT || HTTP_PORT,
  playground: process.env.PLAYGROUND === 'false' ? false : PLAYGROUND,
}

module.exports = environment
