import { AggregateRoot } from '../../core/domain/AggregateRoot'
import { UniqueEntityID } from '../../core/domain/UniqueEntityID'
import { Result } from '../../core/logic/Result'
import RouteId from './RouteId'
import RouteDTO from '../../dto/RouteDTO'
import RouteNodes from './RouteNodes'
import { Guard } from '../../core/logic/Guard'

interface RouteProps {
    id: String,
    distance: number,
    duration: number,
    isReinforcementRoute: boolean,
    isEmptyRoute: boolean,
    routeNodes: RouteNodes[]
}

export default class Route extends AggregateRoot<RouteDTO>{
    private constructor(props: RouteProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get_id() {
        return this.props.id
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
    


    public static create(props: NodeProps, id?: UniqueEntityID): Result<Node> {
        let err_msg: String[] = [];

        if (props.surrenderNode == true && props.collectionNode == false) {
            err_msg.push("A Surrender Node must always be a Collection Node.")
            return Result.fail<Node>(err_msg)
        }

        const guardedProps = [
            { argument: props.name, argumentName: 'name' },
            { argument: props.shortName, argumentName: 'shortName' },
            { argument: props.longitude, argumentName: 'longitude' },
            { argument: props.latitude, argumentName: 'latitude' },
            { argument: props.collectionNode, argumentName: 'collectionNode' },
            { argument: props.surrenderNode, argumentName: 'surrenderNode' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Node>(guardResult.message)
        }

        const newDomainNode = new Node(props, id)
        return Result.ok<Node>(newDomainNode)
    }
}