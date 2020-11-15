const _ = require('lodash');
const Line = require('../../models/line.model');
const ServiceLine = require('../../services/line.service');

const service = new ServiceLine();

// DTO
const dto = require('../../dto/line.dto');
var transform = new dto();

exports.lineGetById = function (req, res) {
    service.lineGetById(req.params.lineId, function (err, params) {
        if (err) {
            return res.status(404).send(err);
        }
        const response = transform.ToDTO(params);
        res.status((!response.id) ? 404 : 200).send(response)
    });
};


exports.lineGetRoutesById = function (req, res) {
    service.lineGetRoutesById(req.params.lineId, function (err, params) {
        if (err) {
            return res.status(404).send(err);
        }
        const response = transform.ToDTO(params).lineRoutes;
        res.status((!response.id) ? 404 : 200).send(response)
    });
};

exports.lineGetByFilter = function (req, res) {
    service.lineGetByFilter(req.query, function (err, params) {
        if (err) {
            return res.status(400).send(err)
        }
        res.status(200).json(params)
    })

};

exports.lineCreate = function (req, res) {
    let line = transform.ToInsert(req);
    service.lineCreate(line, function (err, params) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(201).json(transform.ToDTO(params));
    })
};

exports.lineDelete = function (req, res) {
    service.lineDelete(req.params.lineId, function (err, params) {
        if (err) {
            return res.status(404).send(err);
        }
        res.status(204).send('Line deleted.');
    });
};