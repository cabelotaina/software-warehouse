const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products");

// * Get all products and quantity of each that is an available with the current inventory
router.get("/products", productsController.list);

// * Remove (Sell) a product and update the inventory accordingly
router.delete("/products/:id", productsController.delete);

module.exports = router;