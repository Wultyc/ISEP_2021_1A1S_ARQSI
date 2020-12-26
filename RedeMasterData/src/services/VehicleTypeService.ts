import { Result } from '../core/logic/Result'
import VehicleType from '../domain/VehicleType/VehicleType'
import VehicleTypeDTO from '../dto/VehicleTypeDTO'
import VehicleTypeMapper from '../mappers/VehicleTypeMapper'
import VehicleTypeRepository from '../repository/VehicleTypeRepository'
import * as queryfilter from '../utils/QueryFilterX'


export default class VehicleTypeService {

    dto: VehicleTypeDTO
    mapper: VehicleTypeMapper
    repository: VehicleTypeRepository

    constructor(vehicleTypeDTO: VehicleTypeDTO = new VehicleTypeDTO(), vehicleTypeMapper: VehicleTypeMapper = new VehicleTypeMapper(), vehicleTypeRepository: VehicleTypeRepository = new VehicleTypeRepository()) {
        this.dto = vehicleTypeDTO
        this.mapper = vehicleTypeMapper
        this.repository = vehicleTypeRepository
    }
    async getAll(query: any):Promise<Result<VehicleTypeDTO>> {
        const sortString = queryfilter.sortString(query)
        const queryObject = queryfilter.queryCleaner(query);
        return await this.repository.load(queryObject, sortString)
    }

    async getById(id: string):Promise<Result<VehicleTypeDTO>> {
        const repositoryResponse = await this.repository.loadById(id)
        if (repositoryResponse.isFailure){
            return repositoryResponse
        }
        this.dto = this.mapper.mapFromMongo(repositoryResponse.getValue(), new VehicleTypeDTO)
        return Result.ok<VehicleTypeDTO>(this.dto)        
    }

    async create(dto: VehicleTypeDTO):Promise<Result<VehicleTypeDTO>> {
        this.dto = dto

        const domainNode = VehicleType.create(this.dto)

        if (domainNode.isFailure) {
            return Result.fail<VehicleTypeDTO>(VehicleType.create(this.dto).errorValue());
        }

        this.dto = this.mapper.mapFromDomain(domainNode.getValue(), new VehicleTypeDTO);
        const repositoryResponse = await this.repository.save(this.dto);

        if (repositoryResponse.isFailure){
            return repositoryResponse
        }

        this.dto = this.mapper.mapFromMongo(repositoryResponse.getValue(), new VehicleTypeDTO)

        return Result.ok<VehicleTypeDTO>(this.dto)
    }

    async delete(id: string):Promise<Result<VehicleTypeDTO>> {
        return await this.repository.delete(id)
    }

}