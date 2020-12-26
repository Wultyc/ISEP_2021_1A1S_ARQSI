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

        // if (props.surrenderNode == true && props.collectionNode == false) {
        //     err_msg.push("A Surrender Node must always be a Collection Node.")
        //     return Result.fail<Node>(err_msg)
        // }

        // const guardedProps = [
        //     { argument: props.name, argumentName: 'name' },
        //     { argument: props.shortName, argumentName: 'shortName' },
        //     { argument: props.longitude, argumentName: 'longitude' },
        //     { argument: props.latitude, argumentName: 'latitude' },
        //     { argument: props.collectionNode, argumentName: 'collectionNode' },
        //     { argument: props.surrenderNode, argumentName: 'surrenderNode' }
        // ];

        // const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        // if (!guardResult.succeeded) {
        //     return Result.fail<Node>(guardResult.message)
        // }
        const domainNode: RouteProps = {
            distance: props.distance,
            duration: props.duration,
            isReinforcementRoute: props.isReinforcementRoute,
            isEmptyRoute: props.isEmptyRoute,
            routeNodes: props.routeNodes.map( rn => {return {nodeId:new NodeId({value:rn.nodeId as string}), distance:rn.distance, duration:rn.duration}} )
        }
        const newDomainNode = new Route(domainNode, id)
        return Result.ok<Route>(newDomainNode)
    }
}