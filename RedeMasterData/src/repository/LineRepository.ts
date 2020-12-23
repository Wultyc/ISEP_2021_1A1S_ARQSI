import IRepository from './interface/IRepository'
import Result from '../utils/Result'

export default class LineRepository implements IRepository{
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