import { Request, Response } from 'express'
import { Result } from '../../core/logic/Result'
import NodeDTO from '../../dto/NodeDTO'
import NodeMapper from '../../mappers/NodeMapper'
import { nodesValidationSchema } from '../../models/joi/Nodes'
import NodeService from '../../services/NodeService'

export default class NodeController {

    dto!: NodeDTO
    mapper!: NodeMapper
    service: NodeService

    constructor(nodeService: NodeService = new NodeService(), nodeMapper: NodeMapper = new NodeMapper()) {
        this.service = nodeService
        this.mapper = nodeMapper
    }

    nodeGetAll(req: Request, res: Response) {
        const isFailureOrSuccess: any = this.service.getAll(req.query)
        if (isFailureOrSuccess?.isFailure && isFailureOrSuccess?.errorValue().mongoError) {
            res.status(400).json("error saving");
        }
        else if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    nodeGetById(req: Request, res: Response) {
        const isFailureOrSuccess: any = this.service.getById(req.params.nodeId)
        if (isFailureOrSuccess?.isFailure && isFailureOrSuccess?.errorValue().mongoError) {
            res.status(400).json("error saving");
        }
        else if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    async nodeCreate(req: Request, res: Response) {
        this.dto = this.mapper.mapFromRequest(req, new NodeDTO)

        const isFailureOrSuccess: any = await this.service.create(this.dto);

        if (isFailureOrSuccess?.isFailure && isFailureOrSuccess?.errorValue().mongoError) {
            res.status(400).json("error saving");
        }
        else if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    nodeDelete(req: Request, res: Response) {
        const isFailureOrSuccess: any = this.service.delete(req.params.nodeId)
        
        if (isFailureOrSuccess?.isFailure && isFailureOrSuccess?.errorValue().mongoError) {
            res.status(400).json("error saving");
        }
        else if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }
}