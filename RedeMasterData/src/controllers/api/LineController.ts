import {Request, Response} from 'express'
import LineDTO from '../../dto/LineDTO'
import LineMapper from '../../mappers/LineMapper'
import {LinesValidationSchema} from '../../models/joi/Lines'
import LineService from '../../services/LineService'
export default class LineController{

    dto!: LineDTO
    mapper!: LineMapper
    service!: LineService

    constructor(lineService: LineService = new LineService){
        this.service = lineService
    }

    lineGetByFilter(req: Request, res: Response){}
    lineCreate(req: Request, res: Response){}
    lineGetById(req: Request, res: Response){}
    lineUpdate(req: Request, res: Response){}
    lineDelete(req: Request, res: Response){}
    lineGetRoutesById(req: Request, res: Response){}
}