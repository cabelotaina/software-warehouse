const express = require("express");
const app = express();

const errorHandlerMiddleware = require("./api/middleware/error-handler.js");

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(cookieParser())

var corsOptions = {
  exposedHeaders: [
    'Accept-Language',
    'Access-Control-Allow-Origin',
    'Connection', 'Content-Length', 'Content-Type', 'Date',
    'Etag', 'Server', 'Via', 'X-Powered-By'
  ]
};
app.use(cors(corsOptions))

require("./api/database");
const routesApi = require("./api/routes/index");

app.use("/api", routesApi);

app.get("/", (req, res) => {
  res.send("Software Warehouse");
});

app.use("/api/*", function (req, res) {
  res.status(404).json({ message: "Not found"});
});

app.use(errorHandlerMiddleware);

module.exports.default = app;
