import IDto from '../../dto/interface/IDto'
import { Result } from '../../core/logic/Result';
export default interface IRepository{
    save(dto:IDto,callback): Promise<Result<IDto>>
    load(query:any,sort:any,callback): Promise<Result<IDto>>
    loadById(id:string,callback): Promise<Result<IDto>>
    delete(id:string,callback): Promise<Result<IDto>>
}