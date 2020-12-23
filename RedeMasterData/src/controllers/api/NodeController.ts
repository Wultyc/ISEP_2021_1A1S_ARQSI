import {Request, Response} from 'express'
import NodeDTO from '../../dto/NodeDTO'
import NodeMapper from '../../mappers/NodeMapper'
import {nodesValidationSchema} from '../../models/joi/Nodes'
import NodeService from '../../services/NodeService'

export default class NodeController{

    nodeDTO: NodeDTO
    nodeMapper: NodeMapper
    nodeService: NodeService

    constructor(nodeDTO: NodeDTO = new NodeDTO, nodeMapper: NodeMapper = new NodeMapper, nodeService: NodeService = new NodeService){
        this.nodeDTO = nodeDTO
        this.nodeMapper = nodeMapper
        this.nodeService = nodeService
    }
    nodeGetAll(req: Request, res: Response){}
    nodeGetById(req: Request, res: Response){}
    nodeCreate(req: Request, res: Response){}
    nodeDelete(req: Request, res: Response){}
}