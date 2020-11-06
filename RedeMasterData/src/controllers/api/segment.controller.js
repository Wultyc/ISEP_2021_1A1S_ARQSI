const Segment = require('../../models/segment.model');
const ServiceSegment = require('../../services/segment.service');

const service = new ServiceSegment();

// DTO
const dto = require('../../dto/segment.dto');
var transform = new dto();

exports.segmentCreate = function (req, res) {
    let segment = transform.ToInsert(req);
    service.segmentCreate(segment, function (err, params) {
        if (err) {
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
    })
};