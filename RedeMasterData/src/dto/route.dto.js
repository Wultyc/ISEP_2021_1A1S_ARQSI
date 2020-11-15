class RouteDTO {

    constructor() {}

    ToInsert (req) {
        let route = {
            distance: req.body.distance,
            duration: req.body.duration,
            isReinforcementRoute: req.body.isReinforcementRoute,
            isEmptyRoute: req.body.isEmptyRoute,
            routeNodes: req.body.routeNodes
        };
        return route;
    };
    
    ToDTO(req){
        if(req == null) return 'Route does not exist.';
        let route = {
            id: req.id,
            distance: req.distance,
            duration: req.duration,
            isReinforcementRoute: req.isReinforcementRoute,
            isEmptyRoute: req.isEmptyRoute,
            routeNodes: req.routeNodes
        };
        return route;
    }; 
}

module.exports = RouteDTO;