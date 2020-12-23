import IService from './interface/IService'
import VehicleTypeDTO from '../dto/VehicleTypeDTO'
import VehicleTypeMapper from '../mappers/VehicleTypeMapper'

export class VehicleTypeService implements IService {
    runService(): boolean | Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}