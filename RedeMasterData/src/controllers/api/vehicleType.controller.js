const VehicleType = require('../../models/vehicleType.model');
const VehicleTypeService = require('../../services/vehicleType.service');
const dto = require('../../dto/vehicleType.dto');

const service = new VehicleTypeService();
var transform = new dto();

exports.vehicleTypeCreate = function (req, res) {
    let vehicleType = transform.ToInsert(req);
     service.VehicleTypeCreate(vehicleType, function (err, params){
        if (err) {
            return res.send(err);
        }
        res.json(transform.ToDTO(params));
     })
};
