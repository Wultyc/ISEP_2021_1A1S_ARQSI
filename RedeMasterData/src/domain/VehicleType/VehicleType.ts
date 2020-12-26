import { AggregateRoot } from '../../core/domain/AggregateRoot'
import { UniqueEntityID } from '../../core/domain/UniqueEntityID'
import { Result } from '../../core/logic/Result'
import VehicleTypeDTO from '../../dto/VehicleTypeDTO'
import { Guard } from '../../core/logic/Guard'

interface VehicleTypeProps {
    id: String,
    description: String,
    autonomy: Number,
    costPerKilometer: Number,
    averageCost: Number,
    averageSpeed: Number,
    fuelType: String
}

export default class VehicleType extends AggregateRoot<VehicleTypeDTO>{
    private constructor(props: VehicleTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }
    get_id() {
        return this.props.id
    }
    get_description() {
        return this.props.description
    }
    get_autonomy() {
        return this.props.autonomy
    }
    get_costPerKilometer() {
        return this.props.costPerKilometer
    }
    get_averageCost() {
        return this.props.averageCost
    }
    get_averageSpeed() {
        return this.props.averageSpeed
    }
    get_fuelType() {
        return this.props.fuelType
    }

    public static create(props: VehicleTypeProps, id?: UniqueEntityID): Result<VehicleType> {
        let err_msg: String[] = [];

        // if (props.surrenderNode == true && props.collectionNode == false) {
        //     err_msg.push("A Surrender Node must always be a Collection Node.")
        //     return Result.fail<Node>(err_msg)
        // }

        // to do: validate fuel types

        const guardedProps = [
            { argument: props.description, argumentName: 'description' },
            { argument: props.costPerKilometer, argumentName: 'costPerKilometer' },
            { argument: props.averageSpeed, argumentName: 'averageSpeed' },
            { argument: props.autonomy, argumentName: 'autonomy' },
            { argument: props.averageCost, argumentName: 'averageCost' },
            { argument: props.fuelType, argumentName: 'fuelType' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<VehicleType>(guardResult.message)
        }

        const newDomainNode = new VehicleType(props, id)
        return Result.ok<VehicleType>(newDomainNode)
    }
}