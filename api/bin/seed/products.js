const data = require("../../../files/products.json");
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const Products = require("../../models/products");
data.products[0].price = 15.5;
data.products[1].price = 30.0;
const products = data.products;

const runSeed = async () => {
  await Products.deleteMany();
  await Products.insertMany(products);
  await mongoose.connection.close(function () {
    console.log("Mongoose disconnected through seed products");
  });
};

runSeed();