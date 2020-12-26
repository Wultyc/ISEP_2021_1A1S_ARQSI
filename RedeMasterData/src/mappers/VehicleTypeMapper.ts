import NodeDTO from '../dto/NodeDTO';
import VehicleTypeDTO from '../dto/VehicleTypeDTO';
import IMapper from './interface/IMapper'

export default class VehicleTypeMapper implements IMapper {
    mapFromDomain(req: any, dto: VehicleTypeDTO): VehicleTypeDTO {
        throw new Error('Method not implemented.');
    }
    mapFromRequest(req: any, dto: VehicleTypeDTO): VehicleTypeDTO {
        dto.id = req.body.id
        dto.description = req.body.description
        dto.autonomy = req.body.autonomy
        dto.costPerKilometer = req.body.costPerKilometer
        dto.averageCost = req.body.averageCost
        dto.averageSpeed = req.body.averageSpeed
        dto.fuelType = req.body.fuelType
        return dto;
    }
    mapFromMongo: (arg0: NodeDTO, arg1: NodeDTO) => NodeDTO
} 