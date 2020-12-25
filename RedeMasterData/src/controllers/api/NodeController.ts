import {Request, Response} from 'express'
import { Result } from '../../core/logic/Result'
import NodeDTO from '../../dto/NodeDTO'
import NodeMapper from '../../mappers/NodeMapper'
import {nodesValidationSchema} from '../../models/joi/Nodes'
import NodeService from '../../services/NodeService'

export default class NodeController{

    dto!: NodeDTO
    mapper!: NodeMapper
    service: NodeService

    constructor(nodeService: NodeService = new NodeService(), nodeMapper: NodeMapper = new NodeMapper()){
        this.service = nodeService
        this.mapper = nodeMapper
    }

    nodeGetAll(req: Request, res: Response){
        this.service.getAll(req.query, function (err, data){
            if(err){
                res.status(503).send(err)
            }
            res.send(data)
        })
    }

    nodeGetById(req: Request, res: Response){
        this.service.getById(req.params.nodeId, function (err, data){
            if(err){
                res.status(503).send(err)
            }
            res.send(data)
        })
    }

    nodeCreate(req: Request, res: Response){
        this.dto = this.mapper.mapFromRequest(req, new NodeDTO)
        const qualquer: Result<NodeDTO> | undefined = this.service.create(this.dto, function (err, data){});
        if (qualquer?.isFailure){
            res.status(400).json(qualquer?.errorValue());
            }
        else if(qualquer?.isSuccess) {
                res.json(qualquer.getValue());
        };    
    }

    nodeDelete(req: Request, res: Response){
        this.service.delete(req.params.nodeId, function (err, data){
            if(err){
                res.status(503).send(err)
            }
            res.send('ok')
        })
    }
}