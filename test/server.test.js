/*
 * Copyright 2019 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint id-length: 0 */
/* eslint no-shadow: 0 */
/* eslint no-magic-numbers: 0 */
/* eslint no-process-env: 0 */
/* eslint no-use-before-define: 0 */
/* eslint max-nested-callbacks: 0 */
'use strict'

const t = require('tap')
const { httpTestDouble } = require('./httpTestDouble')
const query = require('./testServer.js')

t.test('Status', async t => {
  t.plan(1)
  const server = query()
  const response = await server({ query: '{ status { ready, healthz } }' })
  t.same(response.data, { status: { ready: 'ok', healthz: 'ok' } })
})

t.test('A Collection should be countable', async t => {
  t.plan(1)
  const http = httpTestDouble()
  const server = query(http)
  await server({ query: `{
    collection(name: "name") {
      count
    }
  }` })
  t.match(http.getCall(0).args[0], /count/)
})

t.test('A Collection should be a query', async t => {
  t.plan(1)
  const http = httpTestDouble()
  const server = query(http)
  await server({ query: `{
    collection(name: "name") {
      list(query:"the_query") {
        _id
      }
    }
  }` })
  t.match(http.getCall(0).args[1].query['_q'], /the_query/)
})

t.test('A Collection should accept params', async t => {
  t.plan(2)
  const http = httpTestDouble()
  const server = query(http)
  await server({ query: `{
    collection(name: "name") {
      list(name: "document_name", id: 1) {
        _id
      }
    }
  }` })
  t.match(http.getCall(0).args[1].query['name'], /document_name/)
  t.match(http.getCall(0).args[1].query['id'], /1/)
})
