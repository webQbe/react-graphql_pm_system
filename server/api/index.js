const express = require('express');     // Import Express
require('dotenv').config();             // Load variables from .env file
const port = process.env.PORT || 5000;  // Use PORT from .env, fallback to 5000

// Create Express app
const app = express();                  

// Start server
app.listen(port, console.log(`Server running on port ${port}`));