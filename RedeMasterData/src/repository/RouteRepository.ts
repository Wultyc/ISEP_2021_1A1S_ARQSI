import IRepository from './interface/IRepository'

export default class RouteRepository implements IRepository{
    save(): boolean | Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    load(query: any, sort: any) {
        throw new Error('Method not implemented.');
    }
    loadById(id: any) {
        throw new Error('Method not implemented.');
    }

}