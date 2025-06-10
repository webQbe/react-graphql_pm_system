/* Mongoose Client Model */
const mongoose = require('mongoose');

// Create Client model with 3 fields
const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
});

/* 
   Each document will look like:
    {
        "_id": "...",
        "name": "Tony Stark",
        "email": "ironman@gmail.com",
        "phone": "123-456-7890"
    }

 */

module.exports = mongoose.model('Client', ClientSchema);