const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var VehicleType = new  Schema({
    description: {
        type: String,
        required: [true, 'Insert a description.'],
        unique: true
    },
    autonomy: {
        type: Number,
        required: [true, 'Insert the autonomy.']
    },
    costPerKilometer: {
        type: Number,
        required: [true, 'Insert the cost per kilometer.']
    },
    averageCost: {
        type: Number,
        required: [true, 'Insert the average cost.']
    },
    averageSpeed: {
        type: Number,
        required: [true, 'Insert a average speed.']
    },
    fuelType: {
        type: String,
        enum: ['Gasoleo', 'GPL', 'Hidrogenio', 'Eletrico', 'Gasolina'],
        required: [true, 'Insert the fuel type.']
    }
});


// Export the model
module.exports = mongoose.model('VehicleType', VehicleType);