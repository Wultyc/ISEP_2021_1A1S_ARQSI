import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const Node = new Schema({
    shortName: {
        type: String,
        required: [true, 'Insert a shortName.'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Insert a name.'],
    },
    longitude: {
        type: Number,
        required: [true, 'Insert a longitude.'],
    },
    latitude: {
        type: Number,
        required: [true, 'Insert a latitude.'],
    },
    // estações de recolha de autocarros
    collectionNode: {
        type: Boolean,
        required: [true, 'Insert if it is a Collection Node.'],
    },
    // estações de troca de condutores
    surrenderNode: {
        type: Boolean,
        required: [true, 'Insert if it is a Surrender Node.'],
    }
});

Node.index({ longitude: 1, latitude: 1 }, { unique: true });

// Export the model
export default mongoose.model('Node', Node);
