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

    async nodeGetAll(req: Request, res: Response) {
        const isFailureOrSuccess: any = await this.service.getAll(req.query)
        if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    async nodeGetById(req: Request, res: Response) {
        const isFailureOrSuccess: any = await this.service.getById(req.params.nodeId)
        if (isFailureOrSuccess?.isFailure) {
            res.status(404).json("Node not found");
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    async nodeCreate(req: Request, res: Response) {
        this.dto = this.mapper.mapFromRequest(req, new NodeDTO)

        const { error } = nodesValidationSchema.validate(this.dto);
        if (error) return res.status(400).send({ message: "some fields are missing or have invalid values", error: error })

        const isFailureOrSuccess: any = await this.service.create(this.dto);

        if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    async nodeDelete(req: Request, res: Response) {
        const isFailureOrSuccess: any = await this.service.delete(req.params.nodeId)

        if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }
}