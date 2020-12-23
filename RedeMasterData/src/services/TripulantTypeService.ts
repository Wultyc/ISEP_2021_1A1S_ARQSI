import IService from './interface/IService'
import TripulantTypeDTO from '../dto/TripulantTypeDTO'
import TripulantTypeMapper from '../mappers/TripulantTypeMapper'

export class TripulantTypeService implements IService {
    runService(): boolean | Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}