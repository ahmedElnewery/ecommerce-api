const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const _ = require("lodash");
// @desc   authticate user and get token
// @route   POST /api/users/login
// @access  public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
     
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token:user.generateToken()
    });
  } else {
    res.status(400);
    throw new Error("invalid email or password");
  }
});
// @desc  Register new user
// @route   post /api/users/
// @access  public
const registerUser = asyncHandler(async (req, res) => {
  const existUser = await User.findOne({ email: req.body.email });
  if (existUser)
    return res.status(400).send("the user with this email is alrady exist");
  const user = await User.create(
    _.pick(req.body, ["name", "email", "password"])
  );
  res.json(_.pick(user, ["_id", "name", "email"]));
});

// @desc   get profile access
// @route   GET /api/users/profile
// @access  private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user)
  if (user) {
    res.send(
    user  
    )
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// @desc   update profile
// @route   PUT /api/users/profile
// @access  private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
   const updatedUser =  await user.save()
   return res.json({
     _id: updatedUser._id,
     name: updatedUser.name,
     email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token:updatedUser.generateToken()
  });

  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

module.exports = { authUser, registerUser, getProfile ,updateProfile};
