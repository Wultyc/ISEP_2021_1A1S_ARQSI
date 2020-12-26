import { Entity } from '../../core/domain/Entity'
import { UniqueEntityID } from '../../core/domain/UniqueEntityID'

interface RouteProps {
    nodeId: String,
    distance: number,
    duration: number
}

export default class RouteNodes extends Entity<RouteProps>{
    private constructor(props: RouteProps, id?: UniqueEntityID) {
        super(props, id);
    }
    
    get_id() {
        return this.props.nodeId
    }
    get_distance() {
        return this.props.distance
    }
    get_duration() {
        return this.props.duration
    }
}