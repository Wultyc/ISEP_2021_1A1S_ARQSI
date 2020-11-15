const Node = require('../../models/node.model');
const ServiceNode = require('../../services/node.service');
const config = require('config')

const service = new ServiceNode();

// DTO
const dto = require('../../dto/node.dto');
// const { config } = require('dotenv/types');
var transform = new dto();

exports.nodeGetById = function (req, res) {
    service.nodeGetById(req.params.nodeId, function(err, params) {
        if(err){
            return res.status(404).send(err);
        }
        res.status(200).json(transform.ToDTO(params))
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
    let node = transform.ToInsert(req);
    service.nodeCreate(node, function (err, params) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(201).json(transform.ToDTO(params));
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