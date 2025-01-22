const express = require('express');
const app = express();

// A regular route
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

// A route that triggers an error
app.get('/error', (req, res, next) => {
    const error = new Error('Something went wrong!');
    error.status = 500; // Set HTTP status code
    next(error); // Pass the error to the error-handling middleware
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.message); // Log the error message
    res.status(err.status || 500).send({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
