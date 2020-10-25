const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Node = new Schema({
    shortName: {
        type: String,
        required: [true, 'Insert a shortName.'],
    },
    longitude: {
        type: Number,
        required: [true, 'Insert a longitude.'],
    },
    latitude: {
        type: Number,
        required: [true, 'Insert a latitude.'],
    },      
});


// Export the model
module.exports = mongoose.model('Node', Node);
