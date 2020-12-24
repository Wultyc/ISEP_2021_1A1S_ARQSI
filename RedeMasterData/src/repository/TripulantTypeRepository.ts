import IRepository from './interface/IRepository'
import Result from '../utils/Result';
import TripulantType from '../models/mongo/TripulantType'

export default class TripulantTypeRepository implements IRepository{

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