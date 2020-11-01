const TripulantTypeRepository = require('../repositories/tripulantType.repository');
const TripulantType = require('../models/tripulantType.model');

var repo = new TripulantTypeRepository();

class TripulantTypeService {
    constructor() {}

    TripulantTypeCreate(tripulantType, callback) {
        repo.save(tripulantType, callback)
    };

    // Validate(TripulantType) {
    //     if (!TripulantType.description == null){
    //         return true;
    //     }
    //     else{
    //       //return error message
    //     }
    // };
}

module.exports = TripulantTypeService;    