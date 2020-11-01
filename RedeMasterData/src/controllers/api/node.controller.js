const Node = require('../../models/node.model');
const ServiceNode = require('../../services/node.service');

const service = new ServiceNode();

// DTO
const dto = require('../../dto/node.dto');
var transform = new dto();

exports.nodeCreate = function (req, res) {
    let node = transform.ToInsert(req);
    service.nodeCreate(node, function (err, params) {
        if (err) {
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
    })
};