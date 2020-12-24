import IRepository from './interface/IRepository'
import Result from '../utils/Result'
import Node from '../models/mongo/Node'

export default class NodeRepository implements IRepository{

    result: Result

    constructor(result: Result = new Result){
        this.result = result
    }

    save(): boolean | Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    load(query: any, sort: any):Result {
        this.result.setSuccessful(Node.find(query).sort(sort))
        return this.result
    }
    loadById(id: any):Result {
        throw new Error('Method not implemented.');
    }

}