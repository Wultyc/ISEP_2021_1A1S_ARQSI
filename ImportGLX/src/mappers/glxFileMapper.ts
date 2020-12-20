import IMapper from './interface/Imapper'
import GlxFileDto from '../dto/glxFileDto';

export default class GlxFileMapper implements IMapper{
    mapFromRequest(req: any, dto: GlxFileDto): GlxFileDto {
        dto.glx = req.files.glx
        return dto
    }
}