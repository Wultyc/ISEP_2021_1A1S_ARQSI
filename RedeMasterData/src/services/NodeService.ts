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

    getAll(query: any, callback){
        const sortString = queryfilter.sortString(query)
        const queryObject = queryfilter.queryCleaner(query);
        this.repository.load(queryObject,sortString, callback)
    }

    getById(id: string, callback){
        this.repository.loadById(id, callback)
    }

    create(dto: NodeDTO, callback){
        this.dto = dto
        let dtoResult: NodeDTO = new NodeDTO;
        if (Node.create(this.dto).isFailure){
        return Result.fail<NodeDTO>(Node.create(this.dto).errorValue());
        }
        else        
        this.repository.save(this.dto, callback);
        console.log(callback)     
        this.mapper.mapFromDomain(dtoResult, this.dto);        
        return Result.ok<NodeDTO>(dtoResult);
    }

    delete(id: string, callback){
        this.repository.delete(id, callback)
    }

}