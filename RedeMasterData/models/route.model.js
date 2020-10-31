const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Route = new Schema({
    duration: {
        type: Number,
    },
    distance: {
        type: Number
    },

    // Nodes
    BeginNode: {
        type: Schema.Types.ObjectId, ref: 'Node',
    },
    FinalNode: {
        type: Schema.Types.ObjectId, ref: 'Node',
    },

    // Lista de segmentos
    Segments: [{
        type: Schema.Types.ObjectId, ref: 'Segment',
    }]
    
});


// Export the model
module.exports = mongoose.model('Route', Route);
