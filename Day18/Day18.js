// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const User = require("./User"); // Assuming you have a User model defined

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://avinash03082003:Js2pNrznztrl0Kvy@projectfrt.ppn0dmb.mongodb.net/ProjectFRT?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

/**
 * Express route to get all users from MongoDB
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllUsers(req, res) {
  try {
    // Retrieve all users from the database
    const users = await User.find();
    // Send JSON response with the array of user objects
    res.json(users);
  } catch (err) {
    // If an error occurs, send an error response
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create Express application
const app = express();

// Define Express route to get all users
app.get("/users", getAllUsers);

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
