import IDto from './interface/IDto'

export default class LineDTO implements IDto{
    lineId= null
    orientation= null
    route= {
        isReinforcementRoute: null,
        isEmptyRoute: null,
        routeNodes: null
    }
}