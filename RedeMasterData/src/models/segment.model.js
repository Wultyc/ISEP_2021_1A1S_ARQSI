const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Segment = new Schema({
    distance: {
        type: Number,
        required: [true, 'Insert a distance in kilometers.'],
    },
    duration: {
        type: Number,
        required: [true, 'Insert a duration in minutes.'],
    },
    // Nodes
    beginNode: {
        type: Schema.Types.ObjectId, ref: 'Node',
        required: [true, 'Insert the routes begin Node id.']
    },
    finalNode: {
        type: Schema.Types.ObjectId, ref: 'Node',
        required: [true, 'Insert the routes begin Node id.']
    }
});

Segment.index({ beginNode: 1, finalNode: 1 }, { unique: true });

// Export the model
module.exports = mongoose.model('Segment', Segment);
