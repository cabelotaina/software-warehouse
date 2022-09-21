const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products");

router.get("/products", productsController.list);
router.delete("/products/:id", productsController.delete);

module.exports = router;