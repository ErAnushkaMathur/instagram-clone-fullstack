const express = require("express")
const userModel = require("../models/userModel")
const authRouter = express.Router()
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const authController = require("../controllers/auth.controller")
const identifyUser= require("../middlewares/auth.middleware")

/**POST/ap/auth/register */
authRouter.post("/register", authController.registerController )


/**POST/ap/auth/login */

authRouter.post("/login", authController.loginController)


/**@route GET /api/auth/get-me 
 *@desc Get the currently lgged in user's information
 *@access Private */

authRouter.get("/get-me",identifyUser, authController.getMeController)

module.exports = authRouter