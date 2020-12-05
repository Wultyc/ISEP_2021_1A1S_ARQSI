class RouteMapper {
    constructor() { }
    fromReqToDTO = function (reqBody, dto) {
        dto.id = reqBody.id
        dto.distance = reqBody.distance
        dto.duration = reqBody.duration
        dto.isReinforcementRoute = reqBody.isReinforcementRoute
        dto.isEmptyRoute = reqBody.isEmptyRoute
        dto.routeNodes = reqBody.routeNodes.map((node) => {
            return {
                nodeId: node.nodeId,
                distance: node.distance || 0,
                duration: node.duration || 0
            }
        })
        return dto;
    }

    fromDomainToDTO = function (domainObj, dto) {
    }
}
module.exports = RouteMapper;