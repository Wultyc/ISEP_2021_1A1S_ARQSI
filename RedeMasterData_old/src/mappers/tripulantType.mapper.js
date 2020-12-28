class TripulantTypeMapper {
    constructor(){}
    fromReqToDTO = function (reqBody, dto) {
            dto.id = reqBody.id
            dto.description = reqBody.description
        return dto;
    }

    fromDomainToDTO = function (domainObj, dto) {
    }
}
module.exports= TripulantTypeMapper;