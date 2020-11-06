const Segment = require('../models/segment.model');

class SegmentDTO {

    constructor() {}

    ToInsert (req) {
        let node = new Segment({
            distance: req.body.distance,
            duration: req.body.duration,
            beginNode: req.body.beginNode,
            finalNode: req.body.finalNode
        });
        return node;
    };
    
    ToDTO(req){
        if(req == null) return 'Segment does not exist.';
        let node = new Segment({
            distance: req.distance,
            duration: req.duration,
            beginNode: req.beginNode,
            finalNode: req.finalNode
        });
        return node;
    };
    
}

module.exports = SegmentDTO;