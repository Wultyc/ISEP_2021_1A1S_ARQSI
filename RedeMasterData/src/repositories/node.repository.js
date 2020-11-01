const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const Node = require('../models/node.model');

class NodeRepository {
    constructor() { }

    getById(id, callback){
        mongoose.model('Node').findOne({"_id": id}, callback);
    };

    save(node, callback) {
        console.log('Saving node in the repository.." ' + node);
        node.save(callback);
    };

}

module.exports = NodeRepository;