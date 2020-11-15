const TripulantTypeService = require('../../services/tripulantType.service');
const dto = require('../../dto/tripulantType.dto');

const service = new TripulantTypeService();
var transform = new dto();

exports.tripulantTypeGetById = function (req, res) {
    service.tripulantTypeGetById(req.params.tripulantTypeId, function(err, params) {
        if(err){
            return res.status(404).send(err);
        }
        const response = transform.ToDTO(params);
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
        res.status(201).json(transform.ToDTO(params));
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