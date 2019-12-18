/*
 * Copyright © 2018-present Mia s.r.l.
 * All rights reserved
*/

'use strict'
const got = require('got')
const server = require('./server')(got.get)
const { port } = require('./environment')

// eslint-disable-next-line no-console
server.listen({ port }, console.log(`graphql service running on port ${port}`))
