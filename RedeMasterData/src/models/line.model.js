const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Line = new Schema({
    code: {
        type: String,
        required: [true, 'Insert a code.'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Insert a name.']
    },
    
    // Nodes
    beginNode: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'node', 
        required: [true, 'Insert the begin Node id.']
    },
    finalNode: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'node', 
        required: [true, 'Insert the final Node id.']
    },

    // TODO: Restrições tipo de tripulante
    // TODO: Restrições tipo de viatura
});

// Export the models
module.exports = mongoose.model('Line', Line);
