const FuelTypeRepository = require('../repositories/fuelType.repository');
const FuelType = require('../models/fuelType.model');

const repo = new FuelTypeRepository();

class FuelTypeService {
    
    constructor() {}

    fuelTypeGetById(id, callback) {
        repo.getById(id, callback);
    };

    fuelTypeCreate(vehicleType, callback) {
        repo.save(vehicleType, callback)
    };

}

module.exports = FuelTypeService;    