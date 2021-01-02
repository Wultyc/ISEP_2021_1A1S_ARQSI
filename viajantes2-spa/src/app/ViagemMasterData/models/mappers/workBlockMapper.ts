
import { WorkBlock, WorkBlockPost } from '../workBlock';
import { Trip } from '../trip';
import { VehicleService } from '../vehicleServices';

export class WorkBlockMapper {
    constructor() { }

    fromResponseToDto = function (model: WorkBlock, response: any, tripList: Trip[], vehicleServiceList: VehicleService[]) {
        
        var trip = new Trip();
        for (let index = 0; index < tripList.length; index++) {
            if (tripList[index].id == response.tripId) {
                trip = tripList[index];
            }
        }

        var vehicleService = new VehicleService();
        for (let index = 0; index < vehicleServiceList.length; index++) {
            if (vehicleServiceList[index].id == response.vehicleServiceId) {
                vehicleService = vehicleServiceList[index];
            }
        }
        
        model.id = response.id;
        model.trip = trip;
        model.vehicleService = vehicleService;
        //model.tripulantService = tripulantService;
        model.startTime = response.startTime;
        model.endTime = response.endTime;

        return model;
    }

    fromFormToDTO = function (formBody: any, object: WorkBlockPost) {
        object.tripId = formBody.trip;
        object.vehicleServiceId = formBody.vehicleService;
        object.startTime = formBody.startTime;
        object.frequency = formBody.frequency;
        object.numberOfWorkBlocks = formBody.numberOfWorkBlocks;
        return object;
    }

}