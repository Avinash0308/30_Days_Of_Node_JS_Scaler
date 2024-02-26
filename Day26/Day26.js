const mongoose = require("mongoose");
const getProductStatistics = require("./getProductStatistics.js");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://avinash03082003:Sa7UDVEpT7X593S3@cluster0.ypamxdf.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("\n\nConnected to MongoDB");
  })
  .catch((error) => {
    console.error("\n\nError connecting to MongoDB:", error);
  });

// Assume MongoDB is connected and models are imported

// Retrieve products with populated category details

const ProductStatictics = getProductStatistics();
console.log(ProductStatictics);
