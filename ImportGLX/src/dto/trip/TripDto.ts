import IGlxDto from '../interface/IGlxDto'

export default class TripDTO implements IGlxDto {
    system_id: String;
    glx_id: String;
    data: {
        LineId: String
        RouteId: String
        StartTime: String
    };
    status: any;

}