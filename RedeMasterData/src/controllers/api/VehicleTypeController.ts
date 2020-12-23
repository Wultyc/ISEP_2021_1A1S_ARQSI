import {Request, Response} from 'express'
import VehicleTypeDTO from '../../dto/VehicleTypeDTO'
import VehicleTypeMapper from '../../mappers/VehicleTypeMapper'
import {vehicleTypesValidationSchema} from '../../models/joi/VehicleType'
import VehicleTypeService from '../../services/VehicleTypeService'
import Result from '../../utils/Result'

export default class VehicleTypeController{

    dto!: VehicleTypeDTO
    mapper!: VehicleTypeMapper
    service!: VehicleTypeService
    result!: Result

    constructor(vehicleTypeService: VehicleTypeService = new VehicleTypeService){
        this.service = vehicleTypeService
    }
    vehicleTypeGetAll(req: Request, res: Response){}
    vehicleTypeCreate(req: Request, res: Response){}
    vehicleTypeGetById(req: Request, res: Response){}
    vehicleTypeDelete(req: Request, res: Response){}
}