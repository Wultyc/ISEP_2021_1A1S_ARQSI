import { VehicleService, VehicleServicePost } from '../vehicleServices';
import { Vehicle } from '../vehicles';
export class VehicleServiceMapper {
    constructor() { }

    fromResponseToDto = function (model: VehicleService, response: any, vehicleList: Vehicle[]) {

        var vehicle = new Vehicle();
        for (let index = 0; index < vehicleList.length; index++) {
            if (vehicleList[index].id.toUpperCase() == response.vehicleId.toUpperCase()) {
                vehicle = vehicleList[index];
            }
        }
        
        model.id = response.id;
        model.vehicle = vehicle;
        model.date = response.date;

        return model;
    }


 fromFormToCreate = function (formBody: any, object: VehicleServicePost) {
    object.VehicleId = formBody.vehicleId;
    object.Date = formBody.date
    return object;
}
}