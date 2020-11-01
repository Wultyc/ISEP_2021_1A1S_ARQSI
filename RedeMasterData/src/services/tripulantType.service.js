const TripulantTypeRepository = require('../repositories/tripulantType.repository');
const TripType = require('../models/tripulantType.model');

var repo = new TripulantTypeRepository();

class TripulantTypeService {
    constructor() {}

    TripulantTypeCreate(tripType, callback) {
        repo.saveTrip(tripType, callback)
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