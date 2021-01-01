import { VehicleType } from "src/app/RedeMasterData/models/vehicle-type";

export class Vehicle {
    id: string;
    licencePlate: string;
    vin: string;
    vehicleTypeId: string;
    vehicleType: VehicleType | undefined;
    startDate: string;

    constructor(){
        this.vehicleType = new VehicleType();
    }
}