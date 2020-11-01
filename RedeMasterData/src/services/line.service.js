const _ = require('lodash');

const LineRepository = require('../repositories/line.repository');
const Line = require('../models/line.model');
const ServiceNode = require('../services/node.service');
const LineDTO = require('../dto/line.dto');

const transform = new LineDTO();
const serviceNode = new ServiceNode();

var repo = new LineRepository();

class LineService {
    constructor() {}

    lineCreate(line, callback) {
        var validationMessage;
        new Promise((resolve, reject) => {
            serviceNode.nodeGetById(line.beginNode, (err, res) => {
                if (err) {
                    return reject(err);
                }
                validationMessage = validateGetNode(res, line.beginNode);
                resolve(res);
            });
        }).then(function (result) {
            return new Promise((resolve, reject) => {
                if (_.isEmpty(validationMessage)) {
                    serviceNode.nodeGetById(line.finalNode, (err, res) => {
                        if (err) {
                            return reject(err);
                        }
                        validationMessage = validateGetNode(res, line.finalNode);
                        resolve(res);
                    });
                }
            });
        }).then(function (result) {
            if (_.isEmpty(validationMessage)) {
                console.log(result);
                return repo.save(line, callback);
            } else {
                callback(validationMessage);
                return;
            }
        });
    };
}

// Business Logic
validateGetNode = function(res, id) {
    return _.isEmpty(res) ? 'Node with id ' + id + ' does not exist.' : '';
};

module.exports = LineService;