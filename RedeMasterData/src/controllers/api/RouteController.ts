import {Request, Response} from 'express'
import RouteDTO from '../../dto/RouteDTO'
import RouteMapper from '../../mappers/RouteMapper'
import {routesValidationSchema} from '../../models/joi/Routes'
import RouteService from '../../services/RouteService'

export default class RouteController{

    routeDTO: RouteDTO
    routeMapper: RouteMapper
    routeService: RouteService

    constructor(routeDTO: RouteDTO = new RouteDTO, routeMapper: RouteMapper = new RouteMapper, routeService: RouteService = new RouteService){
        this.routeDTO = routeDTO
        this.routeMapper = routeMapper
        this.routeService = routeService
    }
    routeGetAll(req: Request, res: Response){}
    routeCreate(req: Request, res: Response){}
    routeGetById(req: Request, res: Response){}
    routeDelete(req: Request, res: Response){}
}