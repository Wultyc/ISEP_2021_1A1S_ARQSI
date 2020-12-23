import {Request, Response} from 'express'
import TripulantTypeDTO from '../../dto/TripulantTypeDTO'
import TripulantTypeMapper from '../../mappers/TripulantTypeMapper'
import {tripulantTypesValidationSchema} from '../../models/joi/TripulantType'
import TripulantTypeService from '../../services/TripulantTypeService'
import Result from '../../utils/Result'

export default class TripulantTypeController{

    dto!: TripulantTypeDTO
    mapper!: TripulantTypeMapper
    service!: TripulantTypeService
    result!: Result

    constructor(tripulantTypeService: TripulantTypeService = new TripulantTypeService){
        this.service = tripulantTypeService
    }
    tripulantTypeGetAll(req: Request, res: Response){}
    tripulantTypeCreate(req: Request, res: Response){}
    tripulantTypeGetById(req: Request, res: Response){}
    tripulantTypeDelete(req: Request, res: Response){}
}