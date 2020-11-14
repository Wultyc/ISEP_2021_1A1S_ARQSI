const _ = require('lodash');

const Route = require('../models/route.model');
const RouteRepository = require('../repositories/route.repository');
const ServiceNode = require('./node.service');

const serviceNode = new ServiceNode();
const repo = new RouteRepository();

class RouteService {
    constructor() {}

    routeGetById(id, callback) {
        repo.getById(id, callback);
    };

    routeGetAll(callback) {
        repo.getAll(callback);
    };

    async routeCreate(route, callback) {
        var validationMessage = [];
        routeCreatePreValidations(route, validationMessage);
        if (validationMessage.length != 0) {
            callback(validationMessage);
            return;
        }
        var nodeValidatior = null;
        var routeNodesDistances = 0, routeNodesDurantions = 0;
        for (let i = 0; i < route.routeNodes.length; i++) {
            var nodeI = await getNodePromiseForRoute(route.routeNodes[i].nodeId, nodeValidatior, validationMessage);
            if (!validationMessage.length == 0) { break; }
            nodeValidatior = nodeI;
            if (i == 0) { continue; }
            routeNodesDistances += route.routeNodes[i].distance;
            routeNodesDurantions += route.routeNodes[i].duration;
        }
        route.distance = routeNodesDistances;
        route.duration = routeNodesDurantions;
        if (validationMessage.length == 0) {
            return repo.save(route, callback);
        } else {
            callback(validationMessage);
            return;
        }
    }

    routeDelete(id) {
        repo.delete(id, callback);
    };
}

// Promises
getNodePromiseForRoute = function (nodeId, nodeValidatior, validationMessage) {
    return new Promise((resolve, reject) => {
        serviceNode.nodeGetById(nodeId, (err, res) => {
            if (err) {
                reject(err);
            }
            var nodeValidationMessage = validateGetNodeForRoute(res, nodeValidatior, nodeId);
            if (!_.isEmpty(nodeValidationMessage)) {
                validationMessage.push(nodeValidationMessage);
            }
            resolve(res);
        });
    });
}

// Business Logic
routeCreatePreValidations = function (route, validationMessage) {
    if (route.routeNodes != null && route.routeNodes < 2) {
        validationMessage.push('Route must have at least 2 nodes.');
    }
    return;
};
validateGetNodeForRoute = function(res, nodeValidatior, id) {
    if (_.isEmpty(res)) {
        return 'Node with id ' + id + ' does not exist.';
    }
    if (!_.isEmpty(nodeValidatior) && !_.isEmpty(id) && _.isEqual(id.toString(), nodeValidatior.toString())) {
        return 'Node mismatch: There are two or more sequential nodes with the same id = ' + id;
    }
    return '';
};

module.exports = RouteService;