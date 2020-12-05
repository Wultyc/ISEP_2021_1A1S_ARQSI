class LinesMapper {
    constructor(){}
    fromReqToDTO = function (reqBody, dto) {
            dto.id = reqBody.id,
            dto.code = reqBody.code,
            dto.name = reqBody.name,
            dto.color = reqBody.color,
            dto.beginNode = reqBody.beginNode,
            dto.finalNode = reqBody.finalNode,
            dto.lineRoutes = reqBody.lineRoutes,
            dto.tripulantType = reqBody.tripulantType,
            dto.vehicleType = reqBody.vehicleType

        return dto;
    }

    fromDomainToDTO = function (domainObj, dto) {
    }
}
module.exports= LinesMapper;