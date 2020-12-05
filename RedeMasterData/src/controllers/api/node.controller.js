const nodeDTO = require('../../dto/node.dto');
const NodesMapper = require('../../mappers/nodes.mapper');
const ServiceNode = require('../../services/node.service');
const config = require('config')

const service = new ServiceNode();
const nodeMapper = new NodesMapper();


exports.nodeGetById = function (req, res) {

    service.nodeGetById(req.params.nodeId, function(err, params) {
        if(err){
            return res.status(404).send(err);
        }
        const response = nodeMapper.fromReqToDTO(params, new nodeDTO);
        res.status((!response.id) ? 404 : 200).send(response)
    });
};

exports.nodeGetAll = function (req, res) {
    service.nodeGetAll(req.query,function(err, params) {
        if(err){
            return res.status(404).send(err);
        }
        res.status(200).json(params)
    })
};

exports.nodeCreate = function (req, res) {
    let node = nodeMapper.fromReqToDTO(req.body, new nodeDTO);
    service.nodeCreate(node, function (err, params) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(201).json(nodeMapper.fromReqToDTO(params, new nodeDTO));
    })
};

exports.nodeDelete = function (req, res) {
    service.nodeDelete(req.params.nodeId, function (err, params) {
        if (err) {
            return res.status(404).send(err);
        }
        res.status(204).send('Node deleted.');
    });
};