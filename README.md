# README

This is a small piece of software warehouse, is a REST API using NodeJS (Express) and MongoDB.

The sistem use docker and docker compose for the development envronment and you can run the development envronment using:

```sh
    docker-compose up --build --remove-orphans
```

After run the application you need to import two files, the first with two products and the second with the inventory (four articles):

```sh
    
    docker compose run --rm software-warehouse npm run seed:products -d
    docker compose run --rm software-warehouse npm run seed:inventory -d

```

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

