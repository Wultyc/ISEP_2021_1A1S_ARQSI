const mongoose = require('mongoose');
const TripulantTypeModel = require('../models/tripulantType.model');
var ObjectID = require('mongodb').ObjectID;

class TripulantTypeRepository {
    constructor() { }

    getById(id, callback){
        TripulantTypeModel.findOne({"_id": id}, callback);
    };

    getAll(callback) {
        TripulantTypeModel.find(callback); 
    };

    save(tripulantType, callback) {
        console.log('Saving tripulant type in the repository.. ' + tripulantType);
        tripulantType.save(callback);
    };

    delete(id, callback) {
        TripulantTypeModel.findByIdAndRemove(id, callback) 
    };

}

module.exports = TripulantTypeRepository;