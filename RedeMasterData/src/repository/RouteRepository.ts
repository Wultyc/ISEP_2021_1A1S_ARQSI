import IRepository from './interface/IRepository'
import Route from '../models/mongo/Route'
import RouteDTO from '../dto/RouteDTO';
import { Result } from '../core/logic/Result';
import IDto from '../dto/interface/IDto';

export default class RouteRepository implements IRepository{
    save(dto: IDto): Promise<Result<IDto>> {
        throw new Error('Method not implemented.');
    }
    load(query: any, sort: any): Promise<Result<IDto>> {
        throw new Error('Method not implemented.');
    }
    loadById(id: string): Promise<Result<IDto>> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<Result<IDto>> {
        throw new Error('Method not implemented.');
    }

}