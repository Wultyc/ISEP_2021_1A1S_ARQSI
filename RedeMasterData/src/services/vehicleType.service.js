const VehicleTypeRepository = require('../repositories/vehicleType.repository');
const VehicleType = require('../models/vehicleType.model');

var repo = new VehicleTypeRepository();

class VehicleTypeService {
    
    constructor() {}

    VehicleTypeGetById(id, callback) {
        repo.getById(id, callback);
    };

    VehicleTypeCreate(vehicleType, callback) {
        repo.save(vehicleType, callback)
    };

}

module.exports = VehicleTypeService;    