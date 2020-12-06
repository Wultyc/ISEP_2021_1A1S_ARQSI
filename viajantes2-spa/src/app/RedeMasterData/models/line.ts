import { TripulantType } from './tripulant-type';
import { VehicleType } from './vehicle-type';

export interface LineRoutes {
    routeId: number;
    orientation: string;
}
export class Line {
    constructor() {  
    }

      id: String;
      code: String;
      name: String | undefined;
      color: number;
      beginNode: number;
      finalNode: boolean;
      lineRoutes: LineRoutes[];
      tripulantTypes: TripulantType[];
      vehicleType: VehicleType[];
    }   