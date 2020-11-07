const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const Line = require('../models/line.model');

class LineRepository {
    constructor() { }

    getById(id, callback){
        Line.findOne({"_id": id}, callback);
    };

    getAll(callback) {
        Line.find(callback); 
    };

    getByName(name, callback){       
        Line.find({"name": name}, callback);
    };
    
    save(line, callback) {
        console.log('Saving line in the repository.." ' + line);
        line.save(callback);
    };

    delete(id, callback) {
        Line.findByIdAndRemove(id, callback) 
    };

}

module.exports = LineRepository;