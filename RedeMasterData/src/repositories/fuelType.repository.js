const mongoose = require('mongoose');
const FuelTypeModel = require('../models/fuelType.model');
var ObjectID = require('mongodb').ObjectID;

class FuelTypeRepository {
    constructor() { }

    getById(id, callback){
        mongoose.model('FuelType').findOne({"_id": id}, callback);
    };

    save(fuelType, callback) {
        console.log('Saving fuel type in the repository.. ' + fuelType);
        fuelType.save(callback);
    };

}

module.exports = FuelTypeRepository;