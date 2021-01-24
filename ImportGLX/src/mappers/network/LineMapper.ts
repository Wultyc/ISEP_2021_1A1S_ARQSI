import IGlxMapper from '../interface/IGlxMapper'
import LineDto from '../../dto/network/LineDto'
import RouteDto from '../../dto/network/RouteDto'

export default class LineMapper implements IGlxMapper {

    mapFromGLX(glx_entry: any, dto: LineDto, routeList: RouteDto[]): LineDto {

        const firstLineRoute = routeList.find((route) => route.glx_id == glx_entry.LinePaths[0].LinePath[0].$.Path)
        const firstLineRouteOrientation = glx_entry.LinePaths[0].LinePath[0].$.Orientation
        const routeNodesNumber = firstLineRoute?.data.routeNodes.length || 0
        const firstRouteNode = firstLineRoute?.data.routeNodes[0].nodeId
        const lastRouteNode = firstLineRoute?.data.routeNodes[routeNodesNumber-1].nodeId

        console.log({firstLineRoute,firstLineRouteOrientation,routeNodesNumber,firstRouteNode,lastRouteNode})

        dto = {
            system_id: "",
            glx_id: glx_entry.$.key,
            data: {
                code: glx_entry.$.key,
                name: glx_entry.$.Name,
                color: glx_entry.$.Color,
                beginNode: (firstLineRouteOrientation == "Go") ? firstRouteNode : lastRouteNode,
                finalNode: (firstLineRouteOrientation == "Go") ? lastRouteNode : firstRouteNode,
                lineRoutes: glx_entry.LinePaths[0].LinePath.map(v => ({
                    routeId: routeList.find((route) => route.glx_id == v.$.Path)?.system_id,
                    orientation: v.$.Orientation
                })),
                tripulantType: [],
                vehicleType: []
            },
            status: "Not Processed"
        } as LineDto
        return dto
    }
}

