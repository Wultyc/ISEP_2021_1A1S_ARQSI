import IDto from './interface/IDto'

export default class LineDTO implements IDto{
    id = null
    code = null
    name = null
    color = null
    beginNode = null
    finalNode = null
    lineRoutes = null
    tripulantType = null
    vehicleType = null
}