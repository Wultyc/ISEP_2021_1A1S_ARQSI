import VehicleTypeDTO from '../dto/VehicleTypeDTO';
import IMapper from './interface/IMapper'

export default class VehicleTypeMapper implements IMapper {
    mapFromDomain(domain: any, dto: VehicleTypeDTO): VehicleTypeDTO {
        dto.description = domain.get_description(),
        dto.autonomy = domain.get_autonomy() ,
        dto.costPerKilometer =  domain.get_costPerKilometer(),
        dto.averageCost = domain.get_averageCost() ,
        dto.averageSpeed = domain.get_averageSpeed() ,
        dto.fuelType = domain.get_fuelType() 
        return dto;    }
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
    mapFromMongo(mongo: any, dto: VehicleTypeDTO): VehicleTypeDTO {
        dto.id = mongo._id,
        dto.description = mongo.description,
        dto.autonomy = mongo.autonomy ,
        dto.costPerKilometer =  mongo.costPerKilometer,
        dto.averageCost = mongo.averageCost ,
        dto.averageSpeed = mongo.averageSpeed ,
        dto.fuelType = mongo.fuelType 
        return dto;
    }
} 