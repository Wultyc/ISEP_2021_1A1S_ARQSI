import IService from './interface/IService'
import RouteDTO from '../dto/RouteDTO'
import RouteMapper from '../mappers/RouteMapper'

export class RouteService implements IService {

    routeDTO: RouteDTO
    routeMapper: RouteMapper

    constructor(routeDTO:RouteDTO = new RouteDTO(), routeMapper:RouteMapper = new RouteMapper()){
        this.routeDTO = routeDTO
        this.routeMapper = routeMapper
    }

    runService(): boolean | Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}