const _ = require('lodash');

const LineRepository = require('../repositories/line.repository');
const Line = require('../models/line.model');

const ServiceNode = require('../services/node.service');
const ServiceTripulantType = require('../services/tripulantType.service');
const ServiceVehicleType = require('../services/vehicleType.service');

const serviceNode = new ServiceNode();
const serviceTripulantType = new ServiceTripulantType();
const serviceVehicleType = new ServiceVehicleType();

var repo = new LineRepository();

class LineService {
    constructor() {}

    lineCreate(line, callback) {
        var validationMessage = [];
        getNodePromise(line.beginNode, validationMessage)
        .then(getNodePromise(line.finalNode, validationMessage))
        .then(getTripulantTypePromise(line.tripulantType, validationMessage))
        .then(getVehicleTypePromise(line.vehicleType, validationMessage))
        .then(function (result) {
            if (validationMessage.length == 0) {
                return repo.save(line, callback);
            } else {
                callback(validationMessage);
                return;
            }
        });
    }
}

// Promises
getNodePromise = function (nodeId, validationMessage) {
    return new Promise((resolve, reject) => {
        serviceNode.nodeGetById(nodeId, (err, res) => {
            if (err) {
                return reject(err);
            }
            var node = validateGetNode(res, nodeId);
            if (!_.isEmpty(node)) {
                validationMessage.push(node);
            }
            resolve(res);
        });
    });
}
getTripulantTypePromise = function (tripulantTypeIds, validationMessage) {
    _.forEach(tripulantTypeIds, function(tripulantTypeId) {          
        return new Promise((resolve, reject) => {
            serviceTripulantType.TripulantTypeGetById(tripulantTypeId, (err, res) => {
                if (err) {
                    return reject(err);
                }
                var tripulantType = validateGetTripulantType(res, tripulantTypeId);
                if (!_.isEmpty(tripulantType)) {
                    validationMessage.push(tripulantType);
                }
                resolve(res);
            });
        });
    });
}
getVehicleTypePromise = function (vehicleTypeIds, validationMessage) {
    _.forEach(vehicleTypeIds, function(vehicleTypeId) {  
        return new Promise((resolve, reject) => {
            serviceVehicleType.VehicleTypeGetById(vehicleTypeId, (err, res) => {
                if (err) {
                    return reject(err);
                }
                var vehicleType = validateGetVehicleType(res, vehicleTypeId);
                if (!_.isEmpty(vehicleType)) {
                    validationMessage.push(vehicleType);
                }
                resolve(res);
            });
        });
    });
}

// Business Logic
validateGetNode = function(res, id) {
    return _.isEmpty(res) ? 'Node with id ' + id + ' does not exist.' : '';
};
validateGetTripulantType = function(res, id) {
    return _.isEmpty(res) ? 'Tripulant Type with id ' + id + ' does not exist.' : '';
};
validateGetVehicleType = function(res, id) {
    return _.isEmpty(res) ? 'Vehicle Type with id ' + id + ' does not exist.' : '';
};

module.exports = LineService;