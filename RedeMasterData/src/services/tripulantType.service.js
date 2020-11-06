const TripulantTypeRepository = require('../repositories/tripulantType.repository');
const TripulantType = require('../models/tripulantType.model');

const repo = new TripulantTypeRepository();

class TripulantTypeService {
    constructor() { }

    tripulantTypeGetById(id, callback) {
        repo.getById(id, callback);
    };

    tripulantTypeCreate(tripulantType, callback) {
        repo.save(tripulantType, callback)
    };

}

module.exports = TripulantTypeService;    