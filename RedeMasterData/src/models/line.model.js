const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Line = new Schema({
    code: {
        type: String,
        required: [true, 'Insert a code.'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Insert a name.']
    },

    // Lista de Percursos
    routes: [{
        type: Schema.Types.ObjectId, ref: 'Route',
    }],
    
    // Nodes
    beginNode: {
        type: Schema.Types.ObjectId, ref: 'Node',
    },
    finalNode: {
        type: Schema.Types.ObjectId, ref: 'Node',
    },

    // TODO: Restrições tipo de tripulante
    // TODO: Restrições tipo de viatura
});

// Export the model
module.exports = mongoose.model('Line', Line);
