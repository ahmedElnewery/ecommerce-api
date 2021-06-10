const AsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = AsyncHandler(async function (req, res, next) {
  let token = "";

  if (
    req.headers["x-auth-token"] &&
    req.headers["x-auth-token"].startsWith("Bearer")
  ) {
    token = req.headers["x-auth-token"].split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
      req.user = await User.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      return res.status(401).send("Access denied");
    }
  } else {
    return res.status(401).send("there is no token provided");
  }
});
