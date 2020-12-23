import NodeDTO from '../dto/NodeDTO';
import IMapper from './interface/IMapper'

export default class NodeMapper implements IMapper{
    mapFromDomain(req: any, dto: NodeDTO): NodeDTO {
        throw new Error('Method not implemented.');
    }
    mapFromRequest(req: any, dto: NodeDTO): NodeDTO {
        throw new Error('Method not implemented.');
    }
} 