import { VehicleServicePost } from '../vehicleServices';
export class VehicleServiceMapper {
    constructor() { }

 fromFormToCreate = function (formBody: any, object: VehicleServicePost) {
    object.VehicleId = formBody.vehicleId;
    object.Date = formBody.date
    return object;
}
}