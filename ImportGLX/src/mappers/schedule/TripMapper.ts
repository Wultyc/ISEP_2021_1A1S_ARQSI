import IGlxMapper from '../interface/IGlxMapper'
import TripDto from '../../dto/trip/TripDto'

export default class TripMapper implements IGlxMapper {

    mapFromGLX(glx_entry: any, dto: TripDto): TripDto {

        dto = {
            system_id: "",
            glx_id: glx_entry.$.key,
            data: {
                LineId: glx_entry.$.Line,
                RouteId: glx_entry.$.Path,
                StartTime: new Date(parseInt(glx_entry.PassingTimes[0].PassingTime[0].$.Time)* 1000).toISOString().substr(11, 8)
            },
            status: "Not Processed",
        }

        return dto
    }
}