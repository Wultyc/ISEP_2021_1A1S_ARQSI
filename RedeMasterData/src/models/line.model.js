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
        type: mongoose.Schema.Types.ObjectId, ref: 'Node', 
        required: [true, 'Insert the lines begin Node id.']
    },
    finalNode: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Node', 
        required: [true, 'Insert the lines final Node id.']
    },

    // Routes
    route: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Route',
        required: [true, 'A line must have exactly 2 routes.'],
    }],

    // Restriciton Tripulant Type
    tripulantType: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'TripulantType'
    }],

    // Restriciton Vehicle Type
    vehicleType: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'VehicleType'
    }]

});

// Export the models
module.exports = mongoose.model('Line', Line, 'lines');




