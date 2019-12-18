const { crudBaseUrl } = require('./environment')

async function fetchCrudData(args, collectionName, get) {
  const query = args.query ? { _q: args.query } : { ...args }
  const response = await get(`${crudBaseUrl}/${collectionName}/`, { json: true, query })
  return response.body
}

async function countCrudData(collectionName, get) {
  const response = await get(`${crudBaseUrl}/${collectionName}/count`, { json: true })
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
    // Deve restituire 200 se il servizio e le sue eventuali dipendenze
    // sono in grado di fornire quello per cui è stato creato.
    // Ad esempio, il servizio comunica correttamente con il database,
    // tutte le sue configurazioni sono corrette, ha le risorse necessarie per essere eseguito.
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
