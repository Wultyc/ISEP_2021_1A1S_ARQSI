import IRepository from './interface/IRepository'
import Line from '../models/mongo/Line'
import LineDTO from '../dto/LineDTO'
import { Result } from '../core/logic/Result'

export default class LineRepository implements IRepository{
    async save(dto: LineDTO): Promise<Result<LineDTO>> {
        let mongoError: any = ""
        const newLine = new Line(dto);
        const repositoryResult = await newLine.save().catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }
    async update(id:string, dto: LineDTO): Promise<Result<LineDTO>> {
        let mongoError: any = ""
        const repositoryResult = await Line.findByIdAndUpdate({ "_id": id },dto).catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }

    async load(query: any, sort: any): Promise<Result<LineDTO>> {
        let mongoError: any = ""
        const repositoryResult = await Line.find(query).sort(sort)
        .populate({
            path: 'lineRoutes',
            populate: [
                {
                    path: 'routeId',
                    populate: [
                        {
                            path: 'routeNodes',
                            populate: [
                                {
                                    path: 'nodeId'
                                }
                            ]
                        }
                    ]
                }
            ],
        }).populate('beginNode').populate('finalNode')
        .catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }

    async loadById(id: string): Promise<Result<LineDTO>> {
        let mongoError: any = ""
        const repositoryResult = await Line.findOne({ "_id": id })
        .populate({
            path: 'lineRoutes',
            populate: [
                {
                    path: 'routeId',
                    populate: [
                        {
                            path: 'routeNodes',
                            populate: [
                                {
                                    path: 'nodeId'
                                }
                            ]
                        }
                    ]
                }
            ],
        }).populate('beginNode').populate('finalNode')
        .catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }

    async delete(id: string): Promise<Result<LineDTO>> {
        let mongoError: any = ""
        const repositoryResult = await Line.findByIdAndRemove(id).catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }


}