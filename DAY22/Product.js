const mongoose = require("mongoose");

// Define the schema for the Product entity
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

// Create a Mongoose model using the schema
const Product = mongoose.model("Product", productSchema);

/**
 * Creates a new product in MongoDB
 * @param {Object} product - Product object with properties name, price, and quantity
 * @returns {Promise} - Promise that resolves with the created product
 */
async function createProduct(product) {
  try {
    const createdProduct = await Product.create(product);
    return createdProduct;
  } catch (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }
}

/**
 * Retrieves all products from MongoDB
 * @returns {Promise} - Promise that resolves with an array of product objects
 */
async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

/**
 * Updates a product in MongoDB
 * @param {string} productId - ID of the product to update
 * @param {Object} updatedProduct - Updated product object
 * @returns {Promise} - Promise that resolves with the updated product
 */
async function updateProduct(productId, updatedProduct) {
  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error(`Failed to update product: ${error.message}`);
  }
}

/**
 * Deletes a product from MongoDB
 * @param {string} productId - ID of the product to delete
 * @returns {Promise} - Promise that resolves with a message confirming deletion
 */
async function deleteProduct(productId) {
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return "Product deleted successfully";
  } catch (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
