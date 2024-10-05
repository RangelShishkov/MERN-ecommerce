const cartProductModel = require("../../models/cartProductModel");

const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const cartProductId = req?.body?._id;

    const qty = req.body.quantity

    const updateProduct = await cartProductModel.updateOne({_id: cartProductId}, {
        ...(qty && {quantity: qty})
    })

    res.json({
        message: "product updated",
        data:updateProduct,
        error: false,
        success: true

    })

  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = updateAddToCartProduct
