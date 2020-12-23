import IService from './interface/IService'
import VehicleTypeDTO from '../dto/VehicleTypeDTO'
import VehicleTypeMapper from '../mappers/VehicleTypeMapper'

export default class VehicleTypeService implements IService {

    vehicleTypeDTO: VehicleTypeDTO
    vehicleTypeMapper: VehicleTypeMapper

    constructor(vehicleTypeDTO:VehicleTypeDTO = new VehicleTypeDTO(), vehicleTypeMapper:VehicleTypeMapper = new VehicleTypeMapper()){
        this.vehicleTypeDTO = vehicleTypeDTO
        this.vehicleTypeMapper = vehicleTypeMapper
    }

    runService(): boolean | Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}