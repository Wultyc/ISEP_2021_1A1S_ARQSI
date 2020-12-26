import IRepository from './interface/IRepository'
import VehicleType from '../models/mongo/VehicleType'
import VehicleTypeDTO from '../dto/VehicleTypeDTO'
import { Result } from '../core/logic/Result'
import IDto from '../dto/interface/IDto'

export default class VehicleTypeRepository implements IRepository{
    async save(dto: VehicleTypeDTO): Promise<Result<VehicleTypeDTO>> {
        let mongoError: any = ""
        const newNode = new VehicleType(dto);
        const repositoryResult = await newNode.save().catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }

    async load(query: any, sort: any): Promise<Result<VehicleTypeDTO>> {
        let mongoError: any = ""
        const repositoryResult = await VehicleType.find(query).sort(sort).catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }
   
    async loadById(id: string): Promise<Result<VehicleTypeDTO>> {
        let mongoError: any = ""
        const repositoryResult = await VehicleType.findOne({ "_id": id }).catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }
    async delete(id: string): Promise<Result<VehicleTypeDTO>> {
        let mongoError: any = ""
        const repositoryResult = await VehicleType.findByIdAndRemove(id).catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }

}