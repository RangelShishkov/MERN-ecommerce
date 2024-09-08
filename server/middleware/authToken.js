const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(200).json({
        message: "User not login",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        console.log("error - ", err);
      }
      req.userId = decoded?._id;
      next();
    });

    console.log(token);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
