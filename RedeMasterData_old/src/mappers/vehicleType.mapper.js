class VehicleTypeMapper {
    constructor(){}
    fromReqToDTO = function (reqBody, dto) {
            dto.id = reqBody.id
            dto.description = reqBody.description
            dto.autonomy = reqBody.autonomy
            dto.costPerKilometer = reqBody.costPerKilometer
            dto.averageCost = reqBody.averageCost
            dto.averageSpeed = reqBody.averageSpeed
            dto.fuelType = reqBody.fuelType
        return dto;
    }

    fromDomainToDTO = function (domainObj, dto) {
    }
}
module.exports= VehicleTypeMapper;