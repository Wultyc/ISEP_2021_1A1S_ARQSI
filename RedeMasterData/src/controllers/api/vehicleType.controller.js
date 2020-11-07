const VehicleType = require('../../models/vehicleType.model');
const VehicleTypeService = require('../../services/vehicleType.service');
const dto = require('../../dto/vehicleType.dto');

const service = new VehicleTypeService();
var transform = new dto();

exports.vehicleTypeGetById = function (req, res) {
    service.vehicleTypeGetById(req.params.vehicleTypeId, function(err, params) {
        if(err){
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
    });
};

exports.vehicleTypeGetAll = function (req, res) {
    service.vehicleTypeGetAll(function(err, params) {
        if(err){
            return res.send(err);
        }
        res.json(params);
    })
};

exports.vehicleTypeCreate = function (req, res) {
    let vehicleType = transform.ToInsert(req);
     service.vehicleTypeCreate(vehicleType, function (err, params){
        if (err) {
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
     })
};

exports.vehicleTypeDelete = function (req, res) {
    service.vehicleTypeDelete(req.params.vehicleTypeId, function (err, params) {
        if (err) {
            return res.send(err);
        }
        res.send('Vehicle Type deleted.');
    });
};