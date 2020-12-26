import { AggregateRoot } from '../../core/domain/AggregateRoot'
import { UniqueEntityID } from '../../core/domain/UniqueEntityID'
import { Result } from '../../core/logic/Result'
import LinePaths from './LinePaths'
import { Guard } from '../../core/logic/Guard'
import { NodeId } from '../Nodes/NodeId'
import { TripulantTypeId } from '../TripulantTypes/TripulantTypeId'
import { VehicleTypeId } from '../VehicleType/VehicleTypeId'
import LineDTO from '../../dto/LineDTO'
import { RouteId } from '../Routes/RouteId'

interface LineProps {
    code: String,
    name: String,
    color: String,
    beginNode: NodeId,
    finalNode: NodeId,
    tripulantType: TripulantTypeId[],
    vehicleType: VehicleTypeId[],
    linePaths: LinePaths["props"][]
}

export default class Line extends AggregateRoot<LineProps>{
    private constructor(props: LineProps, id?: UniqueEntityID) {
        super(props, id);
    }
    get_code() {
        return this.props.code

    }
    get_name() {
        return this.props.name
    }
    get_color() {
        return this.props.color
    }

    get_beginNode() {
        return this.props.beginNode.get_value()
    }
    get_finalNode() {
        return this.props.finalNode.get_value()
    }
    get_tripulantType() {
        return this.props.tripulantType
    }
    get_vehicleType() {
        return this.props.vehicleType
    }
    get_linePaths() {
        return this.props.linePaths
    }

    public static create(props: LineDTO, id?: UniqueEntityID): Result<Line> {
        let err_msg: String[] = [];
        var tripTypes: TripulantTypeId[] = [];
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
        const domainNode: LineProps = {
            code: props.code,
            name: props.name,
            color: props.color,
            beginNode: new NodeId( {value: props.beginNode as string}),
            finalNode: new NodeId( {value: props.finalNode as string}),
            tripulantType: props.tripulantType.map( tp => { return new TripulantTypeId({value: tp as string})}),
            vehicleType: props.vehicleType.map( tp => { return new VehicleTypeId({value: tp as string})}),
            linePaths: props.lineRoutes?.map( rn => {return {routeId:new RouteId({value: rn.routeId as string}), orientation:rn.orientation as string}} )
        }
        const newDomainNode = new Line(domainNode, id)
        return Result.ok<Line>(newDomainNode)
    }
}