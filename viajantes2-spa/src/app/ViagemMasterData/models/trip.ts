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
    line: Line;
    route: Route;
    startTime: Time;
}

export class TripPost {
    line: Line;
    route: Route;
    startTime: Time;
    frequency: number;
    numberOfTrips: number;
}