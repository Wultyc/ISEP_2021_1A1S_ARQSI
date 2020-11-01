const mongoose = require('mongoose');
const VehicleTypeModel = require('../models/vehicleType.model');
var ObjectID = require('mongodb').ObjectID;

class VehicleTypeRepository {
    
    constructor() { }

    save(vehicleType, callback) {
        console.log('saving vehicle type in the repository ' + vehicleType);
        vehicleType.save();
    };

}

module.exports = VehicleTypeRepository;