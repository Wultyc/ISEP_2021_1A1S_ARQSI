import {Request, Response} from 'express'
import RouteDTO from '../../dto/RouteDTO'
import RouteMapper from '../../mappers/RouteMapper'
import {routesValidationSchema} from '../../models/joi/Routes'
import RouteService from '../../services/RouteService'
import Result from '../../utils/Result'

export default class RouteController{

    dto!: RouteDTO
    mapper!: RouteMapper
    service!: RouteService
    result!: Result

    constructor(routeService: RouteService = new RouteService){
        this.service = routeService
    }
    routeGetAll(req: Request, res: Response){}
    routeCreate(req: Request, res: Response){}
    routeGetById(req: Request, res: Response){}
    routeDelete(req: Request, res: Response){}
}