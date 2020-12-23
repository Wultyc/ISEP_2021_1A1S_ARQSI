import IService from './interface/IService'
import RouteDTO from '../dto/RouteDTO'
import RouteMapper from '../mappers/RouteMapper'

export class RouteService implements IService {
    runService(): boolean | Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}