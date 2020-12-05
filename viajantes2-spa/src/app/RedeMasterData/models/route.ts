import { Nodes } from './nodes';

export interface RouteNodes {
    node: Nodes;
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