
const Product = require("../models/productModel.js")
const asyncHandler = require("express-async-handler")

// @desc get all products
// @route  GEt /api/products
// @access public 
const getProducts =  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })

// @desc get a product
// @route  GEt /api/products/:id
// @access public 
const getProductById =  asyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id)
      if(product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error(`product not found`)
    }
  })


module.exports = {getProducts, getProductById}
