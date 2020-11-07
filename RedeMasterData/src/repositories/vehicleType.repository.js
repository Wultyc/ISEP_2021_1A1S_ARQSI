const mongoose = require('mongoose');
const VehicleTypeModel = require('../models/vehicleType.model');
var ObjectID = require('mongodb').ObjectID;

class VehicleTypeRepository {
    constructor() { }

    getById(id, callback){
        mongoose.model('VehicleType').findOne({"_id": id}, callback);
    };

    getAll(callback) {
        mongoose.model('VehicleType').find(callback); 
    };

    save(vehicleType, callback) {
        console.log('saving vehicle type in the repository ' + vehicleType);
        vehicleType.save(callback);
    };

    delete(id, callback) {
        mongoose.model('VehicleType').findByIdAndRemove(id, callback) 
    };

}

module.exports = VehicleTypeRepository;