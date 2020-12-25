import IRepository from './interface/IRepository'
import Line from '../models/mongo/Line'
import LineDTO from '../dto/LineDTO'
import { Result } from '../core/logic/Result'
import IDto from '../dto/interface/IDto'

export default class LineRepository implements IRepository{
    save(dto: IDto, callback: any): Promise<Result<IDto>> {
        throw new Error('Method not implemented.')
    }
    load(query: any, sort: any, callback: any): Promise<Result<IDto>> {
        throw new Error('Method not implemented.')
    }
    loadById(id: string, callback: any): Promise<Result<IDto>> {
        throw new Error('Method not implemented.')
    }
    delete(id: string, callback: any): Promise<Result<IDto>> {
        throw new Error('Method not implemented.')
    }

}