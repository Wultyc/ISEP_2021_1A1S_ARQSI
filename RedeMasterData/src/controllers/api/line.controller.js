const _ = require('lodash');
const Line = require('../../models/line.model');
const ServiceLine = require('../../services/line.service');

const service = new ServiceLine();

// DTO
const dto = require('../../dto/line.dto');
var transform = new dto();

exports.lineCreate = function (req, res) {
    let line = transform.ToInsert(req);
    service.lineCreate(line, function (err, params) {
        if (err) {
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
    })
};