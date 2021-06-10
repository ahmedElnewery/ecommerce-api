const bcrypt = require("bcrypt")
const users = [
  {
    name: "admin user",
    email: "admin@support.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "ahmed",
    email: "ahmed@support.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "alaa",
    email: "alaa@support.com",
    password: bcrypt.hashSync("13456", 10),
    isAdmin: false,
  },
]
module.exports = users
