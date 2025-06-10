/* Main Server File */
const express = require('express');     // Import Express
const colors = require('colors');       // For styling success message in config/db.js
require('dotenv').config();             // Load environment variables with dotenv
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db'); // Load connectDB()
const port = process.env.PORT || 5000;    // Use PORT from .env, fallback to 5000

// Create Express app
const app = express();    


connectDB(); // Establish MongoDB connection before server starts

// Connect the schema to a route using express-graphql middleware
app.use('/graphql', graphqlHTTP({
   schema,
   graphiql: process.env.NODE_ENV === 'development' 
}))

// Start server
app.listen(port, console.log(`Server running on port ${port}`));