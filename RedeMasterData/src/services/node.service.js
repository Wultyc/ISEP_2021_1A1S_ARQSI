const queryfilter = require('../libs/queryfilter');
const _ = require('lodash');

const NodeRepository = require('../repositories/node.repository');
const Node = require('../models/node.model');

var repo = new NodeRepository();

class NodeService {
    constructor() {}

    nodeGetById(id, callback) {
        repo.getById(id, callback);
    };

    nodeGetAll(query,callback) {
        const sortString = queryfilter.sortString(query)
        query = queryfilter.queryCleaner(query);
        repo.getAll(query, sortString, callback);
    };

    nodeCreate(node, callback) {
        let message = validateNode(node);
        if (!_.isEmpty(message)) {
            callback(message);
            return;
        } else {
            repo.save(node, callback)
        }
    };

    nodeDelete(id) {
        repo.delete(id, callback);
    };

}

// Business Logic
validateNode = function(node) {
    return !node.collectionNode && node.surrenderNode ? 
        'A Surrender Node must always be a Collection Node.' : '' ;
};

module.exports = NodeService;    