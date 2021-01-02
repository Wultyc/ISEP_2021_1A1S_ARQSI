import { Route, RoutePost } from '../route';
import { Nodes } from '../nodes';
export class RoutesMapper {
  constructor() { }

  fromFormToPost(routeNodes: any, formBody: any, object: RoutePost) {
    object.isEmptyRoute = formBody.isEmptyRoute
    object.isReinforcementRoute = formBody.isReinforcementRoute
    if (routeNodes && routeNodes.length > 0) {
      for (var i = 0; i < routeNodes.length; i++) {
        object.routeNodes.push(
          {
            nodeId: routeNodes[i].id,
            distance: routeNodes[i].distance,
            duration: routeNodes[i].duration
          }
        )
      };
    };
    return object;
  }

  fromResponseToDto(model: Route, response: any): Route {
    model.id = response._id
    model.distance = response.distance
    model.duration = response.duration
    model.isEmptyRoute = response.isEmptyRoute
    model.isReinforcementRoute = response.isReinforcementRoute


    for (let i = 0; i < response.routeNodes.length; i++) {
      let newNode: Nodes = new Nodes();

      newNode.id = response.routeNodes[i].nodeId._id,
        newNode.collectionNode = response.routeNodes[i].nodeId.collectionNode,
        newNode.surrenderNode = response.routeNodes[i].nodeId.surrenderNode,
        newNode.shortName = response.routeNodes[i].nodeId.shortName,
        newNode.name = response.routeNodes[i].nodeId.name,
        newNode.longitude = response.routeNodes[i].nodeId.longitude,
        newNode.latitude = response.routeNodes[i].nodeId.latitude
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

  updateDataToResponseModel(data: any, nodeList: Nodes[]): Route {
    let route = new Route();
    route.distance = data.distance;
    route.duration = data.duration;
    route.isEmptyRoute = route.isEmptyRoute;
    route.isReinforcementRoute = route.isReinforcementRoute;
    let routeNodesModel: any[] = [];
    for (let i = 0; i < data.routeNodes.length; i++) {
      for (let j = 0; j < nodeList.length; j++) {
        if (nodeList[j].id == data.routeNodes[i].nodeId) {
          routeNodesModel.push({
            nodeId: nodeList[j],
            distance: data.routeNodes[i].distance,
            duration: data.routeNodes[i].duration
          })
          break;
        }
      }
    }
    route.routeNodes = routeNodesModel;
    return route;
  }
}