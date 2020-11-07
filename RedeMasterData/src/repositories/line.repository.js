const mongoose = require('mongoose');
const _ = require('lodash');
mongoose.set('debug', true);
var ObjectID = require('mongodb').ObjectID;
const Line = require('../models/line.model');

class LineRepository {
    constructor() { }

    getById(id, callback){
        Line.findOne({"_id": id}, callback);
    };

    getByFilter(query, sortString, callback){
        Line.find(query, callback).sort(sortString);
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