const Node = require('../../models/node.model');
const ServiceNode = require('../../services/node.service');

const service = new ServiceNode();

// DTO
const dto = require('../../DTO/node.dto');
var transform = new dto();

exports.node_create = function (req, res) {
    let node = transform.ToInsert(req);
    service.NodeCreate(node, function (err, params) {
        if (err) {
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
    })
};