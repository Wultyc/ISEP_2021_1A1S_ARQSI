class LineDTO {

    constructor() {}

    ToInsert (req) {
        let line = {
            code: req.body.code,
            name: req.body.name,
            beginNode: req.body.beginNode,
            finalNode: req.body.finalNode,
            lineRoutes: req.body.lineRoutes,
            tripulantType: req.body.tripulantType,
            vehicleType: req.body.vehicleType
        };
        return line;
    };
    
    ToDTO(req){
        if(req == null) return 'Line does not exist.';
        let line = {
            id: req.id,
            code: req.code,
            name: req.name,
            beginNode: req.beginNode,
            finalNode: req.finalNode,
            lineRoutes: req.lineRoutes,
            tripulantType: req.tripulantType,
            vehicleType: req.vehicleType
        };
        return line;
    };
    
}

module.exports = LineDTO;