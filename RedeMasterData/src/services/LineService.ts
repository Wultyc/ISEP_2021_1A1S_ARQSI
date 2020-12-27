import { Result } from '../core/logic/Result'
import Line from '../domain/Lines/Lines'
import LineDTO from '../dto/LineDTO'
import LinePatchDTO from '../dto/LinePatchDTO'
import RouteDTO from '../dto/RouteDTO'
import LineMapper from '../mappers/LineMapper'
import LineRepository from '../repository/LineRepository'
import * as queryfilter from '../utils/QueryFilterX'
import RouteService from './RouteService'

export default class LineService {

    dto: LineDTO | LinePatchDTO
    mapper: LineMapper
    repository: LineRepository

    constructor(lineDTO: LineDTO = new LineDTO(), lineMapper: LineMapper = new LineMapper(), lineRepository: LineRepository = new LineRepository) {
        this.dto = lineDTO
        this.mapper = lineMapper
        this.repository = lineRepository
    }

    async getAll(query: any):Promise<Result<LineDTO>> {
        const sortString = queryfilter.sortString(query)
        const queryObject = queryfilter.queryCleaner(query);
        return await this.repository.load(queryObject, sortString)
    }

    async getById(id: string):Promise<Result<LineDTO>> {
        const repositoryResponse = await this.repository.loadById(id)
        if (repositoryResponse.isFailure){
            return repositoryResponse
        }
        this.dto = this.mapper.mapFromMongo(repositoryResponse.getValue(), new LineDTO)
        return Result.ok<LineDTO>(this.dto)        
    }

    async create(dto: LineDTO):Promise<Result<LineDTO>> {
        this.dto = dto

        const routesResult:Result<RouteDTO[]> = await new RouteService().getAll({}) 
        const domainLine = Line.create(this.dto,routesResult)

        if (domainLine.isFailure) {
            return Result.fail<LineDTO>(domainLine.errorValue());
        }

        this.dto = this.mapper.mapFromDomain(domainLine.getValue(), new LineDTO);
        const repositoryResponse = await this.repository.save(this.dto);

        if (repositoryResponse.isFailure){
            return repositoryResponse
        }

        this.dto = this.mapper.mapFromMongo(repositoryResponse.getValue(), new LineDTO)

        return Result.ok<LineDTO>(this.dto)
    }

    async patch(lineId:string, dto: LinePatchDTO):Promise<Result<LineDTO>> {
        this.dto = dto

        const routesResult:Result<RouteDTO[]> = await new RouteService().getAll({}) 
        const lineResult:Result<LineDTO> = await this.getById(lineId)

        const domainLine = Line.update(lineResult,dto,routesResult)

        if (domainLine.isFailure) {
            return Result.fail<LineDTO>(domainLine.errorValue());
        }

        this.dto = this.mapper.mapFromDomain(domainLine.getValue(), new LineDTO);
        const repositoryResponse = await this.repository.update(lineId, this.dto);

        if (repositoryResponse.isFailure){
            return repositoryResponse
        }

        this.dto = this.mapper.mapFromMongo(repositoryResponse.getValue(), new LineDTO)

        return Result.ok<LineDTO>(this.dto)
    }

    async delete(id: string):Promise<Result<LineDTO>> {
        return await this.repository.delete(id)
    }
}