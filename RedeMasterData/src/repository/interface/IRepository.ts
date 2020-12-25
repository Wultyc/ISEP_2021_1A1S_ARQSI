import IDto from '../../dto/interface/IDto'
import { Result } from '../../core/logic/Result';
export default interface IRepository{
    save(dto:IDto): Promise<Result<IDto>>
    load(query:any,sort:any): Promise<Result<IDto>>
    loadById(id:string): Promise<Result<IDto>>
    delete(id:string): Promise<Result<IDto>>
}