import { Time } from "@angular/common";
import { Trip } from "./trip";
import { VehicleService } from "./vehicleServices";

export class WorkBlock {
    id: string;  
    trip: Trip;
    vehicleService: VehicleService;
    //tripulantService: TripulantService;
    startTime: Time;
    endTime: Time;
}

export class WorkBlockPost {
    tripId: string;
    vehicleServiceId: string;
    startTime: Time;
    frequency: number;
    numberOfWorkBlocks: number;
}