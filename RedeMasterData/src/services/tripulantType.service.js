const TripulantTypeRepository = require('../repositories/tripulantType.repository');
const TripulantType = require('../models/tripulantType.model');

const repo = new TripulantTypeRepository();

class TripulantTypeService {
    constructor() { }

    tripulantTypeGetById(id, callback) {
        repo.getById(id, callback);
    };

    tripulantTypeGetAll(callback) {
        repo.getAll(callback);
    };

    tripulantTypeCreate(tripulantType, callback) {
        repo.save(tripulantType, callback)
    };

    tripulantTypeDelete(id, callback) {
        repo.delete(id, callback);
    };

}

module.exports = TripulantTypeService;    