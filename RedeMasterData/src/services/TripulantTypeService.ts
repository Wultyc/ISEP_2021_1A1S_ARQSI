import TripulantTypeDTO from '../dto/TripulantTypeDTO'
import TripulantTypeMapper from '../mappers/TripulantTypeMapper'
import TripulantTypeRepository from '../repository/TripulantTypeRepository'

export default class TripulantTypeService {

    dto: TripulantTypeDTO
    mapper: TripulantTypeMapper
    repository: TripulantTypeRepository

    constructor(tripulantTypeDTO: TripulantTypeDTO = new TripulantTypeDTO(), tripulantTypeMapper: TripulantTypeMapper = new TripulantTypeMapper(), tripulantTypeRepository: TripulantTypeRepository = new TripulantTypeRepository()) {
        this.dto = tripulantTypeDTO
        this.mapper = tripulantTypeMapper
        this.repository = tripulantTypeRepository
    }

}