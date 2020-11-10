const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const Node = require('../models/node.model');

class NodeRepository {
    constructor() { }

    getById(id, callback) {
        Node.findOne({ "_id": id }, callback);
    };

    getAll(query, sortString, callback) {
        Node.find(query, callback).sort(sortString);
    };

    save(node, callback) {
        console.log('Saving node in the repository.." ' + node);
        node.save(callback);
    };

    delete(id, callback) {
        Node.findByIdAndRemove(id, callback)
    };

}

module.exports = NodeRepository;