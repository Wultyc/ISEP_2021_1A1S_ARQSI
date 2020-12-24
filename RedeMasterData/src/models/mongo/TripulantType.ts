import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const TripulantType = new  Schema({
    description: {
        type: String,
        required: [true, 'Insert a description.'],
        unique: true
    }
});


// Export the model
export default mongoose.model('TripulantType', TripulantType);