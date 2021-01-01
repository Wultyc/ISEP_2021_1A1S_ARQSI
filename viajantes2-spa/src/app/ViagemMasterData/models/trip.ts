import { Time } from "@angular/common";

export class Trip {
    id: string;  
    lineId: string;
    routeId: string;
    startTime: Time;
    endTime: Time;
}

export class TripAdHocPost {
    lineId: string;
    routeId: string;
    startTime: Time;
}

export class TripPost {
    lineId: string;
    routeId: string;
    startTime: Time;
    frequency: number;
    numberOfTrips: number;
}