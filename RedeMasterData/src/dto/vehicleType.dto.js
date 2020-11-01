const VehicleType = require('../models/vehicleType.model');

class VehicleTypeDTO {

    constructor() {}

    ToInsert (req) {
        let vehicleType = new VehicleType({
            description : req.body.description
        });
        return vehicleType;
    };
    
    ToDTO(req){
        if(req == null) return 'Vehicle type does not exist.';
        let vehicleType = new VehicleType({
            id: req.vehicleTypeid,
            description : req.description
        });
        return vehicleType;
    };
    
}

module.exports = VehicleTypeDTO;