const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteNodes = new Schema({
    nodeId: { type: Schema.Types.ObjectId, ref: 'Node', required: [true, 'Insert at least one segment.'] },
    distance: { type: Number, required: [true, 'Insert the nodes distance.'] },
    duration: { type: Number, required: [true, 'Insert the nodes duration.'] }
},{ _id: false });

var Route = new Schema({
    distance: {
        type: Number,
        // determined by summing up the distance of its segments
    },
    duration: {
        type: Number
        // determined by summing up the durantion of its segments
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
    routeNodes: [RouteNodes]
});

// TODO: make routeNodes unique

// Export the model
module.exports = mongoose.model('Route', Route);