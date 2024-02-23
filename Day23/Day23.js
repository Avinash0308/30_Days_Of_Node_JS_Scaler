const mongoose = require("mongoose");
const {
    Category,
    Product,
    getProductsPopulatedWithCategory,
} = require("./Category.js");

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

// Create categories
const category1 = Category.create({ name: 'Electronics' });
const category2 = Category.create({ name: 'Clothing' });

// Create products with associated categories
Product.create({ name: 'Laptop', price: 40000, quantity: 10, category: category1._id });
Product.create({ name: 'Mobile', price: 10000, quantity: 10, category: category1._id });
Product.create({ name: 'Tablet', price: 15000, quantity: 10, category: category1._id });
Product.create({ name: 'Remote', price: 1000, quantity: 10, category: category1._id });
Product.create({ name: 'T-shirt', price: 200, quantity: 50, category: category2._id });
Product.create({ name: 'Hoodie', price: 2000, quantity: 50, category: category2._id });
Product.create({ name: 'Pant', price: 2000, quantity: 50, category: category2._id });
Product.create({ name: 'Lower', price: 200, quantity: 50, category: category2._id });

// Retrieve products with populated category details
const productsWithCategory = getProductsPopulatedWithCategory();
console.log(productsWithCategory);
