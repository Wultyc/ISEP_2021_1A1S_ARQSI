const _ = require('lodash');

const Route = require('../models/route.model');
const RouteRepository = require('../repositories/route.repository');
const ServiceSegment = require('./segment.service');

const serviceSegment = new ServiceSegment();
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
        var segmentDistances = 0, segmentDurantions = 0;
        for (let i = 0; i < route.segment.length; i++) {
            var segmentI = await getSegmentPromise(route.segment[i], validationMessage);
            segmentDistances += segmentI.distance;
            segmentDurantions += segmentI.duration;
        }
        route.distance = segmentDistances;
        route.duration = segmentDurantions;
        route.endTime = route.startTime + route.duration;
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
getSegmentPromise = function (segmentId, validationMessage) {
    return new Promise((resolve, reject) => {       
        serviceSegment.segmentGetById(segmentId, (err, res) => {
            if (err) {
                reject(err);
            }
            var segmentValidationMessage = validateGetSegment(res, segmentId);
            if (!_.isEmpty(segmentValidationMessage)) {
                validationMessage.push(segmentValidationMessage);
            }
            resolve(res);
        });
    });
}

// Business Logic
routeCreatePreValidations = function (route, validationMessage) {
    if (route.segment.length == 0) {
        validationMessage.push('Route must have at least one segment.');
    }
    return;
};
validateGetSegment = function(res, id) {
    return _.isEmpty(res) ? 'Segment with id ' + id + ' does not exist.' : '';
};

module.exports = RouteService;