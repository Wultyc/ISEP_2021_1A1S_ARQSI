import IDto from '../../dto/interface/IDto'
export default interface IRepository{
    save(dto:IDto,callback):void
    load(query:any,sort:any,callback):void
    loadById(id:string,callback):void
    delete(id:string,callback):void
}