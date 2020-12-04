export interface ToInsertRouteinLine {
    lineId: string,
    orientation: string,
    route: {
        isReinforcementRoute: string,
        isEmptyRoute: string,
        routeNodes: string
    }
  }
  