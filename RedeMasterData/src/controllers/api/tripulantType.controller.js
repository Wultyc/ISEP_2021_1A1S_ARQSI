const TripulantTypeService = require('../../services/tripulantType.service');
const dto = require('../../dto/tripulantType.dto');

const service = new TripulantTypeService();
var transform = new dto();

exports.tripulantTypeGetById = function (req, res) {
    service.tripulantTypeGetById(req.params.tripulantTypeId, function(err, params) {
        if(err){
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
    });
};

exports.tripulantTypeGetAll = function (req, res) {
    service.tripulantTypeGetAll(function(err, params) {
        if(err){
            return res.send(err);
        }
        res.json(params);
    })
};

exports.tripulantTypeCreate = function (req, res) {
    let tripulantType = transform.ToInsert(req);
    service.tripulantTypeCreate(tripulantType, function (err, params) {
        if (err) {
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
    })
};

exports.tripulantTypeDelete = function (req, res) {
    service.tripulantTypeDelete(req.params.tripulantTypeId, function (err, params) {
        if (err) {
            return res.send(err);
        }
        res.send('Tripulant Type deleted.');
    });
};