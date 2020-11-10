const queryfilter = require('../libs/queryfilter');
const _ = require('lodash');

const LineRepository = require('../repositories/line.repository');
const Line = require('../models/line.model');

const ServiceNode = require('../services/node.service');
const ServiceSegment = require('../services/segment.service');
const ServiceRoute = require('../services/route.service');
const ServiceTripulantType = require('../services/tripulantType.service');
const ServiceVehicleType = require('../services/vehicleType.service');
const { function } = require('joi');

const serviceNode = new ServiceNode();
const serviceSegment = new ServiceSegment();
const serviceRoute = new ServiceRoute();
const serviceTripulantType = new ServiceTripulantType();
const serviceVehicleType = new ServiceVehicleType();

var repo = new LineRepository();

class LineService {
    constructor() {}

    lineGetById(id, callback) {
        repo.getById(id, callback);
    };

    lineGetAll(callback) {
        repo.getAll(callback);
    };

    lineGetByFilter(query, callback){
        const sortString = queryfilter.sortString(query)
        query = queryfilter.queryCleaner(query);
        repo.getByFilter(query, sortString, callback)
    };

    async lineCreate(line, callback) {
        var validationMessage = [];
        lineCreatePreValidations(line, validationMessage);
        if (validationMessage.length != 0) {
            callback(validationMessage);
            return;
        }
        await getNodePromise(line.beginNode, validationMessage);
        await getNodePromise(line.finalNode, validationMessage);
        var hasGoingRoute = false, hasComingRoute = false;
        for (let i = 0; i < line.route.length; i++) {
            var routeI = await getRoutePromise(line.route[i], validationMessage);
            if (!_.isEmpty(routeI)) {
                if (_.isEqual(routeI.orientation, 'GoingRoute')) {
                    hasGoingRoute = true;
                } else if (_.isEqual(routeI.orientation, 'ComingRoute')) {
                    hasComingRoute = true;
                }
                validateBeginAndLastNode(line.beginNode, line.finalNode, line.route[i], validationMessage);
            }
        }
        if (!hasGoingRoute || !hasComingRoute) {
            validationMessage.push('A line must have at least 1 going route and 1 coming route.');
        }
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

    lineDelete(id) {
        repo.delete(id, callback);
    };

}

// Business Logic
lineCreatePreValidations = function (line, validationMessage) {
    if (line.route.length < 2) {
        validationMessage.push('A line must have at least 1 going route and 1 coming route.');
    }
    return;
};
validateBeginAndLastNode = async function(beginNode, finalNode, route, validationMessage) {
    var beginSegment = await getSegmentPromise(route.segment[0]);
    var finalSegment = await getSegmentPromise(route.segment[route.segment.length - 1]);
    if (_.isEqual(route.orientation, "GoingRoute")) {
        if (!_.isEqual(beginSegment.beginNode.toString(), beginNode.toString())) {
            validationMessage.push("Node mismatch: The first node of the route " + route._id 
                + " is diferent from the line's begin node.");
        }
        if (!_.isEqual(finalSegment.finalNode.toString(), finalNode.toString())) {
            validationMessage.push("Node mismatch: The last node of the route " + route._id 
                + " is diferent from the line's final node.");
        }
    }
    if (_.isEqual(route.orientation, "ComingRoute")) {
        if (!_.isEqual(beginSegment.beginNode.toString(), finalNode.toString())) {
            validationMessage.push("Node mismatch: The first node of the route " + route._id 
                + " is diferent from the line's final node.");
        }
        if (!_.isEqual(finalSegment.finalNode.toString(), beginNode.toString())) {
            validationMessage.push("Node mismatch: The last node of the route " + route._id 
                + " is diferent from the line's begin node.");
        }
    }
};
validateGetNode = function(res, id) {
    return _.isEmpty(res) ? 'Node with id ' + id + ' does not exist.' : '';
};
validateGetRoute = function(res, id) {
    return _.isEmpty(res) ? 'Route with id ' + id + ' does not exist.' : '';
};
validateGetTripulantType = function(res, id) {
    return _.isEmpty(res) ? 'Tripulant Type with id ' + id + ' does not exist.' : '';
};
validateGetVehicleType = function(res, id) {
    return _.isEmpty(res) ? 'Vehicle Type with id ' + id + ' does not exist.' : '';
};

// Promises
getNodePromise = function (nodeId, validationMessage) {
    return new Promise((resolve, reject) => {
        serviceNode.nodeGetById(nodeId, (err, res) => {
            if (err) {
                reject(err);
            }
            var nodeValidationMessage = validateGetNode(res, nodeId);
            if (!_.isEmpty(nodeValidationMessage)) {
                validationMessage.push(nodeValidationMessage);
            }
            resolve(res);
        });
    });
}
getSegmentPromise = function (segmentId) {
    return new Promise((resolve, reject) => {
        serviceSegment.segmentGetById(segmentId, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
}
getRoutePromise = function (routeId, validationMessage) {
    return new Promise((resolve, reject) => {       
        serviceRoute.routeGetById(routeId, (err, res) => {
            if (err) {
                reject(err);
            }
            var routeValidationMessage = validateGetRoute(res, routeId);
            if (!_.isEmpty(routeValidationMessage)) {
                validationMessage.push(routeValidationMessage);
            }
            resolve(res);
        });
    });
}
getTripulantTypePromise = function (tripulantTypeId, validationMessage) {
    return new Promise((resolve, reject) => {       
        serviceTripulantType.tripulantTypeGetById(tripulantTypeId, (err, res) => {
            if (err) {
                reject(err);
            }
            var tripulantTypeValidationMessage = validateGetTripulantType(res, tripulantTypeId);
            if (!_.isEmpty(tripulantTypeValidationMessage)) {
                validationMessage.push(tripulantTypeValidationMessage);
            }
            resolve(res);
        });
    });
}
getVehicleTypePromise = function (vehicleTypeId, validationMessage) {
    return new Promise((resolve, reject) => {
        serviceVehicleType.vehicleTypeGetById(vehicleTypeId, (err, res) => {
            if (err) {
                reject(err);
            }
            var vehicleTypeValidationMessage = validateGetVehicleType(res, vehicleTypeId);
            if (!_.isEmpty(vehicleTypeValidationMessage)) {
                validationMessage.push(vehicleTypeValidationMessage);
            }
            resolve(res);
        });
    });
}

module.exports = LineService;