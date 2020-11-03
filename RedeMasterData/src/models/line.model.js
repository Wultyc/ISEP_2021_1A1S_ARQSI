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
        ref: 'Node', 
        required: [true, 'Insert the begin Node id.']
    },
    finalNode: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Node', 
        required: [true, 'Insert the final Node id.']
    },

    // Restriciton Tripulant Type
    tripulantType: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'TripulantType'
    }],

    // Restriciton Vehicle Type
    vehicleType: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'VehicleType'
    }]

});

// Export the models
module.exports = mongoose.model('Line', Line);
