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

const { crudBaseUrl } = require('./environment')

async function fetchCrudData(args, collectionName, get) {
  const query = args.query ? { _q: args.query } : { ...args }
  const response = await get(`${crudBaseUrl}/${collectionName}/`, { responseType: 'json', query })
  return response.body
}

async function countCrudData(collectionName, get) {
  const response = await get(`${crudBaseUrl}/${collectionName}/count`)
  return response.body
}

class CrudCollection {
  constructor(args, get) {
    this.get = get
    this.args = args
  }

  list(args) {
    return fetchCrudData(args, this.args.name, this.get)
  }

  count() {
    return countCrudData(this.args.name, this.get)
  }
}

class Status {
  ready() {
    return 'ok'
  }

  healthz() {
    return 'ok'
  }
}

const resolvers = (get) => ({
  Query: {
    status: () => new Status(),
    collection: (obj, args) => {
      return new CrudCollection(args, get)
    },
  },
})

module.exports = resolvers
