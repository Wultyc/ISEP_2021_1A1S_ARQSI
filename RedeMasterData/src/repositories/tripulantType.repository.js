const mongoose = require('mongoose');
const TripulantTypeModel = require('../models/tripulantType.model');
var ObjectID = require('mongodb').ObjectID;

class TripulantTypeRepository {
    constructor() { }

    getById(id, callback){
        mongoose.model('TripulantType').findOne({"_id": id}, callback);
    };

    saveTrip(tripulantType, callback) {
        console.log('Saving tripulant type in the repository.. ' + tripulantType);
        tripulantType.save(callback);
    };

}

module.exports = TripulantTypeRepository;