const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const Article = mongoose.model("Article");

const getStock = async (products) => {
  const productArticles = await Promise.all(
    products
      .map((product) => {
        return product.contain_articles.map((article) => {
          return Article.findOne({ art_id: article.art_id });
        });
      })
      .flat()
  );

  let productsTotal = [];

  for (let i = 0; i < products.length; i++) {
    let total = null;
    for (var j = 0; j < products[i].contain_articles.length; j++) {
      const amount = parseInt(products[i].contain_articles[j].amount_of);
      const stock = parseInt(productArticles[i + j + i * 2].stock);
      const division = Math.floor(stock / amount);
      if (total === null) {
        total = division;
      } else {
        total = Math.min(total, division);
      }
    }
    productsTotal.push({
      id: products[i]._id,
      name: products[i].name,
      total,
    });
  }

  return productsTotal;
};

module.exports.list = async (req, res) => {
  let products = await Product.find();

  if (products.length > 0) {
    const productsTotal = await getStock(products);

    return res.status(200).json(productsTotal);
  } else {
    return res.status(200).json([]);
  }
};

module.exports.delete = async (req, res, next) => {
  const session = await Article.startSession();

  session.startTransaction();
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }

    const productsTotal = await getStock([product]);

    if (productsTotal.length > 0) {
      if (productsTotal[0].total === 0) {
        return res.status(404).json({ message: "Product out of stock" });
      }
    }

    const articles = product.contain_articles;

    await Promise.all(
      articles.map((article) => {
        return Article.findOneAndUpdate(
          { art_id: article.art_id },
          { $inc: { stock: -article.amount_of } }
        ).session(session);
      })
    );

    await session.commitTransaction();
    res.status(204).json([]);
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};
