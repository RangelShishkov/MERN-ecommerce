const cartProductModel = require("../../models/cartProductModel");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const { currentUser } = req?.userId;

    const isProductAvaliable = await cartProductModel.find({ productId });

    if (isProductAvaliable) {
      return res.json({
        message: "Item is already in your cart!",
        success: true,
        error: false,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newCartProduct = new cartProductModel(payload);
    const saveProduct = await newCartProduct.save();

    res.json({
      data: saveProduct,
      message: "product added",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartController