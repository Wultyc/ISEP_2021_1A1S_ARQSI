import { Trip } from '../trip';
export class TripMapper {
    constructor() { }

    fromResponseToDto = function (model: Trip, response: any) {
        model.id = response.id;
        model.lineId = response.lineId;
        model.routeId = response.routeId;
        model.startTime = response.startTime;
        model.endTime = response.endTime;

        return model;
    }
}