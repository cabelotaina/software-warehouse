const express = require("express");
const app = express();
const errorHandlerMiddleware = require("./api/middleware/error-handler.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const winston = require("winston"),
  expressWinston = require("express-winston");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

var corsOptions = {
  exposedHeaders: [
    "Accept-Language",
    "Access-Control-Allow-Origin",
    "Connection",
    "Content-Length",
    "Content-Type",
    "Date",
    "Etag",
    "Server",
    "Via",
    "X-Powered-By",
  ],
};
app.use(cors(corsOptions));

require("./api/database");
const router = require("./api/routes/index");

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
      return false;
    },
  })
);

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Software Warehouse");
});

app.use("/api/*", function (req, res) {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandlerMiddleware);

module.exports.default = app;
