const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const Line = require('../models/line.model');

class LineRepository {
    constructor() { }

    getById(id, callback){
        mongoose.model('Line').findOne({"_id": id}, callback);
    };

    getAll(callback) {
        mongoose.model('Line').find(callback); 
    };

    save(line, callback) {
        console.log('Saving line in the repository.." ' + line);
        line.save(callback);
    };

    delete(id, callback) {
        mongoose.model('Line').findByIdAndRemove(id, callback) 
    };

}

module.exports = LineRepository;