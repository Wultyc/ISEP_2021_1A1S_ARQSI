import { Route } from 'src/app/RedeMasterData/models/route';
import { Line } from 'src/app/RedeMasterData/models/line';
import { Trip } from '../trip';
export class TripMapper {
    constructor() { }

    fromResponseToDto = function (model: Trip, response: any, lineList: Line[], routeList: Route[]) {
        
        var line = new Line();
        for (let index = 0; index < lineList.length; index++) {
            if (lineList[index].id == response.lineId) {
                line = lineList[index];
            }
        }

        var route = new Route();
        for (let index = 0; index < routeList.length; index++) {
            if (routeList[index].id == response.routeId) {
                route = routeList[index];
            }
        }
        
        model.id = response.id;
        model.line = line;
        model.route = route;
        model.startTime = response.startTime;
        model.endTime = response.endTime;

        return model;
    }
}