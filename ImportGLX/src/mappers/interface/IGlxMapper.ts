import IDto from '../../dto/interface/IDto'
export default interface IGlxMapper  {
    mapFromGLX(glx: any, dto: IDto, list?: any,): IDto
}