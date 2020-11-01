const TripulantType = require('../models/tripulantType.model');

class TripulantTypeDTO {

    constructor() {}

    ToInsert (req) {
        let tripulantType = new TripulantType({
            description : req.body.description
        });
        return tripulantType;
    };
    
    ToDTO(req){
        if(req == null) return 'Tripulant type does not exist.';
        let tripulantType = new TripulantType({
            id: req.tripulantTypeid,
            description : req.description
        });
        return tripulantType;
    };
    
}

module.exports = TripulantTypeDTO;