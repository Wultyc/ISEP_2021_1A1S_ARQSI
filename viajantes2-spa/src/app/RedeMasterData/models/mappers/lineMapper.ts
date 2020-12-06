import { Route, RoutePost } from '../route';
import { TripulantType } from '../tripulant-type';
import { VehicleType } from '../vehicle-type';
import { Nodes } from '../nodes';
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
        model.id = response._id
        model.code = response.code
        model.name = response.name
        model.color = response.color
        model.beginNode = response.beginNode
        model.finalNode = response.finalNode        
        model.lineRoutes = [];
        model.tripulantType = [];
        model.vehicleType = [];
        for (let i = 0; i < response.lineRoutes.length; i++) {
            model.lineRoutes.push({
                route: response.lineRoutes[i].routeId,
                orientation: response.lineRoutes[i].orientation
            });
        }
        for (let i = 0; i < response.tripulantType.length; i++) {
            let tripulantType = new TripulantType();
            tripulantType.id = response.tripulantType.id;
            model.tripulantType.push(tripulantType);
        }  
        for (let i = 0; i < response.vehicleType.length; i++) {
            let vehicleType = new VehicleType();
            vehicleType.id = response.vehicleType.id;
            model.vehicleType.push(vehicleType);
        }        
        return model;
    }

    updateDataToResponseModel(data: any, nodeList: Nodes[]) : Route {
        for (let i = 0; i < nodeList.length; i++) {
          if (nodeList[i].id == data.beginNode) {
            data.beginNode = nodeList[i];
          } else if (nodeList[i].id == data.finalNode) {
            data.finalNode = nodeList[i];
          }
        }
        return data;
      }
}