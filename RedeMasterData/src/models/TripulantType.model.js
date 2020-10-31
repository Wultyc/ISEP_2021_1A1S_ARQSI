const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TripulantType = new  Schema({
    description: {
        type: String,
        required: [true, 'Insert a description.'],
    }
});


// Export the model
module.exports = mongoose.model('TripulantType', TripulantType);