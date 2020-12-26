import IDto from './interface/IDto'

interface INodeData {​​
    routeId: String
    orientation: String
}
export default class LineDTO implements IDto{
    id: String
    code: String
    name: String 
    color: String
    beginNode: String
    finalNode: String
    lineRoutes: INodeData[]
    tripulantType: String[]
    vehicleType: String[]
}