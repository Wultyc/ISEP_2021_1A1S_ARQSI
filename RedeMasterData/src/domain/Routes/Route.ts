import { AggregateRoot } from '../../core/domain/AggregateRoot'
import { UniqueEntityID } from '../../core/domain/UniqueEntityID'
import { Result } from '../../core/logic/Result'
import RouteDTO from '../../dto/RouteDTO'
import RouteNodes from './RouteNodes'
import { Guard } from '../../core/logic/Guard'
import { NodeId } from '../Nodes/NodeId'

interface RouteProps {
    distance: number,
    duration: number,
    isReinforcementRoute: boolean,
    isEmptyRoute: boolean,
    routeNodes: RouteNodes["props"][]
}

export default class Route extends AggregateRoot<RouteProps>{
    private constructor(props: RouteProps, id?: UniqueEntityID) {
        super(props, id);
    }
    get_id() {
        return this.id
    }
    get_distance() {
        return this.props.distance
    }
    get_duration() {
        return this.props.duration
    }
    get_isReinforcementRoute() {
        return this.props.isReinforcementRoute
    }
    get_isEmptyRoute() {
        return this.props.isEmptyRoute
    }
    get_routeNodes() {
        return this.props.routeNodes
    }

    public static create(props: RouteDTO, id?: UniqueEntityID): Result<Route> {
        let err_msg: String[] = [];

        if (props.routeNodes.length < 2) {
            return Result.fail<Route>('Route must have at least 2 nodes.');
        }

        if (props.routeNodes.length == 2 && props.routeNodes[0].nodeId == props.routeNodes[1].nodeId) {
            return Result.fail<Route>('When route only has 2 node, they must be different');
        }

        let guardedProps = [
            { argument: 0, argumentName: 'dummy' },
            { argument: "dummy", argumentName: 'dummy' },
            { argument: props.isReinforcementRoute, argumentName: 'isReinforcementRoute' },
            { argument: props.isEmptyRoute, argumentName: 'isEmptyRoute' }
        ]

        const tmpArray = props.routeNodes.map(rn => [
            { argument: rn.nodeId as string, argumentName: 'nodeId' },
            { argument: rn.distance, argumentName: 'distance' },
            { argument: rn.duration, argumentName: 'duration' }
        ]
        )

        tmpArray.map(p => guardedProps = guardedProps.concat(p))

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Route>(guardResult.message)
        }

        props.duration = props.routeNodes.reduce((acc, val) => acc + val.duration, 0)
        props.distance = props.routeNodes.reduce((acc, val) => acc + val.distance, 0)

        const domainNode: RouteProps = {
            distance: props.distance,
            duration: props.duration,
            isReinforcementRoute: props.isReinforcementRoute,
            isEmptyRoute: props.isEmptyRoute,
            routeNodes: props.routeNodes.map(rn => { return { nodeId: new NodeId({ value: rn.nodeId as string }), distance: rn.distance, duration: rn.duration } })
        }
        const newDomainNode = new Route(domainNode, id)
        return Result.ok<Route>(newDomainNode)
    }
}