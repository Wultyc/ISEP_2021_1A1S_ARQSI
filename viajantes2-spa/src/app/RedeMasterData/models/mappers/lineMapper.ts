import { Route, RoutePost } from '../route';
import { Line, LinePost, LineRoutesPost } from '../line';
import { RoutesMapper } from './routeMapper'

export class LinesMapper {
    constructor() { }

    fromFormToPost = function (lineRoutes: any, formBody: any, object: LinePost) {
            object.code = formBody.code
            object.name = formBody.name
            object.color = formBody.code
            object.beginNode = formBody.beginNode
            object.finalNode = formBody.finalNode      
            object.lineRoutes = []
            if (lineRoutes && lineRoutes.length > 0 ) 
            {
                for (var i = 0; i < lineRoutes.length; i++) {
                    object.lineRoutes.push(
                        {
                        routeId: lineRoutes[i].id,
                        orientation: lineRoutes[i].orientation
                    });   
            };
            } 
            object.tripulantType = [];
            if (formBody.tripulantType && formBody.tripulantType.length > 0 ) 
            {
                for (var i = 0; i < formBody.tripulantType.length; i++) {
                    object.tripulantType.push(formBody.tripulantType[i]);   
            };
            } 
            object.vehicleType = [];
            if (formBody.vehicleType && formBody.vehicleType.length > 0 ) 
            {
                for (var i = 0; i < formBody.vehicleType.length; i++) {
                    object.vehicleType.push( formBody.vehicleType[i]);   
            };
            }                
            
        return object;
    }
    
    fromResponseToDto = function (model: Line, response: any) : Line {
        let mapper = new RoutesMapper();
            model.id = response._id
            model.code = response.code
            model.name = response.name
            model.color = response.color
            model.beginNode = response.beginNode
            model.finalNode = response.finalNode        
            model.lineRoutes = [];
            response.tripulantTypes = [];
            response.vehicleType = [];
            for (let i = 0; i < response.lineRoutes.length; i++) {
            model.lineRoutes.push(
                {
                    route: mapper.fromResponseToDto(new Route() as Route, response.lineRoutes[i].routeId),
                    orientation: response.lineRoutes[i].orientation
                });
            }        
            model.tripulantTypes = response.tripulantTypes.map((tripulantType: any) => {
                return {
                    id: tripulantType.id
                }
            })
            model.vehicleType = response.vehicleType.map((vehicleType: any) => {
                return {
                    id: vehicleType.id
                }
            })
        
        return model;
    }
}