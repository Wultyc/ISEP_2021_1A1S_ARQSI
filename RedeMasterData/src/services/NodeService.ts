import IService from './interface/IService'
import NodeDTO from '../dto/NodeDTO'
import NodeMapper from '../mappers/NodeMapper'

export class NodeService implements IService {

    nodeDTO: NodeDTO
    nodeMapper: NodeMapper

    constructor(nodeDTO:NodeDTO = new NodeDTO(), nodeMapper:NodeMapper = new NodeMapper()){
        this.nodeDTO = nodeDTO
        this.nodeMapper = nodeMapper
    }

    runService(): boolean | Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}