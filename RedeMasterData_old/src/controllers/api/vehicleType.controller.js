const VehicleType = require('../../models/vehicleType.model');
const vehicleTypeDTO = require('../../dto/vehicleType.dto');
const VehicleTypeMapper = require('../../mappers/vehicleType.mapper');
const VehicleTypeService = require('../../services/vehicleType.service');
const vehicleTypeValidationSchema = require('../../validations/vehicleType.validation');

const service = new VehicleTypeService();
const vehicleTypeMapper = new VehicleTypeMapper();


exports.vehicleTypeGetById = function (req, res) {
    service.vehicleTypeGetById(req.params.vehicleTypeId, function (err, params) {
        if (err) {
            return res.status(404).send(err);
        }
        const response = vehicleTypeMapper.fromReqToDTO(params, new vehicleTypeDTO);
        res.status((!response.id) ? 404 : 200).send(response)
    });
};

exports.vehicleTypeGetAll = function (req, res) {
    service.vehicleTypeGetAll(function (err, params) {
        if (err) {
            return res.send(err);
        }
        res.status(200).json(params);
    })
};

exports.vehicleTypeCreate = function (req, res) {
    let vehicleType = vehicleTypeMapper.fromReqToDTO(req.body, new vehicleTypeDTO);

    const { error } = vehicleTypeValidationSchema.validate(vehicleType);
    if (error) return res.status(400).send({ message: "some fields are missing or have invalid values", error: error })

    service.vehicleTypeCreate(vehicleType, function (err, params) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(201).json(vehicleTypeMapper.fromReqToDTO(params, new vehicleTypeDTO));
    })
};

exports.vehicleTypeDelete = function (req, res) {
    service.vehicleTypeDelete(req.params.vehicleTypeId, function (err, params) {
        if (err) {
            return res.status(404).send(err);
        }
        res.status(204).send('Vehicle Type deleted.');
    });
};