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
import RouteDTO from '../../dto/RouteDTO'
import LinePatchDTO from '../../dto/LinePatchDTO'

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

    public static create(props: LineDTO, routeList: Result<RouteDTO[]>, id?: UniqueEntityID): Result<Line> {
        let failedNodesValidation: boolean = false;

        if (routeList.isFailure) {
            return Result.fail<Line>("Cannot retrieve routes to validate line")
        }

        let guardedProps = [
            { argument: props.code, argumentName: 'name' },
            { argument: props.name, argumentName: 'name' },
            { argument: props.color, argumentName: 'shortName' },
            { argument: props.beginNode, argumentName: 'beginNode' },
            { argument: props.finalNode, argumentName: 'finalNode' }
        ]

        const tmpArray = props.lineRoutes.map(rn => [
            { argument: rn.routeId, argumentName: 'routeId' },
            { argument: rn.orientation, argumentName: 'orientation' }
        ]
        )

        tmpArray.map(p => guardedProps = guardedProps.concat(p))

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Line>(guardResult.message)
        }

        props.lineRoutes.forEach((lr, index, array) => {
            let startNode: String | undefined
            let finalNode: String | undefined
            let route: RouteDTO | undefined

            route = routeList.getValue().find(route => route.id == lr.routeId)

            if (lr.orientation == "Go") {
                startNode = route?.routeNodes[0].nodeId
                finalNode = route?.routeNodes[route.routeNodes.length - 1].nodeId
            } else {
                startNode = route?.routeNodes[route.routeNodes.length - 1].nodeId
                finalNode = route?.routeNodes[0].nodeId
            }

            if (startNode?.toString() != props.beginNode.toString() || finalNode?.toString() != props.finalNode.toString()) {
                failedNodesValidation = true
            }
        })

        if (failedNodesValidation) {
            return Result.fail<Line>("Route begin node or final node are not the same of line")
        }

        const domainLine: LineProps = {
            code: props.code,
            name: props.name,
            color: props.color,
            beginNode: new NodeId({ value: props.beginNode as string }),
            finalNode: new NodeId({ value: props.finalNode as string }),
            tripulantType: props.tripulantType.map(tp => { return new TripulantTypeId({ value: tp as string }) }),
            vehicleType: props.vehicleType.map(tp => { return new VehicleTypeId({ value: tp as string }) }),
            linePaths: props.lineRoutes?.map(rn => { return { routeId: new RouteId({ value: rn.routeId as string }), orientation: rn.orientation as string } })
        }
        const newDomainLine = new Line(domainLine, id)
        return Result.ok<Line>(newDomainLine)
    }

    public static update(line: Result<LineDTO>, newPath: LinePatchDTO, routeList: Result<RouteDTO[]>, id?: UniqueEntityID): Result<Line> {
        if (line.isFailure) {
            return Result.fail<Line>("Cannot retrieve line")
        }
        else if (routeList.isFailure) {
            return Result.fail<Line>("Cannot retrieve routes to validate line")
        }

        const props: LineDTO = line.getValue()

        let startNode: String | undefined
        let finalNode: String | undefined
        let route: RouteDTO | undefined

        route = routeList.getValue().find(route => route.id == newPath.routeId)

        if (newPath.orientation == "Go") {
            startNode = route?.routeNodes[0].nodeId
            finalNode = route?.routeNodes[route.routeNodes.length - 1].nodeId
        } else {
            startNode = route?.routeNodes[route.routeNodes.length - 1].nodeId
            finalNode = route?.routeNodes[0].nodeId
        }

        if (startNode?.toString() != props.beginNode.toString() || finalNode?.toString() != props.finalNode.toString()) {
            return Result.fail<Line>("Route begin node or final node are not the same of line")
        }

        props.lineRoutes.push(newPath)

        const domainLine: LineProps = {
            code: props.code,
            name: props.name,
            color: props.color,
            beginNode: new NodeId({ value: props.beginNode as string }),
            finalNode: new NodeId({ value: props.finalNode as string }),
            tripulantType: props.tripulantType.map(tp => { return new TripulantTypeId({ value: tp as string }) }),
            vehicleType: props.vehicleType.map(tp => { return new VehicleTypeId({ value: tp as string }) }),
            linePaths: props.lineRoutes?.map(rn => { return { routeId: new RouteId({ value: rn.routeId as string }), orientation: rn.orientation as string } })
        }
        const newDomainLine = new Line(domainLine, id)
        return Result.ok<Line>(newDomainLine)
    }
}