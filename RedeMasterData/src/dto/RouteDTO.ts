import NodeDTO from '../dto/NodeDTO'
import IDto from './interface/IDto'

interface INodeData {​​
    nodeId: String | NodeDTO
    distance: number
    duration: number
}
​​
export default class RouteDTO implements IDto{
    id: String
    distance: number
    duration: number
    isReinforcementRoute: boolean
    isEmptyRoute: boolean
    routeNodes: INodeData[]
}