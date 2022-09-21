# README

This is a small piece of a software warehouse, is a REST API using NodeJS (Express) and MongoDB and some another libraries like mocha and chai for initial test purposes.

The sistem use docker and docker compose for the development envronment and you can run the development envronment using:

```sh
    docker-compose up --build --remove-orphans
```

## Import file

After run the application you need to import two files, the first with two products and the second with the inventory (four articles):

```sh
    
    docker compose run --rm software-warehouse npm run seed:products
    docker compose run --rm software-warehouse npm run seed:inventory

```

## Test database

Use this command to run the database tests:

```sh
    docker compose run --rm software-warehouse npm run test:database
```

## Test endpoints

We have only two enpoints `GET /products` to retrieve all the products and it's quantities, and `DELETE /products/:id`, it's sell a product removing the articles from the inventory.

Use this command to run the the API tests:

```sh
    npm i
    npm run test:products
```

* Before run the api test import the products and inventory files, in the a [secction](#import-file) above.
* TODO: Is necessary create a test environment for test purposes.
* TODO: Use the API tests in the pipeline aproval.

## Next steps

* pipeline to generate and registry the docker image
* create a configuration repository for Argo CD
* Configure kubernetes and Argo CD to read the configure repository
* configure a mongo db replica set
* Load test with jmeter

## Debug

For debug the code you can use the command changing the line `CMD npm run start:dev` of Dockerfile.dev to the line below:

```json
    npm run start:debug
```

Before this you can use google chrome to debug the code.

* TODO: Is necessary test why is not working with vscode.
