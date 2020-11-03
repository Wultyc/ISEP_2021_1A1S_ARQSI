const FuelType = require('../models/fuelType.model');

class FuelTypeDTO {

    constructor() {}

    ToInsert (req) {
        let fuelType = new FuelType({
            type : req.body.type
        });
        return fuelType;
    };
    
    ToDTO(req){
        if(req == null) return 'Tripulant type does not exist.';
        let fuelType = new FuelType({
            type : req.type
        });
        return fuelType;
    };
    
}

module.exports = FuelTypeDTO;