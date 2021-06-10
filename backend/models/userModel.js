const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)
userSchema.methods.matchPassword =async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}
userSchema.methods.generateToken = function () {
  return jwt.sign({_id: this._id,isAdmin: this.isAdmin}, process.env.TOKEN_PRIVATE_KEY)
}
userSchema.pre("save", async function(next) {
  if(!this.isModified('password')) {
    next()
  }
    const salt = await bcrypt.genSalt(10)
    this.password =await bcrypt.hash(this.password,salt)
    next()
})
const User = mongoose.model("User", userSchema)
module.exports = User
