const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FuelType = new  Schema({
    type: {
        type: String,
        required: [true, 'Insert a type.'],
    }
});


// Export the model
module.exports = mongoose.model('FuelType', FuelType);