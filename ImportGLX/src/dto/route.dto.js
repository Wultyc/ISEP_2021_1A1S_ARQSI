class RouteDTO {

    constructor() { }

    ToInsert(req) {
        let route = new Route({
            system_id: "",
            glx_id: "",
            data: {
                distance: req.body.distance,
                duration: req.body.duration,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                orientation: req.body.orientation,
                isReinforcementRoute: req.body.isReinforcementRoute,
                isEmptyRoute: req.body.isEmptyRoute,
                segment: req.body.segment
            },
            status: ""
        });
        return route;
    };
}

module.exports = RouteDTO;