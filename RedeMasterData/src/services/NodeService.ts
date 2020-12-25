import { Result } from '../core/logic/Result'
import Node from '../domain/Node'
import NodeDTO from '../dto/NodeDTO'
import NodeMapper from '../mappers/NodeMapper'
import NodeRepository from '../repository/NodeRepository'
import * as queryfilter from '../utils/QueryFilterX'

export default class NodeService {

    dto: NodeDTO
    mapper: NodeMapper
    repository: NodeRepository

    constructor(nodeDTO: NodeDTO = new NodeDTO(), nodeMapper: NodeMapper = new NodeMapper(), nodeRepository: NodeRepository = new NodeRepository) {
        this.dto = nodeDTO
        this.mapper = nodeMapper
        this.repository = nodeRepository
    }

    async getAll(query: any):Promise<Result<NodeDTO>> {
        const sortString = queryfilter.sortString(query)
        const queryObject = queryfilter.queryCleaner(query);
        return await this.repository.load(queryObject, sortString)
    }

    async getById(id: string):Promise<Result<NodeDTO>> {
        return await this.repository.loadById(id)
    }

    async create(dto: NodeDTO):Promise<Result<NodeDTO>> {
        this.dto = dto

        const domainNode = Node.create(this.dto)

        if (domainNode.isFailure) {
            return Result.fail<NodeDTO>(Node.create(this.dto).errorValue());
        }

        this.dto = this.mapper.mapFromDomain(domainNode.getValue(), new NodeDTO);
        const repositoryResponse = await this.repository.save(this.dto);

        if (repositoryResponse.isFailure){
            return repositoryResponse
        }

        this.dto = this.mapper.mapFromMongo(repositoryResponse.getValue(), new NodeDTO)

        return Result.ok<NodeDTO>(this.dto)
    }

    async delete(id: string):Promise<Result<NodeDTO>> {
        return await this.repository.delete(id)
    }

}