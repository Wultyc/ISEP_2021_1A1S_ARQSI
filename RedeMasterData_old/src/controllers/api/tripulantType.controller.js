const TripulantTypeService = require('../../services/tripulantType.service');
const tripulantTypeDTO = require('../../dto/tripulantType.dto');
const TripulantTypeMapper = require('../../mappers/tripulantType.mapper');
const tripulantTypesValidationSchema = require('../../validations/tripulantType.validation');

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
    let tripulantType = tripulantTypeMapper.fromReqToDTO(req.body, new tripulantTypeDTO)

    const { error } = tripulantTypesValidationSchema.validate(tripulantType);
    if (error) return res.status(400).send({ message: "some fields are missing or have invalid values", error: error })

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