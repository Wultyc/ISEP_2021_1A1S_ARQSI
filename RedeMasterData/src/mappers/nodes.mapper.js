class NodesMapper {
    constructor(){}
    fromReqToDTO = function (reqBody, dto) {
            dto.id = reqBody.id,
            dto.shortName = reqBody.shortName,
            dto.name = reqBody.name,
            dto.longitude = reqBody.longitude,
            dto.latitude = reqBody.latitude,
            dto.collectionNode = reqBody.collectionNode,
            dto.surrenderNode = reqBody.surrenderNode
        return dto;
    }

    fromDomainToDTO = function (domainObj, dto) {
    }
}
module.exports= NodesMapper;