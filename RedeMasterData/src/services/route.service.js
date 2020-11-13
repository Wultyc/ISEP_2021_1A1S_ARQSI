const _ = require('lodash');

const Route = require('../models/route.model');
const RouteRepository = require('../repositories/route.repository');

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
            var nodeI = await getNodePromise(route.routeNodes[i].nodeId, nodeValidatior, validationMessage);
            if (!_.isEmpty(nodeI)) { break; }
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

// Business Logic
routeCreatePreValidations = function (route, validationMessage) {
    if (route.routeNodes < 2) {
        validationMessage.push('Route must have at least 2 nodes.');
    }
    return;
};
validateGetNode = function(res, nodeValidatior, id) {
    if (_.isEmpty(res)) {
        return 'Node with id ' + id + ' does not exist.';
    }
    if (!_.isEmpty(nodeValidatior) && !_.isEmpty(res._id) && res._id.toString() != nodeValidatior.toString()) {
        return 'Node mismatch: There are two sequent nodes with the same id = ' + id;
    }
    return '';
};

module.exports = RouteService;