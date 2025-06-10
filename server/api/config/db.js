/* MongoDB Connection */
const colors = require('colors'); // For styling success message
const mongoose = require('mongoose'); // Import Mongoose

const connectDB = async() => {
    const conn = await mongoose.connect(process.env.MONGO_URI); // Uses .env variable MONGO_URI to connect

    // Log connection success message using colors package for style
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);

    /*  Chainable methods provided by the colors package:
            .cyan       — colors the text cyan (light blue).
            .underline  — underlines the text.
            .bold       — makes the text bold.
    */
};

module.exports = connectDB;