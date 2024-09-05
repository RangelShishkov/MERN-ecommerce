const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Please provide an email!");
    }
    if (!password) {
      throw new Error("Please provide a password!");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    console.log(checkPassword);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.SECRET, {
        expiresIn: "2d",
      });

      const tokenOption = {
        httpOnly:true,
        secure: true
      }
      res.cookie("token", token,tokenOption).status(200).json({
        message: "Login successfully!",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Incorrect password!");
    }
  } catch (err) {
    res.json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
