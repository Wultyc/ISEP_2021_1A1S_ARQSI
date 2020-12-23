import Result from '../../utils/Result'
export default interface IRepository{
    save():boolean|Promise<boolean>
    load(query:any,sort:any):Result
    loadById(id:any):Result
}