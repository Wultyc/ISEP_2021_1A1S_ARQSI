import { Nodes } from '../nodes';
export class NodesMapper {
    constructor() { }

    fromFormToDTO = function (formBody: any, object: Nodes) {
            object.shortName = formBody.shortName,
            object.name = formBody.name,
            object.longitude = formBody.longitude,
            object.latitude = formBody.latitude,
            object.collectionNode = formBody.collectionNode,
            object.surrenderNode = formBody.surrenderNode
        return object;
    }
    
    fromResponseToDto = function (model: Nodes, response: any) : Nodes {
            model.id = response._id,
            model.shortName = response.shortName,
            model.name = response.name,
            model.longitude = response.longitude,
            model.latitude = response.latitude,
            model.collectionNode = response.collectionNode,
            model.surrenderNode = response.surrenderNode
        
        return model;
    }
}