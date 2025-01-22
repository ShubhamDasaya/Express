const express = require('express');
const app = express();

// Application-level middleware to log request details
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Move to the next middleware or route handler
};

// Application-level middleware to parse JSON data
app.use(express.json()); // Built-in middleware to parse JSON in the request body

// Use the logRequest middleware for all routes
app.use(logRequest);

// Route 1: A simple GET route
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

// Route 2: A POST route to handle JSON data
app.post('/data', (req, res) => {
    console.log('Received data:', req.body);
    res.send('Data received successfully!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
