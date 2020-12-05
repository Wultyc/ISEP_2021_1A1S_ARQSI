const _ = require('lodash');
const routeDTO = require('../../dto/route.dto');
const RoutesMapper = require('../../mappers/route.mapper');
const Route = require('../../models/route.model');
const ServiceRoute = require('../../services/route.service');

const service = new ServiceRoute();
const routeMapper = new RoutesMapper();

exports.routeGetById = function (req, res) {
    service.routeGetById(req.params.routeId, function(err, params) {
        if(err){
            return res.status(404).send(err);
        }
        const response = routeMapper.fromReqToDTO(params, new routeDTO);
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
    let route = routeMapper.fromReqToDTO(req.body, new routeDTO);
    service.routeCreate(route, function (err, params) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(201).json(routeMapper.fromReqToDTO(params, new routeDTO))
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