const _ = require('lodash');
const Node = require('../../models/node.model');
const ServiceNode = require('../../services/node.service');

const service = new ServiceNode();

// DTO
const dto = require('../../dto/node.dto');
var transform = new dto();

exports.node_create = function (req, res) {
    let node = transform.ToInsert(req);
    let message = this.validateNode(node);
    if (!_.isEmpty(message)) {
        res.send(message);
    } else {
        service.NodeCreate(node, function (err, params) {
            if (err) {
                return res.send(err);
            }
            res.json(transform.ToDTO(params));
        })
    }
};

validateNode = function(node) {
    let message = '';
    if (!node.collectionNode && node.surrenderNode) {
        message = 'A Surrender Node must always be a Collection Node.';
    }
    return message;
};