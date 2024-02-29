function errorHandler(err, req, res, next) {
  // Log the error for debugging purposes
  console.error(err);

  // Default status code and error message
  let statusCode = 500;
  let errorMessage = "Internal Server Error";

  // Check if the error is a known type or has a specific status code
  if (err instanceof SyntaxError && err.status === 400) {
    // Handle syntax errors (e.g., JSON parsing errors)
    statusCode = 400;
    errorMessage = "Bad Request";
  } else if (err.status) {
    // Handle errors with explicit status codes
    statusCode = err.status;
    errorMessage = err.message || "Unknown Error";
  }

  // Send the error response to the client
  res.status(statusCode).json({ error: errorMessage });
}

module.exports = errorHandler;
