const TripulantTypeRepository = require('../repositories/tripulantType.repository');
const TripulantType = require('../models/tripulantType.model');

var repo = new TripulantTypeRepository();

class TripulantTypeService {
    constructor() { }

    TripulantTypeCreate(tripulantType, callback) {
        repo.save(tripulantType, callback)
    };

}

module.exports = TripulantTypeService;    