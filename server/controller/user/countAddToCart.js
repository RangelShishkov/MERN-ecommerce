const cartProductModel = require("../../models/cartProductModel");

const countAddToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const count = await cartProductModel.countDocuments({
      userId: userId
    });
    res.json({
      data: {
        count: count
      },
      message: "ok",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = countAddToCart
