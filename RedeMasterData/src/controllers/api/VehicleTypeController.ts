import {Request, Response} from 'express'
import VehicleTypeDTO from '../../dto/VehicleTypeDTO'
import VehicleTypeMapper from '../../mappers/VehicleTypeMapper'
import {vehicleTypesValidationSchema} from '../../models/joi/VehicleType'
import VehicleTypeService from '../../services/VehicleTypeService'

export default class VehicleTypeController{

    dto!: VehicleTypeDTO
    mapper!: VehicleTypeMapper
    service!: VehicleTypeService

    constructor(vehicleTypeService: VehicleTypeService = new VehicleTypeService,  vehicleTypeMapper: VehicleTypeMapper = new VehicleTypeMapper()){
        this.service = vehicleTypeService
        this.mapper = vehicleTypeMapper
    }
    async vehicleTypeGetAll(req: Request, res: Response) {
        const isFailureOrSuccess: any = await this.service.getAll(req.query)
        if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    async vehicleTypeGetById(req: Request, res: Response) {
        const isFailureOrSuccess: any = await this.service.getById(req.params.vehicleTypeId)
        if (isFailureOrSuccess?.isFailure) {
            res.status(404).json("Vehicle Type not found");
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    async vehicleTypeCreate(req: Request, res: Response) {
        this.dto = this.mapper.mapFromRequest(req, new VehicleTypeDTO)

        const { error } = vehicleTypesValidationSchema.validate(this.dto);
        if (error) return res.status(400).send({ message: "some fields are missing or have invalid values", error: error })

        const isFailureOrSuccess: any = await this.service.create(this.dto);

        if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    async vehicleTypeDelete(req: Request, res: Response) {
        const isFailureOrSuccess: any = await this.service.delete(req.params.vehicleTypeId)

        if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }
}