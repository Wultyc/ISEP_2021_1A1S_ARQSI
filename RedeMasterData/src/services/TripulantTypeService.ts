import { Result } from '../core/logic/Result'
import TripulantType from '../domain/TripulantTypes/TripulantType'
import TripulantTypeDTO from '../dto/TripulantTypeDTO'
import TripulantTypeMapper from '../mappers/TripulantTypeMapper'
import TripulantTypeRepository from '../repository/TripulantTypeRepository'
import * as queryfilter from '../utils/QueryFilterX'

export default class TripulantTypeService {

    dto: TripulantTypeDTO
    mapper: TripulantTypeMapper
    repository: TripulantTypeRepository

    constructor(tripulantTypeDTO: TripulantTypeDTO = new TripulantTypeDTO(), tripulantTypeMapper: TripulantTypeMapper = new TripulantTypeMapper(), tripulantTypeRepository: TripulantTypeRepository = new TripulantTypeRepository()) {
        this.dto = tripulantTypeDTO
        this.mapper = tripulantTypeMapper
        this.repository = tripulantTypeRepository
    }

    async getAll(query: any):Promise<Result<TripulantTypeDTO>> {
        const sortString = queryfilter.sortString(query)
        const queryObject = queryfilter.queryCleaner(query);
        return await this.repository.load(queryObject, sortString)
    }

    async getById(id: string):Promise<Result<TripulantTypeDTO>> {
        console.log(id)
        const repositoryResponse = await this.repository.loadById(id)
        if (repositoryResponse.isFailure){
            return repositoryResponse
        }
        this.dto = this.mapper.mapFromMongo(repositoryResponse.getValue(), new TripulantTypeDTO)
        return await this.repository.loadById(id)
    }

    async create(dto: TripulantTypeDTO):Promise<Result<TripulantTypeDTO>> {
        this.dto = dto

        const domainNode = TripulantType.create(this.dto)

        if (domainNode.isFailure) {
            return Result.fail<TripulantTypeDTO>(TripulantType.create(this.dto).errorValue());
        }

        this.dto = this.mapper.mapFromDomain(domainNode.getValue(), new TripulantTypeDTO);
        const repositoryResponse = await this.repository.save(this.dto);

        if (repositoryResponse.isFailure){
            return repositoryResponse
        }

        this.dto = this.mapper.mapFromMongo(repositoryResponse.getValue(), new TripulantTypeDTO)

        return Result.ok<TripulantTypeDTO>(this.dto)
    }

    async delete(id: string):Promise<Result<TripulantTypeDTO>> {
        return await this.repository.delete(id)
    }

}