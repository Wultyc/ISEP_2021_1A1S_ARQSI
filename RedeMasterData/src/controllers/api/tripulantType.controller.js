const TripulantTypeService = require('../../services/tripulantType.service');
const tripulantTypeDTO = require('../../dto/tripulantType.dto');
const TripulantTypeMapper = require('../../mappers/tripulantType.mapper');
const dto = require('../../dto/tripulantType.dto');

const service = new TripulantTypeService();
const tripulantTypeMapper = new TripulantTypeMapper();

exports.tripulantTypeGetById = function (req, res) {
    service.tripulantTypeGetById(req.params.tripulantTypeId, function(err, params) {
        if(err){
            return res.status(404).send(err);
        }
        const response =tripulantTypeMapper.fromReqToDTO(params, new tripulantTypeDTO);
        res.status((!response.id) ? 404 : 200).send(response)
    });
};

exports.tripulantTypeGetAll = function (req, res) {
    service.tripulantTypeGetAll(function(err, params) {
        if(err){
            return res.status(404).send(err);
        }
        res.status(200).json(params);
    })
};

exports.tripulantTypeCreate = function (req, res) {
    let tripulantType = transform.ToInsert(req);
    service.tripulantTypeCreate(tripulantType, function (err, params) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(201).json(tripulantTypeMapper.fromReqToDTO(params, new tripulantTypeDTO));
    })
};

exports.tripulantTypeDelete = function (req, res) {
    service.tripulantTypeDelete(req.params.tripulantTypeId, function (err, params) {
        if (err) {
            return res.status(404).send(err);
        }
        res.status(204).send('Tripulant Type deleted.');
    });
};