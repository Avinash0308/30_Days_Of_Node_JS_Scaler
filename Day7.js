const express = require('express');
const app = express();

// Middleware to log incoming requests
function requestLoggerMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  console.log(`${timestamp} - ${method} request received`);
  next();
}

// Middleware to authenticate users
function authenticateMiddleware(req, res, next) {
  // Check if the user is authenticated
  // For demonstration purposes, let's assume authentication is successful
  req.user = { username: 'exampleUser' };
  next();
}

// Apply middleware to all routes
app.use(requestLoggerMiddleware);

// Define a route with middleware
app.get('/', authenticateMiddleware, (req, res) => {
  res.send(`Welcome, ${req.user.username}!`);
});

// Define another route without middleware
app.get('/public', (req, res) => {
  res.send('This is a public route.');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
