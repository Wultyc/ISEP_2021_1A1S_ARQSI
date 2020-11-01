const TripulantTypeService = require('../../services/tripulantType.service');
const dto = require('../../dto/tripulantType.dto');

const service = new TripulantTypeService();
var transform = new dto();

exports.tripulantTypeCreate = function (req, res) {

    let tripulantType = transform.ToInsert(req);

    service.TripulantTypeCreate(tripulantType, function (err, params) {

        if (err) return res.status(400).json(err);

        res.json(transform.ToDTO(params));
    })




};


