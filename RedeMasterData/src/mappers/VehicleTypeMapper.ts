import VehicleTypeDTO from '../dto/VehicleTypeDTO';
import IMapper from './interface/IMapper'

export default class VehicleTypeMapper implements IMapper{
    mapFromDomain(req: any, dto: VehicleTypeDTO): VehicleTypeDTO {
        throw new Error('Method not implemented.');
    }
    mapFromRequest(req: any, dto: VehicleTypeDTO): VehicleTypeDTO {
        throw new Error('Method not implemented.');
    }
} 