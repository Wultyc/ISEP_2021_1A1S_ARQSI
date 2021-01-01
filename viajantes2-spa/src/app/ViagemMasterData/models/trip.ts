import { Time } from "@angular/common";
import { Line } from "src/app/RedeMasterData/models/line";
import { Route } from "src/app/RedeMasterData/models/route";

export class Trip {
    id: string;  
    line: Line;
    route: Route;
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