var mongoose = require("mongoose");

mongoose.Promise = Promise;

console.log("Your process env:" + process.env.NODE_ENV);

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", function () {
  console.log("Mongoose connected to " + process.env.MONGO_URI);
});
mongoose.connection.on("error", function (err) {
  console.log("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});

const gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected through " + msg);
    callback();
  });
};

process.once("SIGUSR2", function () {
  gracefulShutdown("nodemon restart", function () {
    process.kill(process.pid, "SIGUSR2");
  });
});

process.on("SIGINT", function () {
  gracefulShutdown("app termination", function () {
    process.exit(0);
  });
});

require('./models/products');
require('./models/articles');