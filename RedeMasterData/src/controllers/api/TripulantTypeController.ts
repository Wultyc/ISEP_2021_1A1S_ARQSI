import {Request, Response} from 'express'
import TripulantTypeDTO from '../../dto/TripulantTypeDTO'
import TripulantTypeMapper from '../../mappers/TripulantTypeMapper'
import {tripulantTypesValidationSchema} from '../../models/joi/TripulantType'
import TripulantTypeService from '../../services/TripulantTypeService'

export default class TripulantTypeController{

    tripulantTypeDTO: TripulantTypeDTO
    tripulantTypeMapper: TripulantTypeMapper
    tripulantTypeService: TripulantTypeService

    constructor(tripulantTypeDTO: TripulantTypeDTO = new TripulantTypeDTO, tripulantTypeMapper: TripulantTypeMapper = new TripulantTypeMapper, tripulantTypeService: TripulantTypeService = new TripulantTypeService){
        this.tripulantTypeDTO = tripulantTypeDTO
        this.tripulantTypeMapper = tripulantTypeMapper
        this.tripulantTypeService = tripulantTypeService
    }
    tripulantTypeGetAll(req: Request, res: Response){}
    tripulantTypeCreate(req: Request, res: Response){}
    tripulantTypeGetById(req: Request, res: Response){}
    tripulantTypeDelete(req: Request, res: Response){}
}