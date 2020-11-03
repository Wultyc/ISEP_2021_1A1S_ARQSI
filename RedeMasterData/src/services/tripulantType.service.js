const TripulantTypeRepository = require('../repositories/tripulantType.repository');
const TripulantType = require('../models/tripulantType.model');

var repo = new TripulantTypeRepository();

class TripulantTypeService {
    constructor() { }

    TripulantTypeGetById(id, callback) {
        repo.getById(id, callback);
    };

    TripulantTypeCreate(tripulantType, callback) {
        repo.save(tripulantType, callback)
    };

}

module.exports = TripulantTypeService;    