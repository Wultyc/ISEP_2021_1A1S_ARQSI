const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LineRoutes = new Schema({
    routeId: { type: Schema.Types.ObjectId, ref: 'Route', required: [true, 'Insert at least two segment.'] },
    orientation: { type: String, enum: ['Go', 'Return'], required: [true, 'Insert a orientation.'] }
},{ _id: false });

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
    color: {
        type: String,
        required: [true, 'Insert a colour.']
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
    lineRoutes: [LineRoutes],

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




