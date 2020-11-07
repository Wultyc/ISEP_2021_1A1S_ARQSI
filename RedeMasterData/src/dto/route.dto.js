const Route = require('../models/route.model');

class RouteDTO {

    constructor() {}

    ToInsert (req) {
        let route = new Route({
            distance: req.body.distance,
            duration: req.body.duration,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            orientation: req.body.orientation,
            isReinforcementRoute: req.body.isReinforcementRoute,
            isEmptyRoute: req.body.isEmptyRoute,
            segment: req.body.segment
        });
        return route;
    };
    
    ToDTO(req){
        if(req == null) return 'Route does not exist.';
        let route = new Route({
            distance: req.distance,
            duration: req.duration,
            startTime: req.startTime,
            endTime: req.endTime,
            orientation: req.orientation,
            isReinforcementRoute: req.isReinforcementRoute,
            isEmptyRoute: req.isEmptyRoute,
            segment: req.segment
        });
        return route;
    }; 
}

module.exports = RouteDTO;