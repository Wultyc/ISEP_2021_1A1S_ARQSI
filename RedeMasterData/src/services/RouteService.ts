import RouteDTO from '../dto/RouteDTO'
import RouteMapper from '../mappers/RouteMapper'
import Result from '../utils/Result'

export default class RouteService {

    dto: RouteDTO
    mapper: RouteMapper
    result!: Result

    constructor(routeDTO: RouteDTO = new RouteDTO(), routeMapper: RouteMapper = new RouteMapper()) {
        this.dto = routeDTO
        this.mapper = routeMapper
    }

}