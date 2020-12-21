import IDto from './interface/IDto'

interface INodeData {
    nodeId: String
    distance: Number
    duration: Number
}

export default class RouteDTO implements IDto {
    system_id: String
    glx_id: String
    data: {
        isReinforcementRoute: boolean
        isEmptyRoute: boolean
        routeNodes: INodeData[]
    }
    status: String = "Not Processed"
}