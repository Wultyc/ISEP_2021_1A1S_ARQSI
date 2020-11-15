const _ = require('lodash');
const Route = require('../../models/route.model');
const ServiceRoute = require('../../services/route.service');

const service = new ServiceRoute();

// DTO
const dto = require('../../dto/route.dto');
var transform = new dto();

exports.routeGetById = function (req, res) {
    service.routeGetById(req.params.routeId, function(err, params) {
        if(err){
            return res.status(404).send(err);
        }
        const response = transform.ToDTO(params);
        res.status((!response.id) ? 404 : 200).send(response)
    });
};

exports.routeGetAll = function (req, res) {
    service.routeGetAll(function(err, params) {
        if(err){
            return res.status(404).send(err);
        }
        res.status(200).json(params)
    })
};

exports.routeCreate = function (req, res) {
    let route = transform.ToInsert(req);
    service.routeCreate(route, function (err, params) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(201).json(transform.ToDTO(params))
    })
};

exports.routeDelete = function (req, res) {
    service.routeDelete(req.params.routeId, function (err, params) {
        if (err) {
            return res.status(404).send(err);
        }
        res.status(204).send('Route deleted.');
    });
};