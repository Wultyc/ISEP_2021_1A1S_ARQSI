const NodeRepository = require('../repositories/node.repository');
const Node = require('../models/node.model');

var repo = new NodeRepository();

class NodeService {
    constructor() {}

    NodeCreate(node, callback) {
        repo.save(node, callback)
    };
}

module.exports = NodeService;    