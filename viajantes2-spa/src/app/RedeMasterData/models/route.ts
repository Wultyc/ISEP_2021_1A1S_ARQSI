import { Nodes } from './nodes';

export class RouteNodes {
    node: Nodes;
    distance: number;
    duration: number;
}
export class Route {
    distance: number;
    duration: number;
    isReinforcementRoute: boolean;
    isEmptyRoute: boolean;
    routeNodes: RouteNodes[] = [];
}