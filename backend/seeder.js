const connectDB = require("./config/db")
const dotenv = require("dotenv")

const products = require("./data/products")
const users = require("./data/users")

const Order = require("./models/orderModel")
const Product = require("./models/productModel")
const User = require("./models/userModel")

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })
    await Product.insertMany(sampleProducts)
    console.log("data imported successfully")
    process.exit()
  } catch (error) {
    console.error("Error in importing Data", error)
    process.exit(1)
  }
}
const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log("data destroyed successfully")
    process.exit()
  } catch (error) {
    console.error("Error in destroying Data", error)
    process.exit(1)
  }
}
if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
