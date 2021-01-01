import { Entity } from '../../core/domain/Entity'
import { UniqueEntityID } from '../../core/domain/UniqueEntityID'
import { RouteId } from '../Routes/RouteId';

interface LinePathsProps {
    routeId: RouteId,
    orientation: string
}

export default class RouteNodes extends Entity<LinePathsProps>{
    private constructor(props: LinePathsProps) {
        super(props);
    }
    
    get_id() {
        return this.props.routeId
    }
    get_orientation() {
        return this.props.orientation
    }

}