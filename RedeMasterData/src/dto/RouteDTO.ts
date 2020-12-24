import IDto from './interface/IDto'

export default class RouteDTO implements IDto{
    id = null
    distance = null
    duration = null
    isReinforcementRoute = null
    isEmptyRoute = null
    routeNodes = null
}