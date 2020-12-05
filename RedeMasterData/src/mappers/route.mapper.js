class RouteMapper {
    constructor(){}
    fromReqToDTO = function (reqBody, dto) {
            dto.id = reqBody.id
            dto.distance = reqBody.distance
            dto.duration = reqBody.duration
            dto.isReinforcementRoute = reqBody.isReinforcementRoute
            dto.isEmptyRoute = reqBody.isEmptyRoute
            dto.routeNodes = reqBody.routeNodes
        return dto;
    }

    fromDomainToDTO = function (domainObj, dto) {
    }
}
module.exports= RouteMapper;