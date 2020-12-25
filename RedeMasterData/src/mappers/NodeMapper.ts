import NodeDTO from '../dto/NodeDTO';
import IMapper from './interface/IMapper'

export default class NodeMapper implements IMapper{
    mapFromDomain(req: any, dto: NodeDTO): NodeDTO {
        req.id = dto.id, 
        req.shortName = dto.shortName,
        req.name = dto.name ,
        req.longitude =  dto.longitude,
        req.latitude = dto.latitude ,
        req.collectionNode = dto.collectionNode ,
        req.surrenderNode = dto.surrenderNode 
        return req;
    }
    mapFromRequest(req: any, dto: NodeDTO): NodeDTO {
        dto.id = req.body.id,
        dto.shortName = req.body.shortName,
        dto.name = req.body.name,
        dto.longitude = req.body.longitude,
        dto.latitude = req.body.latitude,
        dto.collectionNode = req.body.collectionNode,
        dto.surrenderNode = req.body.surrenderNode
        return dto;
    }
} 