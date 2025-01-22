const express = require('express');
const app = express();

// Route for the homepage
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

// Route for a specific page
app.get('/about', (req, res) => {
    res.send('About us page!');
});

// Middleware to handle 404 errors (when no route matches)
app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error); // Pass the error to the error-handling middleware
});

// Error-handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500); // Use the error status or default to 500
    res.send({
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

// Sequence of Code Execution in Express.js 
// In Express, the sequence of code execution follows a specific order based on
// how middleware and routes are defined in your application. Express processes 
// requests in a top-to-bottom manner, executing middleware and routes in the 
// order they are written in the code. --- ### Steps to Determine If a Route Is Defined: 
// 1. **Incoming Request**: - When a request arrives (e.g., `GET /about`)
// , Express starts at the top of your code and checks each route or middleware one by one.
//  2. **Route Matching**: - Express checks if the **HTTP method** (`GET`, `POST`, etc.) 
//  and **URL** (e.g., `/about`) match any of the defined routes. 
//  - If a match is found, it executes the corresponding route handler.
//   3. **No Matching Route**: - If Express doesn’t find a matching route,
//    the request continues to the next middleware. This is why we use a `next()`
//     function to pass control. 4. **404 Middleware**: - If no route matches,
//      the request eventually reaches the **404 middleware**, which is specifically 
//      designed to handle cases where no routes are defined for the requested path. 
//      5. **Error-Handling Middleware**: - If an error occurs (explicitly or implicitly), 
//      it is passed to the **error-handling middleware**, 
// which catches the error and sends an appropriate response