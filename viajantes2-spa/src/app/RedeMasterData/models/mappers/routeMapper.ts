import { Route } from '../route';
import { Nodes } from '../nodes';
export class RoutesMapper {
    constructor() { }

    fromFormToPost = function (formBody: any, object: any) {
            object.distance = formBody.shortName
            object.durantion = formBody.name
            object.isEmptyRoute = formBody.longitude
            object.isReinforcmentRoute = formBody.latitude            
            if (formBody && formBody.routeNodes && formBody.routeNodes.length > 0 ) 
            {
                for (var i = 0; i < formBody.routeNodes.length; i++) {
                    object.routeNodes.push(
                        {
                        id: formBody.routeNodes[i].id,
                        distance: formBody.routeNodes[i].distance,
                        duration: formBody.routeNodes[i].duration}
                    )};   
            };                     
            
        return object;
    }
    
    fromResponseToDto = function (model: Route, response: any) : Route {
            model.distance = response.distance
            model.duration = response.duration
            model.isEmptyRoute = response.isEmptyRoute
            model.isReinforcementRoute = response.isReinforcementRoute
             
            
            for (let i = 0; i < response.routeNodes.length; i++) {
                let newNode: Nodes = new Nodes();
                
                newNode.id =                response.routeNodes[i].nodeId._id,
                newNode.collectionNode =     response.routeNodes[i].nodeId.collectionNode,
                newNode.surrenderNode =      response.routeNodes[i].nodeId.surrenderNode,
                newNode.shortName =          response.routeNodes[i].nodeId.shortName,
                newNode.name =               response.routeNodes[i].nodeId.name,
                newNode.longitude =          response.routeNodes[i].nodeId.longitude,
                newNode.latitude =           response.routeNodes[i].nodeId.latitude
                model.routeNodes.push(
                {                    
                    node: newNode,
                    distance: response.routeNodes[i].distance,
                    duration: response.routeNodes[i].duration
                }                   
                )
            };
        
        return model;
    }
}