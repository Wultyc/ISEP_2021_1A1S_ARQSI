const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Segment = new Schema({
    duration: {
        type: Number,
        required: [true, 'Insert a duration.'],
    },
    distance: {
        type: Number,
        required: [true, 'Insert a distance.'],
    },

    // Não sei o que simboliza.....
    sequence: {
        type: String,
        required: [true, 'Insert a sequence.'],
    },

    // Nodes
    BeginNode: {
        type: Schema.Types.ObjectId, ref: 'Node',
    },
    FinalNode: {
        type: Schema.Types.ObjectId, ref: 'Node',
    }
});


// Export the model
module.exports = mongoose.model('Segment', Segment);
