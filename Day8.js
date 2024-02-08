/**
 * Express route to handle requests with a positive integer parameter
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

// Error handling middleware
function errorHandler(err, req, res, next) {
  if (err instanceof PositiveIntegerError) {
    res
      .status(400)
      .json({ error: 'Parameter "number" must be a positive integer' });
  } else {
    next(err);
  }
}

// Custom error class for positive integer validation error
class PositiveIntegerError extends Error {
  constructor(message) {
    super(message);
    this.name = "PositiveIntegerError";
  }
}

// Express route handler
function positiveIntegerHandler(req, res, next) {
  const { number } = req.query;

  if (
    !number ||
    isNaN(number) ||
    parseInt(number) <= 0 ||
    !Number.isInteger(parseFloat(number))
  ) {
    next(
      new PositiveIntegerError('Parameter "number" must be a positive integer')
    );
  } else {
    res.json({ message: "Success" });
  }
}

// Express application setup
const express = require("express");
const app = express();

// Middleware setup
app.use(express.json());

// Route setup
app.get("/positive", positiveIntegerHandler);
app.get("/positive?number=5",positiveIntegerHandler);
app.get("/positive?number=-5",positiveIntegerHandler);

// Error handling middleware setup
app.use(errorHandler);

// Server setup
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
