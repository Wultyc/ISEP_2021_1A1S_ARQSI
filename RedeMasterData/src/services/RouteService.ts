import { Result } from '../core/logic/Result'
import Route from '../domain/Routes/Route'
import RouteDTO from '../dto/RouteDTO'
import RouteMapper from '../mappers/RouteMapper'
import RouteRepository from '../repository/RouteRepository'
import * as queryfilter from '../utils/QueryFilterX'

export default class RouteService {

    dto: RouteDTO
    mapper: RouteMapper
    repository: RouteRepository

    constructor(routeDTO: RouteDTO = new RouteDTO(), routeMapper: RouteMapper = new RouteMapper(), routeRepository: RouteRepository = new RouteRepository) {
        this.dto = routeDTO
        this.mapper = routeMapper
        this.repository = routeRepository
    }


    async getAll(query: any):Promise<Result<RouteDTO[]>> {
        const sortString = queryfilter.sortString(query)
        const queryObject = queryfilter.queryCleaner(query);
        return await this.repository.load(queryObject, sortString)
    }

    async getById(id: string):Promise<Result<RouteDTO>> {
        const repositoryResponse = await this.repository.loadById(id)
        if (repositoryResponse.isFailure){
            return repositoryResponse
        }
        this.dto = this.mapper.mapFromMongo(repositoryResponse.getValue(), new RouteDTO)
        return Result.ok<RouteDTO>(this.dto)        
    }

    async create(dto: RouteDTO):Promise<Result<RouteDTO>> {
        this.dto = dto

        const domainRoute = Route.create(this.dto)

        if (domainRoute.isFailure) {
            return Result.fail<RouteDTO>(Route.create(this.dto).errorValue());
        }

        this.dto = this.mapper.mapFromDomain(domainRoute.getValue(), new RouteDTO);
        const repositoryResponse = await this.repository.save(this.dto);

        if (repositoryResponse.isFailure){
            return repositoryResponse
        }

        this.dto = this.mapper.mapFromMongo(repositoryResponse.getValue(), new RouteDTO)

        return Result.ok<RouteDTO>(this.dto)
    }

    async delete(id: string):Promise<Result<RouteDTO>> {
        return await this.repository.delete(id)
    }
}