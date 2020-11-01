const TripulantTypeRepository = require('../repositories/tripulantType.repository');
const TripType = require('../models/tripulantType.model');

var repo = new TripulantTypeRepository();

class TripulantTypeService {
    constructor() { }

    TripulantTypeCreate(tripulantType, callback) {
        repo.saveTrip(tripulantType, callback)
    };

}

module.exports = TripulantTypeService;    