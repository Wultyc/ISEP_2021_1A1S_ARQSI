const _ = require('lodash');

const VehicleTypeRepository = require('../repositories/vehicleType.repository');
const ServiceFuelType = require('../services/fuelType.service');
const VehicleType = require('../models/vehicleType.model');

const serviceFuelType = new ServiceFuelType();
const repo = new VehicleTypeRepository();

class VehicleTypeService {
    
    constructor() {}

    VehicleTypeGetById(id, callback) {
        repo.getById(id, callback);
    };

    async VehicleTypeCreate(vehicleType, callback) {
        var validationMessage = [];
        await getFuelTypePromise(vehicleType.fuelType, validationMessage);
        if (validationMessage.length == 0) {
            return repo.save(vehicleType, callback);
        } else {
            callback(validationMessage);
            return;
        }
    };
}

// Promises
getFuelTypePromise = function (fuelTypeId, validationMessage) {
    return new Promise((resolve, reject) => {
        serviceFuelType.FuelTypeGetById(fuelTypeId, (err, res) => {
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