import { ValueObject } from '../../core/domain/ValueObject';

interface props {
    value: string
}
export class VehicleTypeId extends ValueObject<props>{
    get_value(): string {
        return this.props.value;
    }

    constructor(props: props) {
        super(props);
    }
}