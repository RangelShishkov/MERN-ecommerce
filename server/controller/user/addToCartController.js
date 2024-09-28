const cartProductModel = require("../../models/cartProductModel");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const  currentUser  = req.userId;
    console.log("cur user",currentUser)
    const isProductAvaliable = await cartProductModel.findOne({ productId });

    if (isProductAvaliable) {
      return res.json({
        message: "Item is already in your cart!",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newCartProduct = new cartProductModel(payload);
    const saveProduct = await newCartProduct.save();

    return res.json({
      data: saveProduct,
      message: "Product added in cart",
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