import { Nodes } from './nodes';

export class RouteNodesSimple {
    nodeId: string;
    distance: number;
    duration: number;
}
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

export class RoutePost {
    isReinforcementRoute: boolean;
    isEmptyRoute: boolean;
    routeNodes: RouteNodesSimple[] = [];
}