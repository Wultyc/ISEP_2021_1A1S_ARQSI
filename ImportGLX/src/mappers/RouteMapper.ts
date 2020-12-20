import IGlxMapper from './interface/IGlxMapper'
import RouteDto from '../dto/RouteDto'
import NodeDto from '../dto/NodeDto'

export default class RouteMapper implements IGlxMapper {
    
    mapFromGLX(glx_entry:any, dto: RouteDto, nodeList: NodeDto[]): RouteDto {
        dto.route = {
            system_id: "",
            glx_id: glx_entry.key,
            data: {
                isReinforcementRoute: false,
                isEmptyRoute: glx_entry.$.IsEmpty.toLowerCase(),
                routeNodes: glx_entry.PathNodes[0].PathNode.map(v => ({
                    nodeId: "TEST VALUE",//nodeList.find((node) => node.node.glx_id == v.$.Node).node.system_id,
                    distance: v.$.Distance || "0",
                    duration: v.$.Duration || "0"
                }))
            }
        }
        return dto
        }
    }

     