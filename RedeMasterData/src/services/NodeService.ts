import NodeDTO from '../dto/NodeDTO'
import NodeMapper from '../mappers/NodeMapper'
import Result from '../utils/Result'

export default class NodeService {

    dto: NodeDTO
    mapper: NodeMapper
    result!: Result

    constructor(nodeDTO: NodeDTO = new NodeDTO(), nodeMapper: NodeMapper = new NodeMapper()) {
        this.dto = nodeDTO
        this.mapper = nodeMapper
    }

}