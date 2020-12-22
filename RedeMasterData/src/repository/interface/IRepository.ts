export default interface IRepository{
    save():boolean|Promise<boolean>
    load(query:any,sort:any):any
    loadById(id:any):any
}