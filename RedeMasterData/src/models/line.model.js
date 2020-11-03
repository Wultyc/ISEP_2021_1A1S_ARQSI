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

    // Restriciton Tripulant Type
    tripulantType: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'tripulantType'
    }],

    // Restriciton Vehicle Type
    vehicleType: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'vehicleType'
    }]

});

// Export the models
module.exports = mongoose.model('Line', Line);
