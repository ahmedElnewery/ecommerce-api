const express = require("express")
const  {authUser, getProfile, registerUser, updateProfile}  = require("../controllers/userControllers")
const authMiddleware = require("../middleware/authMiddleware.js")

const router = express.Router()


router.post("/login", authUser)
router.post("/", registerUser)

router.route("/profile").get(authMiddleware,getProfile).put(authMiddleware,updateProfile)

module.exports= router

