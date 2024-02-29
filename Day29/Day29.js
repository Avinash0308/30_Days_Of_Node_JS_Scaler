const express = require('express');
const errorHandler = require('./errorHandler');

const app = express();

// Example route handlers
app.get('/', (req, res) => {
    // Simulate an error (e.g., accessing an undefined variable)
    const undefinedVariable = someUndefinedVariable;
});

app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    // Simulate an error (e.g., querying a user that doesn't exist)
    if (userId !== '123') {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }

    // Simulate a successful response
    res.json({ id: userId, name: 'John Doe' });
});

// Add the errorHandler middleware as the last middleware
app.use(errorHandler);

// Start the Express server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
