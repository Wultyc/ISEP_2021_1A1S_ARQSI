import { VehicleService, VehicleServicePost } from '../vehicleServices';
import { Vehicle } from '../vehicles';
import { VehicleMapper } from './vehicles';
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

    fromResponseToExpandedDTO = function (dto: VehicleService, response: any) {
       let vehicleMapper = new VehicleMapper();
        dto.id = response.id,
        dto.vehicle = vehicleMapper.fromResponseToDto(new Vehicle(), response.vehicle);
        dto.date = response.date;
        return dto;
    }

 fromFormToCreate = function (formBody: any, object: VehicleServicePost) {
    object.VehicleId = formBody.vehicleId;
    object.Date = formBody.date
    return object;
}
}