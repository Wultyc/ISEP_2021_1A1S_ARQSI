import IRepository from './interface/IRepository'
import TripulantType from '../models/mongo/TripulantType'
import TripulantTypeDTO from '../dto/TripulantTypeDTO'
import { Result } from '../core/logic/Result'
import IDto from '../dto/interface/IDto'

export default class TripulantTypeRepository implements IRepository{
    async save(dto: TripulantTypeDTO): Promise<Result<TripulantTypeDTO>> {
        let mongoError: any = ""
        const newTripulantType = new TripulantType(dto);
        const repositoryResult = await newTripulantType.save().catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }
    async load(query: any, sort: any): Promise<Result<TripulantTypeDTO>> {
        let mongoError: any = ""
        const repositoryResult = await TripulantType.find(query).sort(sort).catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)    
    }

    async loadById(id: String): Promise<Result<TripulantTypeDTO>> {
        let mongoError: any = ""
        const repositoryResult = await TripulantType.findOne({ "_id": id }).catch((error) => {
            mongoError = error
        });
        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message});
        }
        return Result.ok<any>(repositoryResult);
    }
    async delete(id: String): Promise<Result<TripulantTypeDTO>> {
        let mongoError: any = ""
        const repositoryResult = await TripulantType.findByIdAndRemove(id).catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }
        return Result.ok<any>(repositoryResult)
    }
}