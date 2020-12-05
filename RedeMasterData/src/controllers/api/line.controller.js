const _ = require('lodash');
const lineDTO = require('../../dto/line.dto');
const LinesMapper = require('../../mappers/lines.mapper');
const ServiceLine = require('../../services/line.service');

const service = new ServiceLine();
const lineMapper = new LinesMapper();

exports.lineGetById = function (req, res) {
    service.lineGetById(req.params.lineId, function (err, params) {
        if (err) {
            return res.status(404).send(err);
        }
        const response =  lineMapper.fromReqToDTO(params, new lineDTO);
        res.status((!response.id) ? 404 : 200).send(response)
    });
};


exports.lineGetRoutesById = function (req, res) {
    service.lineGetRoutesById(req.params.lineId, function (err, params) {
        if (err) {
            return res.status(404).send(err);
        }
        const response = lineMapper.fromReqToDTO(params, new lineDTO).lineRoutes;
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
    let line = lineMapper.fromReqToDTO(req.body, new lineDTO);
    service.lineCreate(line, function (err, params) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(201).json(lineMapper.fromReqToDTO(params, new lineDTO));
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

exports.lineCreateAndAddRoute = function (req, res) {
    let routeForLine = transform.ToInsertRouteInLine(req);
    service.lineCreateAndAddRoute(routeForLine, function (err, params) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(201).json(lineMapper.fromReqToDTO(params, new lineDTO));
    })
};