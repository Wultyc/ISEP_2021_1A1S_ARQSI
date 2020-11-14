class NodeDTO {

    constructor() { }

    ToInsert(req) {
        let node = new Node({
            system_id: "",
            glx_id: "",
            data: {
                shortName: req.body.shortName,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                collectionNode: req.body.collectionNode,
                surrenderNode: req.body.surrenderNode
            },
            status: ""
        });
        return node;
    };

}

module.exports = NodeDTO;