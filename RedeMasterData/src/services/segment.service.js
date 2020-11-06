const _ = require('lodash');

const SegmentRepository = require('../repositories/segment.repository');
const ServiceNode = require('../services/node.service');
const Segment = require('../models/segment.model');

const serviceNode = new ServiceNode();
const repo = new SegmentRepository();

class SegmentService {
    constructor() {}

    segmentGetById(id, callback) {
        repo.getById(id, callback);
    };

    async segmentCreate(segment, callback) {
        var validationMessage = [];
        await getNodePromise(segment.beginNode, validationMessage);
        await getNodePromise(segment.finalNode, validationMessage);
        if (validationMessage.length == 0) {
            return repo.save(segment, callback);
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
            var nodeValidationMessage = validateGetNode(res, nodeId);
            if (!_.isEmpty(nodeValidationMessage)) {
                validationMessage.push(nodeValidationMessage);
            }
            resolve(res);
        });
    });
}

// Business Logic
validateGetNode = function(res, id) {
    return _.isEmpty(res) ? 'Node with id ' + id + ' does not exist.' : '';
};

module.exports = SegmentService;