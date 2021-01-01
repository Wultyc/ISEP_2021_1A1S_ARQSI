import {ValueObject} from '../../core/domain/ValueObject'

interface props {
    value: string
}

export default class TempoMaxParagem extends ValueObject<props>{
    get_value(): string {
        return this.props.value;
    }

    private constructor(props: props) {
        super(props);
    }
}