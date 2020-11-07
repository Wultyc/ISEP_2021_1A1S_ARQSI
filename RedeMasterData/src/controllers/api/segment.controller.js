const Segment = require('../../models/segment.model');
const ServiceSegment = require('../../services/segment.service');

const service = new ServiceSegment();

// DTO
const dto = require('../../dto/segment.dto');
var transform = new dto();

exports.segmentGetById = function (req, res) {
    service.segmentGetById(req.params.segmentId, function(err, params) {
        if(err){
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
    });
};

exports.segmentGetAll = function (req, res) {
    service.segmentGetAll(function(err, params) {
        if(err){
            return res.send(err);
        }
        res.json(params);
    })
};

exports.segmentCreate = function (req, res) {
    let segment = transform.ToInsert(req);
    service.segmentCreate(segment, function (err, params) {
        if (err) {
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
    })
};

exports.segmentDelete = function (req, res) {
    service.segmentDelete(req.params.segmentId, function (err, params) {
        if (err) {
            return res.send(err);
        }
        res.send('Segment deleted.');
    });
};