import LineDTO from '../dto/LineDTO';
import IMapper from './interface/IMapper'

export default class LineMapper implements IMapper{
    mapFromDomain(req: any, dto: LineDTO): LineDTO {
        throw new Error('Method not implemented.');
    }
    mapFromRequest(req: any, dto: LineDTO): LineDTO {
        dto.id = req.body.id,
        dto.code = req.body.code,
        dto.name = req.body.name,
        dto.color = req.body.color,
        dto.beginNode = req.body.beginNode,
        dto.finalNode = req.body.finalNode,
        dto.lineRoutes = req.body.lineRoutes,
        dto.tripulantType = req.body.tripulantType,
        dto.vehicleType = req.body.vehicleType

        return dto
    }
    mapFromMongo(req: any, dto: LineDTO): LineDTO {
        throw "not implemented";        
    }
} 