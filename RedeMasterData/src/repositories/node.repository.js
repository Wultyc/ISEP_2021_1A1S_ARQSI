const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const Node = require('../models/node.model');

class NodeRepository {
    constructor() { }

    save(node, callback) {
        console.log('Saving node in the repository.." ' + node);
        node.save(callback);
    };

}

module.exports = NodeRepository;