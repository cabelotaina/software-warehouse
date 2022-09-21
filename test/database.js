// database.test.js

const db = require("../api/database");

const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const Article = mongoose.model("Article");

const chai = require("chai");
const expect = chai.expect;


const articleBase = {
  art_id: 5,
  name: "Circular small table top",
  stock: "2",
};

const productBase = {
  name: "Small table",
  price: 9.99,
  contain_articles: [
    { art_id: 1, amount_of: 3 },
    { art_id: 5, amount_of: 1 },
  ],
};

describe("test database", () => {
  it("add a article", async () => {
    const articleBase = {
      art_id: 5,
      name: "Circular small table top",
      stock: "2",
    }
    const article = await Article.create(articleBase);
    expect(article.art_id).equal(articleBase.art_id);
    expect(article.name).equal(articleBase.name);
    expect(article.stock).equal(parseInt(articleBase.stock));

  });

  it("Add a product", async () => {
    const product = await Product.create(productBase);
    expect(product.name).equal(productBase.name);
    expect(product.price.toString()).equal(productBase.price.toString());
    expect(product.contain_articles.art_id).equal(productBase.contain_articles.art_id);
    expect(product.contain_articles.amount_of).equal(productBase.contain_articles.amount_of);
  });

  after(function () {
    mongoose.connection.close();
  });
});
