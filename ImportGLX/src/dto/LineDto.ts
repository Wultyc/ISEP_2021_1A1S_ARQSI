import IDto from './interface/IDto'

interface IRouteData{
    routeId: String,
    orientation: String
}

export default class LineDTO implements IDto {
    
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