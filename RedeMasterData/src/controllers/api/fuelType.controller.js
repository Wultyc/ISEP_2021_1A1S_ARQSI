const FuelTypeService = require('../../services/fuelType.service');
const dto = require('../../dto/fuelType.dto');

const service = new FuelTypeService();
var transform = new dto();

exports.fuelTypeCreate = function (req, res) {
    let fuelType = transform.ToInsert(req);
    service.FuelTypeCreate(fuelType, function (err, params) {
        if (err) {
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
    })
};


