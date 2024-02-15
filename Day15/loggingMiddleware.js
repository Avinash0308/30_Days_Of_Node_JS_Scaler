function loggingMiddleware(req, res, next) {
  // Get current timestamp
  const timestamp = new Date().toISOString();

  // Log request details
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  // Call next middleware
  next();
}

// Export the middleware function
module.exports = loggingMiddleware;
