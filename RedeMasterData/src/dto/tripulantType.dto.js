class TripulantTypeDTO {

    constructor() {}

    ToInsert (req) {
        let tripulantType = {
            description : req.body.description
        };
        return tripulantType;
    };
    
    ToDTO(req){
        if(req == null) return 'Tripulant type does not exist.';
        let tripulantType = {
            id: req.id,
            description : req.description
        };
        return tripulantType;
    };
    
}

module.exports = TripulantTypeDTO;