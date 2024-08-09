const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    const userEmail = await userModel.findOne({email})
    const userName = await userModel.findOne({name})

    if(userEmail){
      throw new Error("Account with this EMAIL already exists!")
    }
    if(userName){
      throw new Error("This USERNAME is already taken!")
    }

    if (!email) {
      throw new Error("Please provide an email!");
    }
    if (!password) {
      throw new Error("Please provide a password!");
    }
    if (!name) {
      throw new Error("Please provide a name!");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something went wrong!");
    }

    const payload = {
      ...req.body,
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      eror: false,
      message: "User created successfully!"
    });

  } catch (err) {
    res.json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController