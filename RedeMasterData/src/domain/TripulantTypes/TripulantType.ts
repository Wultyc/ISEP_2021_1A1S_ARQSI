import { AggregateRoot } from '../../core/domain/AggregateRoot'
import { UniqueEntityID } from '../../core/domain/UniqueEntityID'
import { Result } from '../../core/logic/Result'
import TripulantTypeDTO from '../../dto/TripulantTypeDTO'
import { Guard } from '../../core/logic/Guard'

interface TripulantTypeProps {
    description: String
}

export default class TripulantType extends AggregateRoot<TripulantTypeProps>{
    private constructor(props: TripulantTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get_id() {
        return this.id
    }
    get_description() {
        return this.props.description
    }


    public static create(props: TripulantTypeProps, id?: UniqueEntityID): Result<TripulantType> {

        const guardedProps = [
            { argument: props.description, argumentName: 'description' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<TripulantType>(guardResult.message)
        }

        const newDomainTripulantType = new TripulantType(props, id)
        return Result.ok<TripulantType>(newDomainTripulantType)
    }
}