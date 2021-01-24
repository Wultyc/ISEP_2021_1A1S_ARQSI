import IGlxMapper from '../interface/IGlxMapper'
import TripDto from '../../dto/trip/TripDto'
import RouteDTO from '../../dto/network/RouteDto'
import LineDTO from '../../dto/network/LineDto'

export default class TripMapper implements IGlxMapper {

    mapFromGLX(glx_entry: any, dto: TripDto, routes: RouteDTO[], lines: LineDTO[]): TripDto {

        dto = {
            system_id: "",
            glx_id: glx_entry.$.key,
            data: {
                LineId: lines.find((line) => line.glx_id == glx_entry.$.Line)?.system_id,
                RouteId: routes.find((route) => route.glx_id == glx_entry.$.Path)?.system_id,
                StartTime: new Date(parseInt(glx_entry.PassingTimes[0].PassingTime[0].$.Time)* 1000).toISOString().substr(11, 8)
            },
            status: "Not Processed",
        }

        return dto
    }
}