const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Line = new Schema({
    Orientation: {
        type: Schema.Types.ObjectId, ref: 'Orientation',
    },
    // Lista de Percursos
    Routes: [{
        type: Schema.Types.ObjectId, ref: 'Route',
    }]    
});

var Orientation = new Schema({
    type: {
        type: String,
        required: [true, 'Insert a type.'],
    },   
});

// Export the model
module.exports = mongoose.model('Orientation', Orientation);
module.exports = mongoose.model('Line', Line);
