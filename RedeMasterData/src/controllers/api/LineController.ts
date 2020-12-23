import {Request, Response} from 'express'
import LineDTO from '../../dto/LineDTO'
import LineMapper from '../../mappers/LineMapper'
import {LinesValidationSchema} from '../../models/joi/Lines'
import LineService from '../../services/LineService'
export default class LineController{

    lineDTO: LineDTO
    lineMapper: LineMapper
    lineService: LineService

    constructor(lineDTO: LineDTO = new LineDTO, lineMapper: LineMapper = new LineMapper, lineService: LineService = new LineService){
        this.lineDTO = lineDTO
        this.lineMapper = lineMapper
        this.lineService = lineService
    }

    lineGetByFilter(req: Request, res: Response){}
    lineCreate(req: Request, res: Response){}
    lineGetById(req: Request, res: Response){}
    lineUpdate(req: Request, res: Response){}
    lineDelete(req: Request, res: Response){}
    lineGetRoutesById(req: Request, res: Response){}
}