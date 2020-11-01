const Line = require('../models/line.model');

class LineDTO {

    constructor() {}

    ToInsert (req) {
        let line = new Line({
            code: req.body.code,
            name: req.body.name,
            routes: req.body.routes,
            beginNode: req.body.beginNode,
            finalNode: req.body.finalNode
        });
        return line;
    };
    
    ToDTO(req){
        if(req == null) return 'Line does not exist.';
        let line = new Line({
            id: req.nodeId,
            code: req.shortName,
            name: req.name,
            routes: req.routes,
            beginNode: req.beginNode,
            finalNode: req.finalNode
        });
        return line;
    };
    
}

module.exports = LineDTO;