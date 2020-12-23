import TripulantTypeDTO from '../dto/TripulantTypeDTO'
import TripulantTypeMapper from '../mappers/TripulantTypeMapper'
import Result from '../utils/Result'

export default class TripulantTypeService {

    dto: TripulantTypeDTO
    mapper: TripulantTypeMapper
    result!: Result

    constructor(tripulantTypeDTO: TripulantTypeDTO = new TripulantTypeDTO(), tripulantTypeMapper: TripulantTypeMapper = new TripulantTypeMapper()) {
        this.dto = tripulantTypeDTO
        this.mapper = tripulantTypeMapper
    }

}