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

    async lineCreate(line, callback) {
        var validationMessage = [];
        await getNodePromise(line.beginNode, validationMessage);
        await getNodePromise(line.finalNode, validationMessage);
        for (let i = 0; i < line.tripulantType.length; i++) {
            await getTripulantTypePromise(line.tripulantType[i], validationMessage);
        }
        for (let i = 0; i < line.vehicleType.length; i++) {
            await getVehicleTypePromise(line.vehicleType[i], validationMessage);
        }
        if (validationMessage.length == 0) {
            return repo.save(line, callback);
        } else {
            callback(validationMessage);
            return;
        }
    }
}

// Promises
getNodePromise = function (nodeId, validationMessage) {
    return new Promise((resolve, reject) => {
        serviceNode.nodeGetById(nodeId, (err, res) => {
            if (err) {
                reject(err);
            }
            var node = validateGetNode(res, nodeId);
            if (!_.isEmpty(node)) {
                validationMessage.push(node);
            }
            resolve(res);
        });
    });
}
getTripulantTypePromise = function (tripulantTypeId, validationMessage) {
    return new Promise((resolve, reject) => {       
        serviceTripulantType.TripulantTypeGetById(tripulantTypeId, (err, res) => {
            if (err) {
                reject(err);
            }
            var tripulantType = validateGetTripulantType(res, tripulantTypeId);
            if (!_.isEmpty(tripulantType)) {
                validationMessage.push(tripulantType);
            }
            resolve(res);
        });
    });
}
getVehicleTypePromise = function (vehicleTypeId, validationMessage) {
    return new Promise((resolve, reject) => {
        serviceVehicleType.VehicleTypeGetById(vehicleTypeId, (err, res) => {
            if (err) {
                reject(err);
            }
            var vehicleType = validateGetVehicleType(res, vehicleTypeId);
            if (!_.isEmpty(vehicleType)) {
                validationMessage.push(vehicleType);
            }
            resolve(res);
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