const _ = require('lodash');

const NodeRepository = require('../repositories/node.repository');
const Node = require('../models/node.model');

var repo = new NodeRepository();

class NodeService {
    constructor() {}

    nodeCreate(node, callback) {
        let message = validateNode(node);
        if (!_.isEmpty(message)) {
            callback(message); //we dont want to kill the Application
            return;
        } else {
            repo.save(node, callback)
        }
    };
}

// Business Logic
validateNode = function(node) {
    let message = '';
    if (!node.collectionNode && node.surrenderNode) {
        message = 'A Surrender Node must always be a Collection Node.';
    }
    return message;
};

module.exports = NodeService;    