import { Nodes } from './nodes';
import { Route } from './route';
import { TripulantType } from './tripulant-type';
import { VehicleType } from './vehicle-type';

export interface LineRoutesPost {
    routeId: number;
    orientation: string;
}
export interface LineRoutes {
  route: Route;
  orientation: string;
}
export class LinePost {
  code: String;
  name: String | undefined;
  color: string;
  beginNode: string;
  finalNode: string;
  lineRoutes: LineRoutesPost[];
  tripulantType: string[];
  vehicleType: string[];
}
export class Line {
    constructor() {  
    }

      id: String;
      code: String;
      name: String | undefined;
      color: string;
      beginNode: Nodes;
      finalNode: Nodes;
      lineRoutes: LineRoutes[];
      tripulantType: TripulantType[];
      vehicleType: VehicleType[];
    }
    
