import IDto from '../../dto/interface/IDto'
export default interface IMapper  {
    mapFromRequest(req: any, dto: IDto): IDto
    mapFromDomain(req: any, dto: IDto): IDto
    mapFromMongo(req: any, dto: IDto): IDto
}