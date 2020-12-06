import { Route, RoutePost } from '../route';
import { Nodes } from '../nodes';
export class RoutesMapper {
    constructor() { }

    fromFormToPost = function (routeNodes: any, formBody: any, object: RoutePost) {
            object.isEmptyRoute = formBody.isEmptyRoute
            object.isReinforcementRoute = formBody.isReinforcementRoute            
            if (routeNodes && routeNodes.length > 0 ) 
            {
                for (var i = 0; i < routeNodes.length; i++) {
                    object.routeNodes.push(
                        {
                        nodeId: routeNodes[i].id,
                        distance: routeNodes[i].distance,
                        duration: routeNodes[i].duration}
                    )};   
            };                     
        console.log(object)
        return object;
    }
    
    fromResponseToDto = function (model: Route, response: any) : Route {
            model.id    = response._id
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