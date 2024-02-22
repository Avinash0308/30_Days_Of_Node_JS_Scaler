const mongoose = require("mongoose");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("./Product.js");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://avinash03082003:Sa7UDVEpT7X593S3@cluster0.ypamxdf.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    // Run the CRUD operations

    // Create a product
    createProduct({ name: "Product 1", price: 10, quantity: 100 })
      .then((createdProduct) => {
        console.log("Created product:", createdProduct);

        // Retrieve all products
        return getAllProducts();
      })
      .then((allProducts) => {
        console.log("All products:", allProducts);

        // Update a product
        const productIdToUpdate = allProducts[0]._id;
        return updateProduct(productIdToUpdate, { price: 15 });
      })
      .then((updatedProduct) => {
        console.log("Updated product:", updatedProduct);

        // Delete a product
        const productIdToDelete = updatedProduct._id;
        return deleteProduct(productIdToDelete);
      })
      .then((deletionMessage) => {
        console.log(deletionMessage);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
  });
