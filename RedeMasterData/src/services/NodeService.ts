import NodeDTO from '../dto/NodeDTO'
import NodeMapper from '../mappers/NodeMapper'
import NodeRepository from '../repository/NodeRepository'
import Result from '../utils/Result'

export default class NodeService {

    dto: NodeDTO
    mapper: NodeMapper
    repository: NodeRepository
    result!: Result

    constructor(nodeDTO: NodeDTO = new NodeDTO(), nodeMapper: NodeMapper = new NodeMapper(), nodeRepository: NodeRepository = new NodeRepository) {
        this.dto = nodeDTO
        this.mapper = nodeMapper
        this.repository = nodeRepository
    }

}