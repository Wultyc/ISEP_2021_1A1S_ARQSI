const Node = require('../models/node.model');

class NodeDTO {

    constructor() {}

    ToInsert (req) {
        let node = new Node({
            shortName: req.body.shortName,
            longitude: req.body.longitude,
            latitude: req.body.latitude
        });
        return node;
    };
    
    ToDTO(req){
        if(req == null) return 'Node does not exist.';
        let node = new Node(
            {
                id: req.nodeId,
                shortName: req.shortName,
                longitude: req.longitude,
                latitude: req.latitude
            }
        );
     return node;
    };
    
}

module.exports = NodeDTO;