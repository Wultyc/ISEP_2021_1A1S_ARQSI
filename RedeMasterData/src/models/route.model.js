const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Route = new Schema({
    duration: {
        type: Number,
    },
    distance: {
        type: Number
    },
    orientation: {
        type: String,
        required: [true, 'Insert a orientation.'],
    },

    // Lista de segmentos
    Segments: [{
        type: Schema.Types.ObjectId, ref: 'Segment',
    }]
    
});


// Export the model
module.exports = mongoose.model('Route', Route);
