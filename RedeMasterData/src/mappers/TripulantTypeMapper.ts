import TripulantType from '../domain/TripulantTypes/TripulantType';
import TripulantTypeDTO from '../dto/TripulantTypeDTO';
import IMapper from './interface/IMapper'

export default class TripulantTypeMapper implements IMapper {
    mapFromDomain(domain: any, dto: TripulantTypeDTO): TripulantTypeDTO {
      dto.description = domain.get_description()
      return dto;
    }
    mapFromRequest(req: any, dto: TripulantTypeDTO): TripulantTypeDTO {
        dto.id = req.body.id
        dto.description = req.body.description
        return dto;
    }
    mapFromMongo(mongo: any, dto: TripulantTypeDTO): TripulantTypeDTO {
    dto.id = mongo._id,
    dto.description = mongo.description 
    return dto;
    }
} 