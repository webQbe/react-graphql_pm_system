/* /* Mongoose Project Model */ 
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
    },
    clientId: { /* Each project document stores a clientId */
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', 
    // clientId links to a Client document (MongoDB-style "foreign key")
    }
});

module.exports = mongoose.model('Project', ProjectSchema);