import { VehicleType } from '../../../RedeMasterData/models/vehicle-type';
import { Vehicle } from '../vehicles';
export class VehicleMapper {
    constructor() { }

    fromFormToDTO = function (formBody: any, object: Vehicle) {
        object.id = formBody.id;
        object.licencePlate = formBody.licencePlate;
        object.vin = formBody.vin;
        object.vehicleTypeId = formBody.vehicleType;
        object.startDate = formBody.startDate;
        return object;
    }

    fromResponseToDto = function (model: Vehicle, response: any) {
        model.id = response.id;
        model.licencePlate = response.licencePlate;
        model.vin = response.vin;
        model.vehicleTypeId = response.vehicleTypeId;
        model.startDate = response.startDate;

        return model;
    }

    addVehicleTypes = function (vehicle: Vehicle[], vehicleType: any[]) {
        const finalVehicleList: Vehicle[] = []
        
        vehicle.forEach(v => {
            const vt = vehicleType.find(vt => vt['_id'] == v.vehicleTypeId)
            v.vehicleType = new VehicleType()
            v.vehicleType.id = v.vehicleTypeId
            v.vehicleType.description = vt?.description || "Unknown"
            v.vehicleType.autonomy = vt?.autonomy || 0
            v.vehicleType.costPerKilometer = vt?.costPerKilometer || 0
            v.vehicleType.averageCost = vt?.averageCost || 0
            v.vehicleType.averageSpeed = vt?.averageSpeed || 0
            v.vehicleType.fuelType = vt?.fuelType || ""
            
            finalVehicleList.push(v)
        })
        
        return finalVehicleList;
    }
}