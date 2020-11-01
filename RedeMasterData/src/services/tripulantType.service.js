const TripulantTypeRepository = require('../repositories/tripulantType.repository');
const TripType = require('../models/tripulantType.model');

var repo = new TripulantTypeRepository();

class TripulantTypeService {
    constructor() {}

    TripulantTypeCreate(tripulantType, callback) {
        repo.saveTrip(tripulantType, callback)
    };

    validate(TripulantType) {
    if (TripulantType.description =! null){
            return true;
        }

        else{

         return false;
        }
    };
}

module.exports = TripulantTypeService;    