import VehicleTypeDTO from '../dto/VehicleTypeDTO'
import VehicleTypeMapper from '../mappers/VehicleTypeMapper'
import VehicleTypeRepository from '../repository/VehicleTypeRepository'
import Result from '../utils/Result'


export default class VehicleTypeService {

    dto: VehicleTypeDTO
    mapper: VehicleTypeMapper
    repository: VehicleTypeRepository
    result!: Result

    constructor(vehicleTypeDTO: VehicleTypeDTO = new VehicleTypeDTO(), vehicleTypeMapper: VehicleTypeMapper = new VehicleTypeMapper(), vehicleTypeRepository: VehicleTypeRepository = new VehicleTypeRepository()) {
        this.dto = vehicleTypeDTO
        this.mapper = vehicleTypeMapper
        this.repository = vehicleTypeRepository
    }

}