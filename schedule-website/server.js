const express = require('express');
const app = express();
const port = 3000; // You can change this port if needed
const path = require('path'); // Add this line to work with file paths

// Serve static files from the 'schedule-website' folder
app.use(express.static(path.join(__dirname, 'schedule-website')));

// Define a route to serve the HTML file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'schedule-website', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
