import RouteDTO from '../dto/RouteDTO';
import IMapper from './interface/IMapper'

export default class RouteMapper implements IMapper{
    mapFromDomain(req: any, dto: RouteDTO): RouteDTO {
        throw new Error('Method not implemented.');
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
} 