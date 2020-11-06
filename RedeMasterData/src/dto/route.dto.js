const Route = require('../models/route.model');

class RouteDTO {

    constructor() {}

    ToInsert (req) {
        let route = new Route({
            distance: req.body.distance,
            duration: req.body.duration,
            orientation: req.body.orientation,
            segment: req.body.segment
        });
        return route;
    };
    
    ToDTO(req){
        if(req == null) return 'Route does not exist.';
        let route = new Route({
            distance: req.distance,
            duration: req.duration,
            orientation: req.orientation,
            segment: req.segment
        });
        return route;
    }; 
}

module.exports = RouteDTO;