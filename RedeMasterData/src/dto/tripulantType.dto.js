const TripType = require('../models/tripulantType.model');

class TripulantTypeDTO {

    constructor() {}

    ToInsert (req) {
        let tripType = new TripType({
            description : req.body.description
        });
        return tripType;
    };
    
    ToDTO(req){
        if(req == null) return 'TripulantType does not exist.';
        let TripeType = new TripType(
            {
                id: req.TripulantTypeid,
                description : req.description
            }
        );
        return node;
    };
    
}

module.exports = TripulantTypeDTO;