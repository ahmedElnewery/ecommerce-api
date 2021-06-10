const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      //options
      useNewUrlParser: true, //important for connection
      useUnifiedTopology: true, // using the MongoDB driver's new connection management engine
      useCreateIndex: true, //to use createIndex()
    })
    console.log("mongoDB connected" + connection.connection.host)
  } catch (error) {
    console.error("Error:" + error.message)
    process.exit(1) // 0 for success,1 for failure
  }
}
module.exports = connectDB
