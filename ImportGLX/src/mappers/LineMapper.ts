import IGlxMapper from './interface/IGlxMapper'
import LineDto from '../dto/LineDto'
import RouteDto from '../dto/RouteDto'

export default class LineMapper implements IGlxMapper {

    mapFromGLX(glx_entry: any, dto: LineDto, routeList: RouteDto[]): LineDto {
        dto = {
            system_id: "",
            glx_id: glx_entry.$.key,
            data: {
                code: glx_entry.$.key,
                name: glx_entry.$.Name,
                color: glx_entry.$.Color,
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

