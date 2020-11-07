const Node = require('../../models/node.model');
const ServiceNode = require('../../services/node.service');

const service = new ServiceNode();

// DTO
const dto = require('../../dto/node.dto');
var transform = new dto();

exports.nodeGetById = function (req, res) {
    service.nodeGetById(req.params.nodeId, function(err, params) {
        if(err){
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
    });
};

exports.nodeGetAll = function (req, res) {
    console.log('cheguei ao controller')
    service.nodeGetAll(req.query,function(err, params) {
        if(err){
            return res.send(err);
        }
        res.json(params);
    })
};

exports.nodeCreate = function (req, res) {
    let node = transform.ToInsert(req);
    service.nodeCreate(node, function (err, params) {
        if (err) {
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
    })
};

exports.nodeDelete = function (req, res) {
    service.nodeDelete(req.params.nodeId, function (err, params) {
        if (err) {
            return res.send(err);
        }
        res.send('Node deleted.');
    });
};