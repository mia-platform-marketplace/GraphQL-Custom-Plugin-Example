# graphql-custom-plugin
![pipeline status](https://git.tools.mia-platform.eu/platform/templates/graphql-template/badges/master/pipeline.svg)  
![coverage report](https://git.tools.mia-platform.eu/platform/templates/graphql-template/badges/master/coverage.svg)

## What is GraphQL?

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

## When should I use GraphQL?
GraphQL is the way to go when have to deal with:  
* complex data structures (e.g. deeply nested data)
* different types of data at the same time (e.g. analytics dashboards)
* when flexibility is needed (e.g. you may want to change client-server interface easily)  

### You can read here if you want to know more
[`Quora`](https://www.quora.com/When-should-I-use-GraphQL-for-my-web-application)  
[`Paypal Success story`](https://medium.com/paypal-engineering/graphql-a-success-story-for-paypal-checkout-3482f724fb53)  
[`GraphQL vs Redux`](https://hackernoon.com/how-graphql-replaces-redux-3fff8289221d)  
[`Official getting started guide`](https://graphql.org/learn/)  
[`GraphQL patterns`](https://medium.com/@JeffLombardJr/when-and-why-to-use-graphql-24f6bce4839d)  

# graphql-custom-plugin

## Local Development
To develop the service locally you need:
- Node +

To setup node, please if possible try to use [nvm][nvm], so you can manage multiple
versions easily. Once you have installed nvm, you can go inside the directory of the project and simply run
`nvm install`, the `.nvmrc` file will install and select the correct version if you don’t already have it.

Once you have all the dependency in place, you can launch:
```shell
npm i
npm run coverage
```

This two commands, will install the dependencies and run the tests with the coverage report that you can view as an HTML
page in `coverage/lcov-report/index.html`.
After running the coverage you can create your local copy of the default values for the `env` variables needed for
launching the application.
```shell
cp ./default.env ./environments/local.env
```

From now on, if you want to change anyone of the default values for the variables you can do it inside the `./environments/local.env`
file without pushing it to the remote repository.

Once you have all your dependency in place you can launch:
```shell
npm run start:local
```

After that you will have the service exposed on your machine on port 3000.

NOTE: to actually use the service on your local machine you also have to launch an instance of Mia-Platform `crud-service`.

## Launch docker locally
```shell
docker build -t graphql .
docker run --env-file ./environments/local.env -p 3000:3000 graphql:latest
```

[nvm]: https://github.com/creationix/nvm

## Getting started with GraphQL
Once launched you can start playing inside the playground (copy and paste the following queries to get going).

Alternatively using curl

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"operationName":null,"variables":{},"query":"{\n  status {\n    ready\n    healthz\n  }\n}\n"}' \
  http://127.0.0.1:3000/
```

## How it works

This plugin is thought to call a CRUD endpoint to fetch data from.  
In the collection name param you should enter the CRUD endpoint name (e.g. books).  
The CRUD base url to be called it's the value of CRUD_URL environment variable.

If PLAYGROUND environment variable value is set to `true` the `apollo-server playground` will be exposed (this is by default).

## **query examples**
## healthiness & readiness query
```
{
  status {
    ready,
    healthz
  }
}
```

## count a collection
```
{
  collection(name: "books") {
    count
  }
}
```

## list a collection
```
{
  collection(name: "books") {
    list {
      _id,
      name
    }
  } 
}
```

## list & count a collection
```
{
  collection(name: "books") {
    list {
      _id,
      name
    },
    count
  } 
}
```

## count multiple collection with aliases
```
{
  books: collection(name: "books") {
    count
  },
  cars: collection(name: "cars") {
    count
  }
}
```

## list & count multiple collection with aliases
```
{
  books: collection(name: "books") {
    list {
      _id,
      name
    },
    count
  },
  cars: collection(name: "cars") {
    list {
      _id,
      name
    },
    count
  }
}
```

## multiple filtered list with aliases
```
{ 
  daVinciCode:collection(name: "books") {
    list(name: "daVinciCode") {
      name,
      _id
    }
  }
  theNameOfTheRose:collection(name: "books") {
    list(name: "theNameOfTheRose") {
      name,
      _id
    }
  }  
}
```

## Contributing
To contribute to the project, please be mindful for this simple rules:
1. Don’t commit directly on master
2. Start your branches with `feature/` or `fix/` based on the content of the branch
3. If possible, refer to the Jira issue id, inside the name of the branch, but not call it only `fix/BAAST3000`
4. Always commit in english
5. Once you are happy with your branch, open a [Merge Request][merge-request]
  }  
}
```

## Contributing
To contribute to the project, please be mindful for this simple rules:
1. Don’t commit directly on master
2. Start your branches with `feature/` or `fix/` based on the content of the branch
3. If possible, refer to the Jira issue id, inside the name of the branch, but not call it only `fix/BAAST3000`
4. Always commit in english
5. Once you are happy with your branch, open a [Merge Request][merge-request]

_**Note:** The first project build will fail because the `package-lock.json` file is missing._
