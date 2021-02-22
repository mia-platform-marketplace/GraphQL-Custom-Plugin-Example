# Node.js GraphQL Example walkthrough

[![Build Status][github-actions-svg]][github-actions]
[![Coverage Status][coverall-svg]][coverall-io]

This walkthrough will explain you how to correctly create a GraphQL microservice that is connected to a CRUD of books from the DevOps Console.

## Create a microservice

In order to do so, access to [Mia-Platform DevOps Console](https://console.cloud.mia-platform.eu/login), create a new project and go to the **Design** area. From the Design area of your project select _Microservices_ and then create a new one, you have now reached [Mia-Platform Marketplace](https://docs.mia-platform.eu/development_suite/api-console/api-design/marketplace/)!  
In the marketplace you will see a set of Examples and Templates that can be used to set-up microservices with a predefined and tested function.

For this walkthrough select the following example: **GraphQL-Custom-Plugin-Example**.
Give your microservice the name you prefer, in this walkthrough we'll refer to it with the following name: **graphql-example**. Then, fill the other required fields and confirm that you want to create a microservice.  
A more detailed description on how to create a Microservice can be found in [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#2-service-creation) section of Mia-Platform documentation.

## Remove status probes

In order to run this example correctly, it is necessary to remove the default probes of your microservice. To do so, go to the table *Microservice configuration* of the newly created microservice *graphql-example* in the section *Probes*. Once here, delete both the default readiness and liveness paths.

## Expose an endpoint to your microservice

In order to access to your new microservice it is necessary to create an endpoint that targets it.  
In particular, in this walkthrough you will create an endpoint to your microservice *graphql-example*. To do so, from the Design area of your project select _Endpoints_ and then create a new endpoint.
Now you need to choose a path for your endpoint and to connect this endpoint to our microservice. Give to your endpoint the following path: **/graphql**. Then, specify that you want to connect your endpoint to a microservice and, finally, select *graphql-example*.  
Step 3 of [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#3-creating-the-endpoint) section of Mia-Platform documentation will explain in detail how to create an endpoint from the DevOps Console.

## Create a CRUD

The microservice that you have just created is supposed to connect to a CRUD and to perform requests to it using GraphQL. The next step is to create a CRUD of books (but any other CRUD will work fine) so that your microservice can connect to it.  

From the Design area of your project select "CRUD" on the menu on the left sidebar. Give your CRUD the following name: **books_crud**. You can also modify the internal endpoint path, in this walkthrough we will use the following path: **/books-crud**.  Then confirm that you want to create a CRUD.  
Once you have created your CRUD of books you can add some properties to it. In this walkthrough you should add one simple property to your CRUD: *name*, of type *String*.  
A more detailed description on how to create and add properties to a CRUD can be found in [CRUD](https://docs.mia-platform.eu/development_suite/api-console/api-design/crud_advanced/) section of Mia-Platform documentation.

## Expose an endpoint to your CRUD

You now need to expose this CRUD with an endpoint. In a similar way to what you have done when creating an endpoint to your microservice, you have to select _Endpoints_ section again.  
Give to your endpoint the following path: **/books**. Then, specify that you want to connect your endpoint to a CRUD and, finally, select */books_crud*.

## Save your changes

After having created an endpoint to your CRUD you should save the changes that you have done to your project in the DevOps console.  Remember to choose a meaningful title for your commit (e.g "created service example_graphql"). After some seconds you will be prompted with a popup message which confirms that you have successfully saved all your changes.  
Step 4 of [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#4-save-the-project) section of Mia-Platform documentation will explain how to correctly save the changes you have made on your project in the DevOps console.

## Deploy

Once all the changes that you have made are saved, you should deploy your project through the DevOps Console. Go to the **Deploy** area of the DevOps Console.  
Once here select the environment and the branch you have worked on and confirm your choices clicking on the *deploy* button. When the deploy process is finished you will receveive a pop-up message that will inform you.  
Step 5 of [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#5-deploy-the-project-through-the-api-console) section of Mia-Platform documentation will explain in detail how to correctly deploy your project.

## Try it

Now, if you copy/paste the following url in the search bar of your broser (remember to replace `<YOUR_PROJECT_HOST>` with the real host of your project):

```shell
https://<YOUR_PROJECT_HOST>/graphql/
```

You should access to GraphQL Playground, a graphical IDE for GraphQL. For more information about GraphQL Playground you can visit [GraphQL Playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/) section of Apollo Server documentation.

Since there are no books in your CRUD, you should first launch a POST request on your terminal to populate your bookstore:

```shell
curl --request POST \
  --url https://<YOUR_PROJECT_HOST>/v2/books/ \
  --header 'accept: */*' \
  --header 'content-type: application/json' \
  --data '{"name":"foo","__STATE__":"PUBLIC"}'
  ```

After launching this command you should see in your terminal the id (<YOUR_BOOK_ID>) of the book that you have just inserted in your CRUD.

Now, you can type the following query on the left side of GraphQL Playground:

```GraphQL
{
  collection(name: "books-crud") {
    list {
      _id,
      name
    }
  }
}
```

the response that you see should on the right side of GraphQL Playground should be like the following:

```json
{
  "data": {
    "collection": {
      "list": [
        {
          "_id": "<YOUR_BOOK_ID>",
          "name": "foo"
        }
      ]
    }
  }
}
```

Congratulations! You have successfully learnt how to use our Node.js _GraphQL_ Example on the DevOps Console!

[github-actions]: https://github.com/mia-platform-marketplace/GraphQL-Custom-Plugin-Example/actions
[github-actions-svg]: https://github.com/mia-platform-marketplace/GraphQL-Custom-Plugin-Example/workflows/Node.js%20CI/badge.svg
[coverall-svg]: https://coveralls.io/repos/github/mia-platform-marketplace/GraphQL-Custom-Plugin-Example/badge.svg?branch=master
[coverall-io]: https://coveralls.io/github/mia-platform-marketplace/GraphQL-Custom-Plugin-Example?branch=master
