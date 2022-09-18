const express = require("express");
const app = express();

app.listen(3000, function () {
  console.log("listening on 3000");
});

app.get("/", (req, res) => {
  res.send("Software Warehouse");
});

// * Get all products and quantity of each that is an available with the current inventory

app.get("/products", (req, res) => {
  res.status(200).json();
});

// * Remove (Sell) a product and update the inventory accordingly
app.get("/products/:id", (req, res) => {
  res.status(200).json({ id: req.params.id });
});
