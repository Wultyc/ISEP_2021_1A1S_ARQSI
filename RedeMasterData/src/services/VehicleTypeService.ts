import VehicleTypeDTO from '../dto/VehicleTypeDTO'
import VehicleTypeMapper from '../mappers/VehicleTypeMapper'
import Result from '../utils/Result'


export default class VehicleTypeService {

    dto: VehicleTypeDTO
    mapper: VehicleTypeMapper
    result!: Result

    constructor(vehicleTypeDTO: VehicleTypeDTO = new VehicleTypeDTO(), vehicleTypeMapper: VehicleTypeMapper = new VehicleTypeMapper()) {
        this.dto = vehicleTypeDTO
        this.mapper = vehicleTypeMapper
    }

}