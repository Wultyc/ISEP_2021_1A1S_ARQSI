import NodeDTO from '../dto/NodeDTO';
import RouteDTO from '../dto/RouteDTO';
import IMapper from './interface/IMapper'

export default class RouteMapper implements IMapper{
    mapFromDomain(req: any, dto: RouteDTO): RouteDTO {
        dto.distance = req.get_distance()
        dto.duration = req.get_duration()
        dto.isReinforcementRoute = req.get_isReinforcementRoute()
        dto.isEmptyRoute = req.get_isEmptyRoute()
        dto.routeNodes = req.get_routeNodes().map((node) => {
            return {
                nodeId: node.nodeId.get_value(),
                distance: node.distance,
                duration: node.duration
            }
        })
        return dto;
    }
    mapFromRequest(req: any, dto: RouteDTO): RouteDTO {
        dto.id = req.body.id
        dto.distance = req.body.distance
        dto.duration = req.body.duration
        dto.isReinforcementRoute = req.body.isReinforcementRoute
        dto.isEmptyRoute = req.body.isEmptyRoute
        dto.routeNodes = req.body.routeNodes.map((node) => {
            return {
                nodeId: node.nodeId,
                distance: node.distance || 0,
                duration: node.duration || 0
            }
        })
        return dto;
    }
    mapFromMongo(req: any, dto: RouteDTO): RouteDTO {
        dto.id = req.id
        dto.distance = req.distance
        dto.duration = req.duration
        dto.isReinforcementRoute = req.isReinforcementRoute
        dto.isEmptyRoute = req.isEmptyRoute
        dto.routeNodes = req.routeNodes.map((node) => {
            return {
                nodeId: node.nodeId,
                distance: node.distance || 0,
                duration: node.duration || 0
            }
        })
        return dto;
    }
} 