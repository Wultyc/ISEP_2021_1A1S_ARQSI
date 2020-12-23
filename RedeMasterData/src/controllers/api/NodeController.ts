import {Request, Response} from 'express'
import NodeDTO from '../../dto/NodeDTO'
import NodeMapper from '../../mappers/NodeMapper'
import {nodesValidationSchema} from '../../models/joi/Nodes'
import NodeService from '../../services/NodeService'
import Result from '../../utils/Result'

export default class NodeController{

    dto!: NodeDTO
    mapper!: NodeMapper
    service!: NodeService
    result!: Result

    constructor(nodeService: NodeService = new NodeService){
        this.service = nodeService
    }
    nodeGetAll(req: Request, res: Response){}
    nodeGetById(req: Request, res: Response){}
    nodeCreate(req: Request, res: Response){}
    nodeDelete(req: Request, res: Response){}
}