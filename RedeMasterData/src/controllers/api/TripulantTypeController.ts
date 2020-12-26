import {Request, Response} from 'express'
import TripulantTypeDTO from '../../dto/TripulantTypeDTO'
import TripulantTypeMapper from '../../mappers/TripulantTypeMapper'
import {tripulantTypesValidationSchema} from '../../models/joi/TripulantType'
import TripulantTypeService from '../../services/TripulantTypeService'

export default class TripulantTypeController{

    dto!: TripulantTypeDTO
    mapper!: TripulantTypeMapper
    service: TripulantTypeService

    constructor(tripulantTypeService: TripulantTypeService = new TripulantTypeService,  tripulantTypeMapper: TripulantTypeMapper = new TripulantTypeMapper()){
        this.service = tripulantTypeService
        this.mapper = tripulantTypeMapper
    }
    async tripulantTypeGetAll(req: Request, res: Response) {
        const isFailureOrSuccess: any = await this.service.getAll(req.query)
        if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    async tripulantTypeGetById(req: Request, res: Response) {
        const isFailureOrSuccess: any = await this.service.getById(req.params.tripulantTypeId)
        if (isFailureOrSuccess?.isFailure) {
            res.status(404).json("Tripulant Type not found");
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    async tripulantTypeCreate(req: Request, res: Response) {
        this.dto = this.mapper.mapFromRequest(req, new TripulantTypeDTO)

        const { error } = tripulantTypesValidationSchema.validate(this.dto);
        if (error) return res.status(400).send({ message: "some fields are missing or have invalid values", error: error })

        const isFailureOrSuccess: any = await this.service.create(this.dto);

        if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    async tripulantTypeDelete(req: Request, res: Response) {
        const isFailureOrSuccess: any = await this.service.delete(req.params.nodeId)

        if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }
}