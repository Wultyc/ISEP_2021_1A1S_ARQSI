export interface RouteNodes {
    nodeId: string;
    distance: number;
    duration: number;
}
export class Route {
    distance: number;
    durantion: number;
    isReinforcmentRoute: boolean;
    isEmptyRoute: boolean;
    routeNodes: RouteNodes[];
}