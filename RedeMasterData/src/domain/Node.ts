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
        let err_msg: String [] = [];
        if(props.surrenderNode == true && props.collectionNode == false || !props.latitude || !props.longitude || !props.name || !props.shortName || !props.surrenderNode || props.tempoMaxParagem){
            if (props.surrenderNode == true && props.collectionNode == false) {
            err_msg.push("A Surrender Node must always be a Collection Node.")
            }
            if (!props.latitude) {
            err_msg.push("Insert a latitude")
            }
            if (!props.longitude) {
            err_msg.push("Insert a longitude")
            }  
            if (!props.name) {
            err_msg.push("Insert a name")
            }
            if (!props.shortName) {
            err_msg.push("Insert a shortName")
            }
           return Result.fail<Node>(err_msg)
        }    
        else {
        const newDomainNode = new Node(props, id)
        return Result.ok<Node>(newDomainNode)
        }
    }
}