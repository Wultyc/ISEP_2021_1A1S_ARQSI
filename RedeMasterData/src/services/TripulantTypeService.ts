import IService from './interface/IService'
import TripulantTypeDTO from '../dto/TripulantTypeDTO'
import TripulantTypeMapper from '../mappers/TripulantTypeMapper'

export default class TripulantTypeService implements IService {

    tripulantTypeDTO: TripulantTypeDTO
    tripulantTypeMapper: TripulantTypeMapper

    constructor(tripulantTypeDTO:TripulantTypeDTO = new TripulantTypeDTO(), tripulantTypeMapper:TripulantTypeMapper = new TripulantTypeMapper()){
        this.tripulantTypeDTO = tripulantTypeDTO
        this.tripulantTypeMapper = tripulantTypeMapper
    }

    runService(): boolean | Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}