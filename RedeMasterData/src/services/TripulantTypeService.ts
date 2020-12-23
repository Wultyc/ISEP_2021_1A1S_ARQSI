import TripulantTypeDTO from '../dto/TripulantTypeDTO'
import TripulantTypeMapper from '../mappers/TripulantTypeMapper'
import TripulantTypeRepository from '../repository/TripulantTypeRepository'
import Result from '../utils/Result'

export default class TripulantTypeService {

    dto: TripulantTypeDTO
    mapper: TripulantTypeMapper
    repository: TripulantTypeRepository
    result!: Result

    constructor(tripulantTypeDTO: TripulantTypeDTO = new TripulantTypeDTO(), tripulantTypeMapper: TripulantTypeMapper = new TripulantTypeMapper(), tripulantTypeRepository: TripulantTypeRepository = new TripulantTypeRepository()) {
        this.dto = tripulantTypeDTO
        this.mapper = tripulantTypeMapper
        this.repository = tripulantTypeRepository
    }

}