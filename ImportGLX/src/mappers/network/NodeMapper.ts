import IGlxMapper from '../interface/IGlxMapper'
import NodeDto from '../../dto/network/NodeDto'

export default class NodeMapper implements IGlxMapper {

    mapFromGLX(glx_entry: any, dto: NodeDto): NodeDto {
        dto = {
            system_id: "",
            glx_id: glx_entry.key,
            data: {
                shortName: glx_entry.ShortName,
                name: glx_entry.Name,
                longitude: glx_entry.Longitude,
                latitude: glx_entry.Latitude,
                collectionNode: glx_entry.IsDepot.toLowerCase(),
                surrenderNode: (glx_entry.IsDepot.toLowerCase() == "True") ? true : glx_entry.IsReliefPoint.toLowerCase()
            },
            status: "Not Processed"
        }
        return dto
    }
}