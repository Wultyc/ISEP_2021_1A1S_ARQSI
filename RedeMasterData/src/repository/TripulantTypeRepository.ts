import IRepository from './interface/IRepository'
import TripulantType from '../models/mongo/TripulantType'
import TripulantTypeDTO from '../dto/TripulantTypeDTO'

export default class TripulantTypeRepository implements IRepository{
    save(dto: TripulantTypeDTO, callback: any): void {
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