const express = require('express');     // Import Express
require('dotenv').config();             // Load variables from .env file
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const port = process.env.PORT || 5000;  // Use PORT from .env, fallback to 5000

// Create Express app
const app = express();    

// Connect the schema to a route using express-graphql middleware
app.use('/graphql', graphqlHTTP({
   schema,
   graphiql: process.env.NODE_ENV === 'development' 
}))

// Start server
app.listen(port, console.log(`Server running on port ${port}`));