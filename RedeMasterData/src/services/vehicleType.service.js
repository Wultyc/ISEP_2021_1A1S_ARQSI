const _ = require('lodash');

const VehicleTypeRepository = require('../repositories/vehicleType.repository');
const VehicleType = require('../models/vehicleType.model');

const repo = new VehicleTypeRepository();

class VehicleTypeService {
    
    constructor() {}
    
    vehicleTypeGetById(id, callback) {
        repo.getById(id, callback);
    };

    vehicleTypeGetAll(callback) {
        repo.getAll(callback);
    };

    vehicleTypeCreate(vehicleType, callback) {
        repo.save(vehicleType, callback);
    };

    vehicleTypeDelete(id) {
        repo.delete(id, callback);
    };
}

module.exports = VehicleTypeService;    