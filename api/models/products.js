const { Decimal128 } = require("bson");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Decimal128,
      required: true,
    },
    currency: {
      type: String,
      default: 'EUR',
      required: true,
    },
    contain_articles: [
      {
        art_id: String,
        amount_of: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
