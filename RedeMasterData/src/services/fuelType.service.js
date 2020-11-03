const FuelTypeRepository = require('../repositories/fuelType.repository');
const FuelType = require('../models/fuelType.model');

var repo = new FuelTypeRepository();

class FuelTypeService {
    
    constructor() {}

    FuelTypeGetById(id, callback) {
        repo.getById(id, callback);
    };

    FuelTypeCreate(vehicleType, callback) {
        repo.save(vehicleType, callback)
    };

}

module.exports = FuelTypeService;    