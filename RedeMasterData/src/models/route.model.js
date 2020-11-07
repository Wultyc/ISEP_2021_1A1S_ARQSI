const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Route = new Schema({
    distance: {
        type: Number,
        required: [true, 'Insert a distance in kilometers.']
    },
    duration: {
        type: Number,
        required: [true, 'Insert a duration in minutes.']
    },
    orientation: {
        type: String,
        enum: ['GoingRoute', 'ComingRoute'],
        required: [true, 'Insert a orientation.'],
    },

    // Lista de segmentos
    segment: [{
        type: Schema.Types.ObjectId, ref: 'Segment',
        required: [true, 'Insert at least one segment.'],
    }]
});

// Export the model
module.exports = mongoose.model('Route', Route);