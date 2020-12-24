import RouteDTO from '../dto/RouteDTO'
import RouteMapper from '../mappers/RouteMapper'
import RouteRepository from '../repository/RouteRepository'

export default class RouteService {

    dto: RouteDTO
    mapper: RouteMapper
    repository: RouteRepository

    constructor(routeDTO: RouteDTO = new RouteDTO(), routeMapper: RouteMapper = new RouteMapper(), routeRepository: RouteRepository = new RouteRepository) {
        this.dto = routeDTO
        this.mapper = routeMapper
        this.repository = routeRepository
    }

}