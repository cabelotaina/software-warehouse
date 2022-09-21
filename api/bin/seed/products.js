const data = require("../../../files/products.json");
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const Products = require("../../models/products");
data.products[0].price = 15.50;
data.products[1].price = 30.00;
const products = data.products;

const runSeed = async () => {
  await Products.deleteMany();
  await Products.insertMany(products);
  await mongoose.connection.close(function () {
    console.log("Mongoose disconnected through seed products");
  });
};

runSeed();
