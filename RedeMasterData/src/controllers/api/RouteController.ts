import {Request, Response} from 'express'
import RouteDTO from '../../dto/RouteDTO'
import RouteMapper from '../../mappers/RouteMapper'
import {routesValidationSchema} from '../../models/joi/Routes'
import RouteService from '../../services/RouteService'

export default class RouteController{

    dto!: RouteDTO
    mapper!: RouteMapper
    service!: RouteService

    constructor(routeService: RouteService = new RouteService, routeMapper: RouteMapper = new RouteMapper){
        this.service = routeService
        this.mapper = routeMapper
    }
    async routeGetAll(req: Request, res: Response) {
        const isFailureOrSuccess: any = await this.service.getAll(req.query)
        if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    async routeGetById(req: Request, res: Response) {
        const isFailureOrSuccess: any = await this.service.getById(req.params.routeId)
        if (isFailureOrSuccess?.isFailure) {
            res.status(404).json("Route not found");
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    async routeCreate(req: Request, res: Response) {
        this.dto = this.mapper.mapFromRequest(req, new RouteDTO)

        const { error } = routesValidationSchema.validate(this.dto);
        if (error) return res.status(400).send({ message: "some fields are missing or have invalid values", error: error })

        const isFailureOrSuccess: any = await this.service.create(this.dto);

        if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }

    async routeDelete(req: Request, res: Response) {
        const isFailureOrSuccess: any = await this.service.delete(req.params.routeId)

        if (isFailureOrSuccess?.isFailure) {
            res.status(400).json(isFailureOrSuccess?.errorValue());
        }
        else {
            res.json(isFailureOrSuccess.getValue());
        }
    }
}