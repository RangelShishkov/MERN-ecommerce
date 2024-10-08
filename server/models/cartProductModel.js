const mongoose = require("mongoose");

const cartProductSchema = new mongoose.Schema(
  {
    productId: {
      ref: 'product',
      type: String,
    },
    quantity: Number,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const cartProductModel = mongoose.model("cartProduct", cartProductSchema);

module.exports = cartProductModel;
