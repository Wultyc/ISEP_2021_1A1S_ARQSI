import LineDTO from '../dto/LineDTO';
import IMapper from './interface/IMapper'

export default class LineMapper implements IMapper{
    mapFromDomain(req: any, dto: LineDTO): LineDTO {
        throw new Error('Method not implemented.');
    }
    mapFromRequest(req: any, dto: LineDTO): LineDTO {
        throw new Error('Method not implemented.');
    }
} 