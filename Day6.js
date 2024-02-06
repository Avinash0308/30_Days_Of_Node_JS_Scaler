const express = require("express");
const app = express();
const port = 3005;

/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function greetHandler(req, res) {
  const name = req.query.name || "guest"; // Get the value of the "name" query parameter or use 'Guest' as default
  res.send(`Hello 🙏, ${name}!`); // Send the personalized greeting
}

// Define the route
app.get("/greet", greetHandler);
app.get("/greet?name=Avinash",greetHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
