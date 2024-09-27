const mongoose = require("mongoose");

const cartProductSchema = new mongoose.Schema(
  {
    productId: String,
    userId: String,
    quantity: Number,
  },
  {
    timestamps: true,
  }
);

const cartProductModel = mongoose.model("cartProduct", productSchema);

module.exports = cartProductModel;
