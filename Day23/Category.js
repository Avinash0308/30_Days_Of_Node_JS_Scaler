const mongoose = require("mongoose");

// Define the schema for the Category entity
const categorySchema = new mongoose.Schema({
  name: String,
});

// Create a Mongoose model for Category
const Category = mongoose.model("Category", categorySchema);

// Define the schema for the Product entity with a reference to Category
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

// Create a Mongoose model for Product
const Product = mongoose.model("Product", productSchema);

/**
 * Retrieves all products with populated category details from MongoDB
 * @returns {Promise<Array>} - Promise that resolves with an array of product objects with populated category details
 */
async function getProductsPopulatedWithCategory() {
  try {
    const products = await Product.find().populate("category").exec();
    return products;
  } catch (error) {
    throw new Error(
      `Failed to fetch products with populated category details: ${error.message}`
    );
  }
}

module.exports = {
  Category,
  Product,
  getProductsPopulatedWithCategory,
};
