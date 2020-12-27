import {Request, Response} from 'express'
import LineDTO from '../../dto/LineDTO'
import LinePatchDTO from '../../dto/LinePatchDTO'
import LineMapper from '../../mappers/LineMapper'
import {LinesValidationSchema} from '../../models/joi/Lines'
import {LinePatchValidationSchema} from '../../models/joi/LinePatch'
import LineService from '../../services/LineService'
export default class LineController{

    dto!: LineDTO | LinePatchDTO
    mapper!: LineMapper
    service!: LineService

    constructor(lineService: LineService = new LineService, lineMapper: LineMapper = new LineMapper){
        this.service = lineService
        this.mapper = lineMapper
    }

    async lineGetAll(req: Request, res: Response) {
        const isFailureOrSuccess: any = await this.service.getAll(req.query)
        if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    async lineGetById(req: Request, res: Response) {
        const isFailureOrSuccess: any = await this.service.getById(req.params.lineId)
        if (isFailureOrSuccess?.isFailure) {
            res.status(404).json("Line not found");
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    async lineCreate(req: Request, res: Response) {
        this.dto = this.mapper.mapFromRequest(req, new LineDTO)

        const { error } = LinesValidationSchema.validate(this.dto);
        if (error) return res.status(400).send({ message: "some fields are missing or have invalid values", error: error })

        const isFailureOrSuccess: any = await this.service.create(this.dto);

        if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    async lineDelete(req: Request, res: Response) {
        const isFailureOrSuccess: any = await this.service.delete(req.params.lineId)

        if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }
    async linePatch(req: Request, res: Response){
        this.dto = this.mapper.mapFromPatchRequest(req, new LinePatchDTO)

        const { error } = LinePatchValidationSchema.validate(this.dto);
        if (error) return res.status(400).send({ message: "some fields are missing or have invalid values", error: error })

        const isFailureOrSuccess: any = await this.service.patch(req.params.lineId,this.dto);

        if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }
}