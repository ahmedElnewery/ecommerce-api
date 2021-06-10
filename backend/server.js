const express = require("express")
const app = express()
const dotenv = require("dotenv")
const products = require("./data/products.js")
const connectDB = require("./config/db.js")
const productRouter = require("./routes/productRoute.js")
const userRouter = require("./routes/userRoute")
const cors = require('cors')
const { errorHandler, notFound } = require("./middleware/errorMiddleware.js")
dotenv.config()
connectDB()
app.use(cors())
const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
app.listen(
  PORT,
  console.log(`server running in ${NODE_ENV} mode on port ${PORT}`)
)

app.use(express.json())
app.use("/api/products", productRouter)
app.use("/api/users", userRouter)

app.use(errorHandler)
app.use(notFound)

app.get("/", (req, res) => {
  res.send("Api is running")
})
app.get("/api/products", (req, res) => {
  res.json(products)
})
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})
