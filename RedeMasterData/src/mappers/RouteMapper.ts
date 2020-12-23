import RouteDTO from '../dto/RouteDTO';
import IMapper from './interface/IMapper'

export default class RouteMapper implements IMapper{
    mapFromDomain(req: any, dto: RouteDTO): RouteDTO {
        throw new Error('Method not implemented.');
    }
    mapFromRequest(req: any, dto: RouteDTO): RouteDTO {
        throw new Error('Method not implemented.');
    }
} 