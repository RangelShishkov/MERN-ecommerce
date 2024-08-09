const express = require('express')

const router = express.Router()

const userSingUpController = require("../controller/userSingUp")

router.post("/signup",userSingUpController)


module.exports = router