class NodeDTO {

    constructor() {}

    ToInsert (req) {
        let node = {
            shortName: req.body.shortName,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            collectionNode: req.body.collectionNode,
            surrenderNode: req.body.surrenderNode
        };
        return node;
    };
    
    ToDTO(req){
        if(req == null) return 'Node does not exist.';
        let node = {
            id: req.id,
            shortName: req.shortName,
            longitude: req.longitude,
            latitude: req.latitude,
            collectionNode: req.collectionNode,
            surrenderNode: req.surrenderNode
        };
        return node;
    };
    
}

module.exports = NodeDTO;