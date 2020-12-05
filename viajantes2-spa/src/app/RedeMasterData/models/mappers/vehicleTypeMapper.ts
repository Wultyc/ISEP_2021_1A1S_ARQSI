import { VehicleType } from '../vehicle-type';
export class VehicleTypeMapper {
    constructor() { }

    fromFormToDTO = function (formBody: any, object: VehicleType) {
            object.autonomy = formBody.autonomy,
            object.averageCost = formBody.averageCost,
            object.averageSpeed = formBody.averageSpeed,
            object.costPerKilometer = formBody.costPerKilometer,
            object.description = formBody.description,
            object.fuelType = formBody.fuelType
        return object;
    }
    
    fromResponseToDto = function (model: VehicleType, response: any) {
            model.autonomy = response.autonomy,
            model.averageCost = response.averageCost,
            model.averageSpeed = response.averageSpeed,
            model.costPerKilometer = response.costPerKilometer,
            model.description = response.description,
            model.fuelType = response.fuelType
        
        return response;
    }
}