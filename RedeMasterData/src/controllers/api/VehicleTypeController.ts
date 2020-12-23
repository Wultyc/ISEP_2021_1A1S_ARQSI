import {Request, Response} from 'express'
import VehicleTypeDTO from '../../dto/VehicleTypeDTO'
import VehicleTypeMapper from '../../mappers/VehicleTypeMapper'
import {vehicleTypesValidationSchema} from '../../models/joi/VehicleType'
import VehicleTypeService from '../../services/VehicleTypeService'

export default class VehicleTypeController{

    vehicleTypeDTO: VehicleTypeDTO
    vehicleTypeMapper: VehicleTypeMapper
    vehicleTypeService: VehicleTypeService

    constructor(vehicleTypeDTO: VehicleTypeDTO = new VehicleTypeDTO, vehicleTypeMapper: VehicleTypeMapper = new VehicleTypeMapper, vehicleTypeService: VehicleTypeService = new VehicleTypeService){
        this.vehicleTypeDTO = vehicleTypeDTO
        this.vehicleTypeMapper = vehicleTypeMapper
        this.vehicleTypeService = vehicleTypeService
    }
    vehicleTypeGetAll(req: Request, res: Response){}
    vehicleTypeCreate(req: Request, res: Response){}
    vehicleTypeGetById(req: Request, res: Response){}
    vehicleTypeDelete(req: Request, res: Response){}
}