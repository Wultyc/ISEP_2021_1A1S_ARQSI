const Line = require('../models/line.model');

class LineDTO {

    constructor() {}

    ToInsert (req) {
        let line = new Line({
            code: req.body.code,
            name: req.body.name,
            beginNode: req.body.beginNode,
            finalNode: req.body.finalNode,
            tripulantType: req.body.tripulantType,
            vehicleType: req.body.vehicleType
        });
        return line;
    };
    
    ToDTO(req){
        if(req == null) return 'Line does not exist.';
        let line = new Line({
            code: req.code,
            name: req.name,
            beginNode: req.beginNode,
            finalNode: req.finalNode,
            tripulantType: req.tripulantType,
            vehicleType: req.vehicleType
        });
        return line;
    };
    
}

module.exports = LineDTO;