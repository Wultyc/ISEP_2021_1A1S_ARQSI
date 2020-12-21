import IDto from '../../dto/interface/IDto'
export default interface IMapper  {
    mapFromRequest(req: any, dto: IDto): IDto
}