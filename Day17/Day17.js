const mongoose = require("mongoose");
const User = require("./User");

mongoose
  .connect(
    "mongodb+srv://avinash03082003:Js2pNrznztrl0Kvy@projectfrt.ppn0dmb.mongodb.net/ProjectFRT?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("\n\nConnected to MongoDB");
  })
  .catch((error) => {
    console.error("\n\nError connecting to MongoDB:", error);
  });

/**
 * Adds a new user to the MongoDB database
 * @param {Object} user - User object with properties username and email
 */
async function addUserToDatabase(user) {
  try {
    const newUser = new User(user);
    await newUser.save();
    console.log("\n\nUser added successfully");
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

// Example usage:
addUserToDatabase({ username: "Avi0308", email: "avi@gmail.com" });
