const mongoose = require("mongoose");
const User = require("./User");
const express = require('express');
const averageAgeOfUsers = require('./averageAgeOfUsers');
const app = express();

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
addUserToDatabase({ username: "Avi0308", email: "avi1@gmail.com", age: 25 });
addUserToDatabase({ username: "Tulsi", email: "avi2@gmail.com", age: 12 });
addUserToDatabase({ username: "RAvi", email: "avi3@gmail.com", age: 50 });
addUserToDatabase({ username: "XYz", email: "avi4@gmail.com", age: 21 });
addUserToDatabase({ username: "Remove", email: "avi5@gmail.com", age: 33 });
addUserToDatabase({ username: "Tourist", email: "avi6@gmail.com", age: 15 });
addUserToDatabase({ username: "Avinash", email: "avi7@gmail.com", age: 19 });


// Define route
app.get('/average-age', averageAgeOfUsers);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
