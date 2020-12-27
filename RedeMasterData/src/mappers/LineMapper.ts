import LineDTO from '../dto/LineDTO';
import LinePatchDTO from '../dto/LinePatchDTO';
import IMapper from './interface/IMapper'

export default class LineMapper implements IMapper{
    mapFromDomain(domain: any, dto: LineDTO): LineDTO {
        dto.code = domain.get_code(),
        dto.name = domain.get_name(),
        dto.color = domain.get_color(),
        dto.beginNode = domain.get_beginNode(),
        dto.finalNode = domain.get_finalNode(),
        dto.lineRoutes = domain.get_linePaths().map((route) => {
            return {
                routeId: route.routeId.get_value(),
                orientation: route.orientation
            }
        }),
        dto.tripulantType = domain.get_tripulantType(),
        dto.vehicleType = domain.get_vehicleType()

        return dto
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
    mapFromPatchRequest(req: any, dto: LinePatchDTO): LinePatchDTO {
        dto.routeId = req.body.routeId,
        dto.orientation = req.body.orientation

        return dto
    }
    mapFromMongo(mongo: any, dto: LineDTO): LineDTO {
        dto.id = mongo._id,
        dto.code = mongo.code,
        dto.name = mongo.name,
        dto.color = mongo.color,
        dto.beginNode = mongo.beginNode,
        dto.finalNode = mongo.finalNode,
        dto.lineRoutes = mongo.lineRoutes,
        dto.tripulantType = mongo.tripulantType,
        dto.vehicleType = mongo.vehicleType

        return dto       
    }
} 