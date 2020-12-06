class LinesMapper {
    constructor() { }
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
    toInsertRouteInLine = function (req, dto) {
        dto.lineId = req.params.lineId
        dto.orientation = req.params.orientation
        dto.route.isReinforcementRoute = req.body.isReinforcementRoute
        dto.route.isEmptyRoute = req.body.isEmptyRoute
        dto.route.routeNodes = req.body.routeNodes.map((r) => {
            return {
                nodeId: r.nodeId,
                distance: r.distance || 0,
                duration: r.duration || 0,
            }
        })
        return dto;
    };

    fromDomainToDTO = function (domainObj, dto) {
    }
}
module.exports = LinesMapper;