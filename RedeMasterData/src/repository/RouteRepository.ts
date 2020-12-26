import IRepository from './interface/IRepository'
import Route from '../models/mongo/Route'
import RouteDTO from '../dto/RouteDTO';
import { Result } from '../core/logic/Result';

export default class RouteRepository implements IRepository{
    async save(dto: RouteDTO): Promise<Result<RouteDTO>> {
        let mongoError: any = ""
        const newRoute = new Route(dto);
        const repositoryResult = await newRoute.save().catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }

    async load(query: any, sort: any): Promise<Result<RouteDTO>> {
        let mongoError: any = ""
        const repositoryResult = await Route.find(query).sort(sort).catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }

    async loadById(id: string): Promise<Result<RouteDTO>> {
        let mongoError: any = ""
        const repositoryResult = await Route.findOne({ "_id": id }).catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }

    async delete(id: string): Promise<Result<RouteDTO>> {
        let mongoError: any = ""
        const repositoryResult = await Route.findByIdAndRemove(id).catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }


}