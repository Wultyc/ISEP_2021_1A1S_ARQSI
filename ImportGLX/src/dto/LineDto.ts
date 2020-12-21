import IGlxDto from './interface/IGlxDto'

interface IRouteData{
    routeId: String,
    orientation: String
}

export default class LineDTO implements IGlxDto {
    system_id: String
    glx_id: String
    data:{
        code: String
        name: String
        color: String
        lineRoutes: IRouteData[]
        tripulantType: []
        vehicleType: []
    }
    status: String = "Not Processed"
}