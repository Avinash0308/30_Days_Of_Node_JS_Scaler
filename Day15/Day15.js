const express = require('express');
const loggingMiddleware = require('./loggingMiddleware');

const app = express();

// Use logging middleware
app.use(loggingMiddleware);

// Sample routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/api/users', (req, res) => {
  const { username, email } = req.body;
  // Save user to database or perform other actions
  res.send(`User ${username} with email ${email} created successfully!`);
});

// Define more routes as needed

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
