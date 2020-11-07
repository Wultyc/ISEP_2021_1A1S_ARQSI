const _ = require('lodash');
const Line = require('../../models/line.model');
const ServiceLine = require('../../services/line.service');

const service = new ServiceLine();

// DTO
const dto = require('../../dto/line.dto');
var transform = new dto();

exports.lineGetById = function (req, res) {
    service.lineGetById(req.params.lineId, function(err, params) {
        if(err){
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
    });
};

exports.lineGetAll = function (req, res) {
    service.lineGetAll(function(err, params) {
        if(err){
            return res.send(err);
        }
        res.json(params);
    })
};

exports.lineCreate = function (req, res) {
    let line = transform.ToInsert(req);
    service.lineCreate(line, function (err, params) {
        if (err) {
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
    })
};

exports.lineDelete = function (req, res) {
    service.lineDelete(req.params.lineId, function (err, params) {
        if (err) {
            return res.send(err);
        }
        res.send('Line deleted.');
    });
};