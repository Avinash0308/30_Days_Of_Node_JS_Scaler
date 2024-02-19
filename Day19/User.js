const mongoose = require("mongoose");

// Define the user schema with validation rules
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        // Regular expression to check if the email format is valid
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
});

// Create a Mongoose model from the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
