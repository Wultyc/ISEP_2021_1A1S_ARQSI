import IRepository from './interface/IRepository'
import Line from '../models/mongo/Line'
import LineDTO from '../dto/LineDTO'

export default class LineRepository implements IRepository{
    save(dto: LineDTO, callback: any): void {
        throw new Error('Method not implemented.')
    }
    load(query: any, sort: any, callback: any): void {
        throw new Error('Method not implemented.')
    }
    loadById(id: string, callback: any): void {
        throw new Error('Method not implemented.')
    }
    delete(id: string, callback: any): void {
        throw new Error('Method not implemented.')
    }



}