import TripulantTypeDTO from '../dto/TripulantTypeDTO';
import IMapper from './interface/IMapper'

export default class TripulantTypeMapper implements IMapper{
    mapFromDomain(req: any, dto: TripulantTypeDTO): TripulantTypeDTO {
        throw new Error('Method not implemented.');
    }
    mapFromRequest(req: any, dto: TripulantTypeDTO): TripulantTypeDTO {
        throw new Error('Method not implemented.');
    }
} 