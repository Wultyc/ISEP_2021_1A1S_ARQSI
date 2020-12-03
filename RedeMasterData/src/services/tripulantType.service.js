const TripulantTypeRepository = require('../repositories/tripulantType.repository');
const TripulantTypeDomain = require('../domains/tripulantType.domain.ts');

const repo = new TripulantTypeRepository();

class TripulantTypeService {
    constructor() { }

    tripulantTypeGetById(id, callback) {
        repo.getById(id, callback);
    };

    tripulantTypeGetAll(callback) {
        repo.getAll(callback);
    };

    tripulantTypeCreate(tripulantTypeDTO, callback) {
        const tripulantTypeDomain = TripulantTypeDomain.create(tripulantTypeDTO);
        //usar um mapper para converter o objeto de dominio para DTO
        repo.save(tripulantTypeDomain, callback)
    };

    tripulantTypeDelete(id, callback) {
        repo.delete(id, callback);
    };

}

module.exports = TripulantTypeService;    