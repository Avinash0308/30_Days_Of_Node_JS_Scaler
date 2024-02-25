const mongoose = require("mongoose");

// Define the schema for the Product entity
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Create a Mongoose model for the Product entity
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
