import NodeDTO from '../dto/NodeDTO'
import NodeMapper from '../mappers/NodeMapper'
import NodeRepository from '../repository/NodeRepository'
import Result from '../utils/Result'
import * as queryfilter from '../utils/QueryFilter'

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

    getAll(query: any): Result{
        const sortString = queryfilter.sortString(query)
        const queryObject = queryfilter.queryCleaner(query);
        this.result = this.repository.load(queryObject,sortString)
        return this.result
    }

}