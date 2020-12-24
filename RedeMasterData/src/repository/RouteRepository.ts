import IRepository from './interface/IRepository'
import Route from '../models/mongo/Route'
import RouteDTO from '../dto/RouteDTO';

export default class RouteRepository implements IRepository{
    save(dto: RouteDTO, callback: any): void {
        throw new Error('Method not implemented.');
    }
    load(query: any, sort: any, callback: any): void {
        throw new Error('Method not implemented.');
    }
    loadById(id: string, callback: any): void {
        throw new Error('Method not implemented.');
    }
    delete(id: string, callback: any): void {
        throw new Error('Method not implemented.');
    }



}