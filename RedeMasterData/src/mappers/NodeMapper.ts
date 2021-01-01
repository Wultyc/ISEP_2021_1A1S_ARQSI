import NodeDTO from '../dto/NodeDTO';
import IMapper from './interface/IMapper'

export default class NodeMapper implements IMapper{
    mapFromDomain(domain: any, dto: NodeDTO): NodeDTO {
        dto.shortName = domain.get_shortName(),
        dto.name = domain.get_name() ,
        dto.longitude =  domain.get_longitude(),
        dto.latitude = domain.get_latitude() ,
        dto.collectionNode = domain.get_collectionNode() ,
        dto.surrenderNode = domain.get_surrenderNode() 
        return dto;
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

    mapFromMongo(mongo: any, dto: NodeDTO): NodeDTO {
        dto.id = mongo._id,
        dto.shortName = mongo.shortName,
        dto.name = mongo.name ,
        dto.longitude =  mongo.longitude,
        dto.latitude = mongo.latitude ,
        dto.collectionNode = mongo.collectionNode ,
        dto.surrenderNode = mongo.surrenderNode 
        return dto;
    }
} 