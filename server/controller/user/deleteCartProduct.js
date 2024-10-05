const cartProductModel = require("../../models/cartProductModel")

 const deleteCartProduct = async(req,res) => {
    try {
        const currentUserId = req.userId
        const cartProductId = req.body._id

        const deleteProduct = await cartProductModel.deleteOne({_id : cartProductId})

        res.json({
            message: "Product deleted from cart!",
            error:false,
            success:true,
            data: deleteProduct
        })
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
 }
 module.exports = deleteCartProduct