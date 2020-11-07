const FuelTypeService = require('../../services/fuelType.service');
const dto = require('../../dto/fuelType.dto');

const service = new FuelTypeService();
var transform = new dto();

exports.fuelTypeGetById = function (req, res) {
    service.fuelTypeGetById(req.params.fuelTypeId, function(err, params) {
        if(err){
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
    });
};

exports.fuelTypeGetAll = function (req, res) {
    service.fuelTypeGetAll(function(err, params) {
        if(err){
            return res.send(err);
        }
        res.json(params);
    })
};

exports.fuelTypeCreate = function (req, res) {
    let fuelType = transform.ToInsert(req);
    service.fuelTypeCreate(fuelType, function (err, params) {
        if (err) {
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
    })
};

exports.fuelTypeDelete = function (req, res) {
    service.fuelTypeDelete(req.params.fuelTypeId, function (err, params) {
        if (err) {
            return res.send(err);
        }
        res.send('Fuel Type deleted.');
    });
};