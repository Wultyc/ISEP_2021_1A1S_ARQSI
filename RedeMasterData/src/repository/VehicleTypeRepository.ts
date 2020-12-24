import IRepository from './interface/IRepository'
import VehicleType from '../models/mongo/VehicleType'
import VehicleTypeDTO from '../dto/VehicleTypeDTO'

export default class VehicleTypeRepository implements IRepository{
    save(dto: VehicleTypeDTO, callback: any): void {
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