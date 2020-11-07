const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const Node = require('../models/node.model');

class NodeRepository {
    constructor() { }

    getById(id, callback){
        Node.findOne({"_id": id}, callback);
    };

    getAll(callback) {
        Node.find(callback); 
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