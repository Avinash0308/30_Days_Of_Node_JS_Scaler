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
  .then(() => console.log("\nConnected to MongoDB"))
  .catch((err) => console.error("\nError connecting to MongoDB:", err));

// Function to add a new user with validation
async function addUserWithValidation(user) {
  try {
    // Create a new user instance
    const newUser = new User(user);
    // Attempt to save the user to the database
    await newUser.save();
    console.log("\nUser added successfully!");
  } catch (error) {
    console.error("\nError adding user: ", error.message);
  }
}

// Example usage
addUserWithValidation({
  username: "Avi_AG",
  email: "avinash03082003@gmail.com",
});
addUserWithValidation({ username: "Avi_AG", email: "abcd.gmail.com" });
