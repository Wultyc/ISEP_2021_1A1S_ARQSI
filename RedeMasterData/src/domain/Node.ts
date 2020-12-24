import { AggregateRoot } from '../core/domain/AggregateRoot'
import { UniqueEntityID } from '../core/domain/UniqueEntityID'
import {Result} from '../core/logic/Result'
import Latitute from './Latitute'
import Longitude from './Longitude'
import TempoMaxParagem from './TempoMaxParagem'
import NodeDTO from '../dto/NodeDTO'

interface NodeProps {
    id: String,
    name: String,
    shortName: String,
    latitude: String,
    longitude: String,
    tempoMaxParagem: String,
    collectionNode: boolean,
    surrenderNode: boolean
}

export default class Node extends AggregateRoot<NodeDTO>{
    private constructor(props: NodeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get_id(){
        return this.props.id
    }
    get_name(){
        return this.props.name
    }
    get_shortName(){
        return this.props.shortName
    }
    get_latitude(){
        return this.props.latitude
    }
    get_longitude(){
        return this.props.longitude
    }
    get_tempoMaxParagem(){
        return this.props.tempoMaxParagem
    }
    get_collectionNode(){
        return this.props.collectionNode
    }
    get_surrenderNode(){
        return this.props.surrenderNode
    }


    public static create(props: NodeProps, id?: UniqueEntityID):Result<Node> {


        if(props.surrenderNode == true && props.collectionNode == false){
            return Result.fail<Node>("A Surrender Node must always be a Collection Node.", props)
        }

        const newDomainNode = new Node(props, id)
        return Result.ok<Node>(newDomainNode)
    }
}