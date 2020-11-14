class LineDTO {

    constructor() { }

    ToInsert(req) {
        let line = new Line({
            system_id: "",
            glx_id: "",
            data: {
                code: req.body.code,
                name: req.body.name,
                beginNode: req.body.beginNode,
                finalNode: req.body.finalNode,
                route: req.body.route,
                tripulantType: req.body.tripulantType,
                vehicleType: req.body.vehicleType
            },
            status: ""
        });
        return line;
    };

}

module.exports = LineDTO;