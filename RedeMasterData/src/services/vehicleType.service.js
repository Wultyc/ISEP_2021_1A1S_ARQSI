const _ = require('lodash');

const VehicleTypeRepository = require('../repositories/vehicleType.repository');
const ServiceFuelType = require('../services/fuelType.service');
const VehicleType = require('../models/vehicleType.model');

const serviceFuelType = new ServiceFuelType();
const repo = new VehicleTypeRepository();

class VehicleTypeService {
    
    constructor() {}
    
    vehicleTypeGetById(id, callback) {
        repo.getById(id, callback);
    };

    vehicleTypeGetAll(callback) {
        repo.getAll(callback);
    };

    async vehicleTypeCreate(vehicleType, callback) {
        var validationMessage = [];
        await getFuelTypePromise(vehicleType.fuelType, validationMessage);
        if (validationMessage.length == 0) {
            return repo.save(vehicleType, callback);
        } else {
            callback(validationMessage);
            return;
        }
    };

    vehicleTypeDelete(id) {
        repo.delete(id, callback);
    };
}

// Promises
getFuelTypePromise = function (fuelTypeId, validationMessage) {
    return new Promise((resolve, reject) => {
        serviceFuelType.fuelTypeGetById(fuelTypeId, (err, res) => {
            if (err) {
                reject(err);
            }
            var fuelTypeValidationMessage = validateGetFuelType(res, fuelTypeId);
            if (!_.isEmpty(fuelTypeValidationMessage)) {
                validationMessage.push(fuelTypeValidationMessage);
            }
            resolve(res);
        });
    });
}

// Business Logic
validateGetFuelType = function(res, id) {
    return _.isEmpty(res) ? 'Fuel Type with id ' + id + ' does not exist.' : '';
};

module.exports = VehicleTypeService;    