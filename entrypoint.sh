docker exec -it application-source-code-mongo1-1 mongosh --eval '
      db = (new Mongo("localhost:27017")).getDB("test");
      config = { "_id" : "my-mongo-set",
      "members" : [
        {
          "_id" : 0,
          "host" : "mongo1:27017"
        },
        {
          "_id" : 1,
          "host" : "mongo2:27017"
        },
        {
          "_id" : 2,
          "host" : "mongo3:27017"
        }
      ]
      };
      rs.initiate(config);
'