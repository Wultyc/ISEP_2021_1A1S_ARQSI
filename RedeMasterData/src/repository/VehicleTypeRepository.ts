import IRepository from './interface/IRepository'
import Result from '../utils/Result';
import VehicleType from '../models/mongo/VehicleType'

export default class VehicleTypeRepository implements IRepository{

    result: Result

    constructor(result: Result = new Result){
        this.result = result
    }

    save(): boolean | Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    load(query: any, sort: any):Result {
        throw new Error('Method not implemented.');
    }
    loadById(id: any):Result {
        throw new Error('Method not implemented.');
    }

}