const queryfilter = require('../libs/queryfilter');
const _ = require('lodash');

const LineRepository = require('../repositories/line.repository');

const ServiceNode = require('../services/node.service');
const ServiceRoute = require('../services/route.service');
const ServiceTripulantType = require('../services/tripulantType.service');
const ServiceVehicleType = require('../services/vehicleType.service');

const serviceNode = new ServiceNode();
const serviceRoute = new ServiceRoute();
const serviceTripulantType = new ServiceTripulantType();
const serviceVehicleType = new ServiceVehicleType();

var repo = new LineRepository();

class LineService {
    constructor() {}

    lineGetById(id, callback) {
        repo.getById(id, callback);
    };

    lineGetRoutesById(id, callback) {
        repo.getRouteById(id, callback);
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
        var isLineComingFromGlx = false;
        if (line.beginNode == null && line.finalNode == null) {
            isLineComingFromGlx = true;
            var firstLineRoute = await getRoutePromiseForLine(line.lineRoutes[0].routeId, validationMessage);
            var firstOrientation = line.lineRoutes[0].orientation;
            if (_.isEqual(firstOrientation, "Go")) {
                line.beginNode = firstLineRoute.routeNodes[0].nodeId;
                line.finalNode = firstLineRoute.routeNodes[firstLineRoute.routeNodes.length - 1].nodeId;
            }
            if (_.isEqual(firstOrientation, "Return")) {
                line.finalNode = firstLineRoute.routeNodes[0].nodeId;
                line.beginNode = firstLineRoute.routeNodes[firstLineRoute.routeNodes.length - 1].nodeId;
            }
        }
        await getNodePromiseForLine(line.beginNode, validationMessage);
        await getNodePromiseForLine(line.finalNode, validationMessage);
        var hasGoRoute = false, hasReturnRoute = false;
        for (let i = 0; i < line.lineRoutes.length; i++) {
            var routeI = await getRoutePromiseForLine(line.lineRoutes[i].routeId, validationMessage);
            if (!_.isEmpty(routeI)) {
                var orientationI = line.lineRoutes[i].orientation;
                if (_.isEqual(orientationI, 'Go')) {
                    hasGoRoute = true;
                } else if (_.isEqual(orientationI, 'Return')) {
                    hasReturnRoute = true;
                } else {
                    validationMessage.push('A route must have an orientation associated (Go or Return).');
                    break;
                }
                if (!isLineComingFromGlx) {
                    validateBeginAndLastNode(line.beginNode, line.finalNode, routeI, orientationI, validationMessage);
                }
            } else { break; }
        }
        if (!hasGoRoute || !hasReturnRoute) {
            validationMessage.push('A line must have at least 1 go route and 1 return route.');
        }
        for (let i = 0; i < line.tripulantType.length; i++) {
            await getTripulantTypePromiseForLine(line.tripulantType[i], validationMessage);
        }
        for (let i = 0; i < line.vehicleType.length; i++) {
            await getVehicleTypePromiseForLine(line.vehicleType[i], validationMessage);
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
    if (line.lineRoutes == null || line.lineRoutes.length < 2) {
        validationMessage.push('A line must have at least 1 going route and 1 coming route.');
    }
    return;
};
validateBeginAndLastNode = function(beginNode, finalNode, route, orientation, validationMessage) {
    var routeBeginNode = route.routeNodes[0].nodeId;
    var routeFinalNode = route.routeNodes[route.routeNodes.length - 1].nodeId;
    if (_.isEqual(orientation, "Go")) {
        if (!_.isEqual(routeBeginNode.toString(), beginNode.toString())) {
            validationMessage.push("Node mismatch: The first node of the route " + route._id 
                + " is diferent from the line's begin node.");
        }
        if (!_.isEqual(routeFinalNode.toString(), finalNode.toString())) {
            validationMessage.push("Node mismatch: The last node of the route " + route._id 
                + " is diferent from the line's final node.");
        }
    }
    if (_.isEqual(orientation, "Return")) {
        if (!_.isEqual(routeBeginNode.toString(), finalNode.toString())) {
            validationMessage.push("Node mismatch: The first node of the route " + route._id 
                + " is diferent from the line's final node.");
        }
        if (!_.isEqual(routeFinalNode.toString(), beginNode.toString())) {
            validationMessage.push("Node mismatch: The last node of the route " + route._id 
                + " is diferent from the line's begin node.");
        }
    }
};
validateGetNodeForLine = function(res, id) {
    return _.isEmpty(res) ? 'Node with id ' + id + ' does not exist.' : '';
};
validateGetRouteForLine = function(res, id) {
    return _.isEmpty(res) ? 'Route with id ' + id + ' does not exist.' : '';
};
validateGetTripulantTypeForLine = function(res, id) {
    return _.isEmpty(res) ? 'Tripulant Type with id ' + id + ' does not exist.' : '';
};
validateGetVehicleTypeForLine = function(res, id) {
    return _.isEmpty(res) ? 'Vehicle Type with id ' + id + ' does not exist.' : '';
};

// Promises
getNodePromiseForLine = function (nodeId, validationMessage) {
    return new Promise((resolve, reject) => {
        serviceNode.nodeGetById(nodeId, (err, res) => {
            if (err) {
                reject(err);
            }
            var nodeValidationMessage = validateGetNodeForLine(res, nodeId);
            if (!_.isEmpty(nodeValidationMessage)) {
                validationMessage.push(nodeValidationMessage);
            }
            resolve(res);
        });
    });
}
getRoutePromiseForLine = function (routeId, validationMessage) {
    return new Promise((resolve, reject) => {       
        serviceRoute.routeGetById(routeId, (err, res) => {
            if (err) {
                reject(err);
            }
            var routeValidationMessage = validateGetRouteForLine(res, routeId);
            if (!_.isEmpty(routeValidationMessage)) {
                validationMessage.push(routeValidationMessage);
            }
            resolve(res);
        });
    });
}
getTripulantTypePromiseForLine = function (tripulantTypeId, validationMessage) {
    return new Promise((resolve, reject) => {       
        serviceTripulantType.tripulantTypeGetById(tripulantTypeId, (err, res) => {
            if (err) {
                reject(err);
            }
            var tripulantTypeValidationMessage = validateGetTripulantTypeForLine(res, tripulantTypeId);
            if (!_.isEmpty(tripulantTypeValidationMessage)) {
                validationMessage.push(tripulantTypeValidationMessage);
            }
            resolve(res);
        });
    });
}
getVehicleTypePromiseForLine = function (vehicleTypeId, validationMessage) {
    return new Promise((resolve, reject) => {
        serviceVehicleType.vehicleTypeGetById(vehicleTypeId, (err, res) => {
            if (err) {
                reject(err);
            }
            var vehicleTypeValidationMessage = validateGetVehicleTypeForLine(res, vehicleTypeId);
            if (!_.isEmpty(vehicleTypeValidationMessage)) {
                validationMessage.push(vehicleTypeValidationMessage);
            }
            resolve(res);
        });
    });
}

module.exports = LineService;