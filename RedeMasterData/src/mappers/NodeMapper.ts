import NodeDTO from '../dto/NodeDTO';
import IMapper from './interface/IMapper'

export default class NodeMapper implements IMapper{
    mapFromDomain(req: any, dto: NodeDTO): NodeDTO {
        throw new Error('Method not implemented.');
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