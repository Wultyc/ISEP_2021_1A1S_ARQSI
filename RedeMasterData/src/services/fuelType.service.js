const FuelTypeRepository = require('../repositories/fuelType.repository');
const FuelType = require('../models/fuelType.model');

const repo = new FuelTypeRepository();

class FuelTypeService {
    
    constructor() {}

    fuelTypeGetById(id, callback) {
        repo.getById(id, callback);
    };

    fuelTypeGetAll(callback) {
        repo.getAll(callback);
    };

    fuelTypeCreate(fuelType, callback) {
        repo.save(fuelType, callback)
    };

    fuelTypeDelete(id) {
        repo.delete(id, callback);
    };

}

module.exports = FuelTypeService;    