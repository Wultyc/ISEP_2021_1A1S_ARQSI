const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Route = new Schema({
    distance: {
        type: Number,
        // determined by summing up the distance of its segments
    },
    duration: {
        type: Number
        // determined by summing up the durantion of its segments
    },
    startTime: {
        type: Number,
        required: [true, 'Insert the routes start time in minutes.']
    },
    endTime: {
        type: Number
        // determined with startTime + duration
    },
    orientation: {
        type: String,
        enum: ['GoingRoute', 'ComingRoute'],
        required: [true, 'Insert a orientation.'],
    },
    isReinforcementRoute: {
        type: Boolean,
        required: [true, 'Insert if it is a reinforcement route.'],
    },
    isEmptyRoute: {
        type: Boolean,
        required: [true, 'Insert if it is an empty route.'],
    },

    // Lista de segmentos
    segment: [{
        type: Schema.Types.ObjectId, ref: 'Segment',
        required: [true, 'Insert at least one segment.'],
    }]
});

Route.index({ orientation: 1, segment: 1 }, { unique: true });

// Export the model
module.exports = mongoose.model('Route', Route);