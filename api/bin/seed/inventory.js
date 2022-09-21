const data = require("../../../files/inventory.json");
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const Articles = require("../../models/articles");
const inventory = data.inventory;

const runSeed = async () => {
  await Articles.deleteMany();
  await Articles.insertMany(inventory);
  await mongoose.connection.close(function () {
    console.log("Mongoose disconnected through seed inventory");
  });
};

runSeed();
